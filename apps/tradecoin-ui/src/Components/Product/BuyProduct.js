
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
    YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS_ABI,
    YOUR_TOKENIZATION_TOKEN_COMPOSITION_SALES_CONTRACT_ADDRESS,
    YOUR_TOKENIZATION_TOKEN_COMPOSITION_SALES_CONTRACT_ADDRESS_ABI
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

function BuyProduct({ visible, onCancel, editingRecord, setEditingData }) {
    const [updateProduct, { isUpdateLoading }] = useUpdateResourceMutation();

    async function finishCommercialTx(editingRecord, values) {

        console.log("finishCommercialTx-------", editingRecord, values)
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
            const signer = provider.getSigner();
            const contractAddress = editingRecord?.tokenname === "PNFT" ? YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS : YOUR_TOKENIZATION_TOKEN_COMPOSITION_SALES_CONTRACT_ADDRESS;
            const contractAbi = editingRecord?.tokenname === "PNFT" ? YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS_ABI : YOUR_TOKENIZATION_TOKEN_COMPOSITION_SALES_CONTRACT_ADDRESS_ABI;

            const contract = new ethers.Contract(contractAddress, contractAbi, signer);
            const options = {
                value: ethers.utils.parseEther(paymentAmount)
            }
            const transaction = await contract.finishCommercialTx(
                tokenId, {
                docHash: docHashs,
                docType: docTypes,
                rootHash: rootHash
            }, options
            );
        }
    }

    async function onCreate(values) {
        console.log("-----onCreate", values);
        //Update Product and Get Docs detail from Product
        finishCommercialTx(editingRecord, values);
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

    const productTypes = [];
    productTypes.push(<Option key='Coffee'>Coffee</Option>);
    productTypes.push(<Option key='Tea'>Tea</Option>);
    productTypes.push(<Option key='Soy'>Soy</Option>);

    const units = [];
    units.push(<Option key='Cubic Meter (m^3)'>Cubic Meter (m^3)</Option>);
    units.push(<Option key='Bushel (US)'>Bushel (US)</Option>);
    units.push(<Option key='Liter'>Liter</Option>);
    units.push(<Option key='KiloGram'>KiloGram</Option>);
    units.push(<Option key='Gram'>Gram</Option>);
    units.push(<Option key='Ton (Metric)'>GrTon (Metric)am</Option>);

    const [form] = Form.useForm();
    return (
        <Modal
            width={500}
            title={<>Buy Product ({editingRecord?.commodity}, {editingRecord?.tokenid})</>}
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

export default BuyProduct;