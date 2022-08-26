
import React from "react";
import { useState } from "react";

import { message, Button, Form, Input, Modal, Select, Checkbox, Upload, Space } from 'antd';
import { UploadOutlined, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useAddDealMutation } from '../../store/risk/dealapi'
import { useUploadFileMutation } from '../../store/vault/vaultapi'
import UserSelect from "../Utils/UserSelect";
import { useSelector } from 'react-redux';


const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 40,
        },
        sm: {
            span: 15,
        },
    },
};

function RequestFinance({ visible, onCancel, editingRecords, setEditingData }) {

    const [value, setValue] = useState([]);

    let userid = useSelector((state) => state.auth.userid);

    let title = ""
    for (var i = 0, l = editingRecords.length; i < l; i++) {
        var record = editingRecords[i];
        if (i == 0) {
            title = record.tokenid + " (" + record.commodity + ")";
        } else {
            title = title + ", " + record.tokenid + " (" + record.commodity + ")";
        }
    }

    console.log("--------------", title);

    const [uploadFileToVault, { isUploadLoading }] = useUploadFileMutation();
    const [addDeal, { isLoading }] = useAddDealMutation();

    async function onCreate(values) {
        console.log("-----onCreate", values);

        //Create Deal and assign to the financier
        let collaterals =[]
        if (editingRecords) {
            editingRecords.forEach((record) => {
                const collateral = {
                    collateralid: record.ID,
                    tokenid: record.tokenid,
                    tokenname: record.tokenname,
                    type: "product",
                }
                collaterals.push(collateral)
            })
        }
        const deal = {
            name: "Deal",
            desc: "Deal for",
            status: "requested",
            financier: values.financier.value,
            borrower: userid,
            collaterals: collaterals
        }

        handleAddDeal(deal);

        setEditingData([], false);
    };

    async function handleAddDeal(record) {
        const key = 'updatable';
        await addDeal(record).unwrap().then(res => {
            console.log("----res", res);
            //setEditingData(res, false);
            message.success({
                content: 'The finance is requested!',
                key,
                duration: 2,
            });
        }).catch(err => {
            message.error({
                content: 'Failed!',
                key,
                duration: 2,
            });
            console.log("-----err", err)
        })
    }

    const normFile = (e) => {
        console.log('Upload event:---------------', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    async function uploadFile({ file, onSuccess }) {
        try {
            const upload_file = new FormData();
            upload_file.append("uploadFile", file);
            await uploadFileToVault(upload_file).unwrap().then(res => {
                console.log("----res", res);
                const docdata = {
                    dochash: res.asset
                }
                //add doc hash to the file object, so this can be linked to the doctype
                file.dochash = res.asset;

                var copyEditRecords = [];
                if (editingRecords) {
                    editingRecords.forEach((record) => {
                        const updatedDocs = [...record.documents, docdata];
                        var copyRecord = { ...record };
                        copyRecord.documents = updatedDocs;
                        copyEditRecords.push(copyRecord);
                        //record.documents = updatedDocs;
                    })
                }

                onSuccess("ok");
            }).catch(err => {
                console.log("-----err", err)
            })
        } catch {
        }
    }



    const [form] = Form.useForm();
    return (
        <Modal
            width={500}
            title={<>Request Finance [{title}]</>}
            visible={visible}
            okText="Submit"
            onCancel={() => {
                form.resetFields();
                onCancel()
            }}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        console.log("------", values)
                        form.resetFields();
                        onCreate(values);
                    }).catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                {...formItemLayout}
                form={form}
                name="org"
            >

                <Form.Item name="financier" label="Financier" rules={[
                    {
                        required: true,
                        message: 'Please input Financier!',
                    },
                ]} hasFeedback>
                    <UserSelect
                        selectValue="uid"
                        // mode="multiple"
                        value={value}
                        placeholder="Select buyer(s)"
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                        style={{
                            width: "283px",
                        }}
                    />
                </Form.Item>

                <Form.List name="docs">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Space
                                    key={key}
                                    style={{
                                        display: 'flex',
                                        marginBottom: 8,
                                    }}
                                    align="baseline"

                                >
                                    <Form.Item
                                        {...restField}
                                        hasFeedback
                                        name={[name, 'doctype']}
                                        label="Document"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input Document Type!',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Type" />
                                    </Form.Item>

                                    <Form.Item
                                        {...restField}
                                        name={[name, 'document']}
                                        valuePropName="fileList"
                                        getValueFromEvent={normFile}
                                    >
                                        <Upload name="logo" customRequest={uploadFile}>
                                            <Button icon={<UploadOutlined />}>Click to upload</Button>
                                        </Upload>
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                </Space>
                            ))}
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                Add Document
                            </Button>
                        </>
                    )}
                </Form.List>
            </Form>
        </Modal>
    );
};

export default RequestFinance;