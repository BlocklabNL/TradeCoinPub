
import React from "react";
import { ethers } from "ethers";

import { Button, Form, Select, Modal, Upload, Space, message } from 'antd';
import { UploadOutlined, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useUpdateResourceMutation } from '../../store/product/productapi';
import { useUploadFileMutation } from '../../store/vault/vaultapi';
import { useGetDocTypesQuery } from "../../store/product/referenceapi";

const { Option } = Select;

const config = require("../../config.js");
const {
    YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS,
    YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS_ABI
} = config.default;

async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
}

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

function BatchProduct({ visible, onCancel, editingRecords, setEditingData }) {

    let title = ""
    for (var i = 0, l = editingRecords.length; i < l; i++) {
        var record = editingRecords[i];
        if (i==0) {
            title = record.tokenid + " (" + record.commodity + ")";
        } else {
            title = title + ", " + record.tokenid + " (" + record.commodity + ")"; 
        }
    }

    console.log("--------------", title);

    const [uploadFileToVault, { isUploadLoading }] = useUploadFileMutation();
    const [updateProduct, { isUpdateLoading }] = useUpdateResourceMutation();
    const { data, isLoading } = useGetDocTypesQuery();

    const docTypes = [];
    if (!isLoading) {
      data?.forEach(element => {
        docTypes.push(<Option key={element.doctype}>{element.doctype}</Option>)
      });
    }

    async function batchProductTx(editingRecords, values) {

        console.log("batchProductTx-------", editingRecords, values)

        let tokenIds = [];
        editingRecords.forEach((product) => {
            tokenIds.push(product.tokenid);
        })

        const docHashs = [];
        const docTypes = [];

        const docs = values.docs;
        docs?.forEach(doc => {
            const docType = ethers.utils.formatBytes32String(doc.doctype);
            docTypes.push(docType);
            docHashs.push(doc.document[0]?.dochash);
        });


        //no roothash and no documents for the minted token
        const rootHash = "0x0000000000000000000000000000000000000000000000000000000000000000";

        console.log("-----------------roothash", rootHash);

        if (!tokenIds && !docHashs && !docTypes && rootHash) return;
        if (typeof window.ethereum !== "undefined") {
            await requestAccount();
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS, YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS_ABI, signer);
                
                const transaction = await contract.batchProduct(
                    tokenIds, {
                    docHash: docHashs,
                    docType: docTypes,
                    rootHash: rootHash
                }
                );

            } catch (err) {
                console.log("Error: ", err);
                window.alert(err);
            }
        }
    }

    async function onCreate(values) {
        console.log("-----onCreate", values);
        //Update Product and Get Docs detail from Product
        try {
            batchProductTx(editingRecords, values);
        } catch {
        }
        if (editingRecords) {
            editingRecords.forEach((record) => {
                updateProductInfo(record);
            })
        }
        message.success({
            content: 'The transaction is initiated successfully!, follow the instructions in Metamask!',
            duration: 2,
        });
        setEditingData([], false);
    };

    async function updateProductInfo(record) {
        await updateProduct(record).unwrap().then(res => {
            console.log("----res", res);
            //setEditingData(res, false);
        }).catch(err => {
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

                var copyEditRecords=[];
                if (editingRecords) {
                    editingRecords.forEach((record) => {
                        const updatedDocs = [...record.documents, docdata];
                        var copyRecord = {...record};
                        copyRecord.documents=updatedDocs;
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
            title={<>Batch Products [{title}]</>}
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
                                        <Select
                                            allowClear
                                            style={{
                                                width: '100%',
                                            }}
                                            placeholder="Please select"
                                        >
                                            {docTypes}
                                        </Select>
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

export default BatchProduct;