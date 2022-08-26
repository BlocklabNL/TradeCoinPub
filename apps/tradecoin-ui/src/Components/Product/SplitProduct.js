
import React from "react";
import { ethers } from "ethers";

import {
    Form, Input, Modal, Tooltip, Button, message
} from 'antd';
import { MinusCircleOutlined, PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { useUpdateResourceMutation } from '../../store/product/productapi';
import DocumentModal from "../Utils/DocumentModal";
const config = require("../../config.js");
const {
    YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS,
    YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS_ABI
} = config.default;

async function splitProductTxn(editingRecord, values) {

    console.log("splitProductTxn-------", editingRecord, values)
    const tokenId = editingRecord.tokenid;

    if (!values.docs) {
        message.warning("No documents supplied, at least one document is required for this transaction.")
        return
    }

    const docs = values.docs;
    const docHashs = [];
    const docTypes = [];
    const placeholder = values.partitions;
    const partitions = [];

    docs?.forEach(doc => {
        const docType = ethers.utils.formatBytes32String(doc.doctype);
        docTypes.push(docType);
        docHashs.push(doc.document[0]?.dochash);
    });

    placeholder?.forEach(partition => {
        partitions.push(partition * 1e3);
    });

    const rootHash = editingRecord.roothash;
    console.log(tokenId, docTypes, docHashs, rootHash)

    if (!tokenId && !partitions && !docHashs && !docTypes && rootHash) return;
    if (typeof window.ethereum !== "undefined") {
        await requestAccount();
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS, YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS_ABI, signer);
            const transaction = await contract.splitProduct(
                tokenId,
                partitions, {
                docHash: docHashs,
                docType: docTypes,
                rootHash: rootHash
            }
            );

        } catch (err) {
            console.log("Error: ", err.data.message);
            window.alert(err.data.message);
        }
    }
}

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

const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 40,
            offset: 4,
        },
    },
};

function SplitProduct({ visible, onCancel, editingRecord, setEditingData }) {
    const [updateProduct, { isUpdateLoading }] = useUpdateResourceMutation();

    async function onCreate(values) {
        console.log("-----onCreate", values);
        splitProductTxn(editingRecord, values);
        try {
            await updateProduct(editingRecord).unwrap().then(res => {
                message.success({
                    content: 'The transaction is initiated successfully!, follow the instructions in Metamask!',
                    duration: 2,
                });
                setEditingData(res, false);
            }).catch(err => {
                console.log("-----err", err)
            })
        } catch {
        }
        setEditingData(null, false);
    };

    const [form] = Form.useForm();
    return (
        <Modal
            width={500}
            title={<>Split Product ({editingRecord?.commodity}, {editingRecord?.tokenid})</>}
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
                initialValues={editingRecord}
            >

                <Form.List
                    name="partitions"
                    rules={[
                        {
                            validator: async (_, partitions) => {
                                if (!partitions || partitions.length < 2) {
                                    return Promise.reject(new Error('At least 2 partitions'));
                                }
                            },
                        },
                    ]}
                >
                    {(fields, { add, remove }, { errors }) => (
                        <>
                            {fields.map((field, index) => (
                                <Form.Item
                                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                    label={index === 0 ? 'Partitions' : ''}
                                    required={false}
                                    key={field.key}
                                >
                                    <Form.Item
                                        {...field}
                                        validateTrigger={['onChange', 'onBlur']}
                                        rules={[
                                            {
                                                required: true,
                                                whitespace: true,
                                                message: "Please input partition value, or remove this field.",
                                            },
                                        ]}
                                        noStyle
                                    >
                                        <Input
                                            placeholder="partition value"
                                            style={{
                                                width: '60%',
                                            }}
                                        />
                                    </Form.Item>
                                    {fields.length > 1 ? (
                                        <MinusCircleOutlined
                                            className="dynamic-delete-button"
                                            onClick={() => remove(field.name)}
                                        />
                                    ) : null}
                                </Form.Item>
                            ))}
                            <Form.Item label={
                                <span>
                                    Add Partition <Tooltip placement="top" title="Note the sum of the partition need to be equal to the original token amount">
                                        <QuestionCircleOutlined />
                                    </Tooltip>
                                </span>
                            }>
                                <Button block
                                    type="dashed"
                                    onClick={() => add()}
                                    icon={<PlusOutlined />}
                                >
                                </Button>
                                <Form.ErrorList errors={errors} />
                            </Form.Item>
                        </>
                    )}
                </Form.List>

                <DocumentModal editingRecord={editingRecord} form={form} />
            </Form>
        </Modal>
    );
};

export default SplitProduct;