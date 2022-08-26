
import React from "react";
import { ethers } from "ethers";

import {
    Form, Input, Modal, Select, Tooltip, message
} from 'antd';
import { QuestionCircleOutlined } from "@ant-design/icons";

import { useUpdateResourceMutation } from '../../store/product/productapi';
import DocumentModal from "../Utils/DocumentModal";
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

function ApproveProduct({ visible, onCancel, editingRecord, setEditingData }) {
    const [updateProduct, { isUpdateLoading }] = useUpdateResourceMutation();

    async function updateTradeCoinInfo(signer, record) {
        record.owner = signer;
        record.state = "Created";

        console.log("record --------------", record);

        try {
            await updateProduct(record).unwrap().then(res => {
                console.log("----res", res);
                setEditingData(res, false);
            }).catch(err => {
                console.log("-----err", err)
            })
        } catch {
        }
    }

    async function approveTokenization(editingRecord, values) {

        console.log("approveTokenization-------", editingRecord, values)
        const tokenId = editingRecord.tokenid;
        const paymentAmount = values.price;
        const docs = values.docs;
        const docHashs = [];
        const docTypes = [];
        docs?.forEach(doc => {
            const docType = ethers.utils.formatBytes32String(doc.doctype);
            docTypes.push(docType);
            docHashs.push(doc.document[0]?.dochash);
        });
        const rootHash = editingRecord.roothash;

        console.log("-----------------roothash", rootHash);

        if (!tokenId && !docHashs && !docTypes && !rootHash) return;
        if (typeof window.ethereum !== "undefined") {
            await requestAccount();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS, YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS_ABI, signer);
            const options = {
                value: ethers.utils.parseEther(paymentAmount)
            }
            const transaction = await contract.approveTokenization(
                tokenId, {
                docHash: docHashs,
                docType: docTypes,
                rootHash: rootHash
            }, options
            );
        }
    }

    async function onCreate(values) {
        //Update Product and Get Docs detail from Product
        approveTokenization(editingRecord, values);

        message.success({
            content: 'The transaction is initiated successfully!, follow the instructions in Metamask!',
            duration: 2,
        });
        setEditingData(null, false);
    };

    const [form] = Form.useForm();
    return (
        <Modal
            width={500}
            title={<>Approve Product ({editingRecord?.commodity}, {editingRecord?.tokenid})</>}
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
                <Form.Item
                    name="price"
                    label={
                        <span>
                            Product Price <Tooltip placement="top" title="The Exact amount you need to pay for the product defined in Eth. If in fiat select 0">
                                <QuestionCircleOutlined />
                            </Tooltip>
                        </span>
                    }
                    rules={[
                        {
                            required: true,
                            message: 'Please input Product Price!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input />

                </Form.Item>
                <DocumentModal editingRecord={editingRecord} form={form} />
            </Form>
        </Modal>
    );
};

export default ApproveProduct;