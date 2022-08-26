
import React, { useState } from "react";
import { ethers } from "ethers";

import {
    Form, Modal, Select, Tooltip, message
} from 'antd';
import { QuestionCircleOutlined } from "@ant-design/icons";

import DocumentModal from "../Utils/DocumentModal";
import UserSelect from "../Utils/UserSelect";
const { Option } = Select;
const config = require("../../config.js");
const {
    YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS,
    YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS_ABI,
    YOUR_TOKENIZATION_TOKEN_COMPOSITION_CONTRACT_ADDRESS,
    YOUR_TOKENIZATION_TOKEN_COMPOSITION_CONTRACT_ADDRESS_ABI
} = config.default;

async function changeStateAndHandler(editingRecord, values) {
    console.log("changeStateAndHandler-------", editingRecord, values)
    const tokenId = editingRecord.tokenid;
    const newCurrentHandler = values.newCurrentHandler.value;
    const newState = values.newState;

    const docs = values.docs;
    const docHashes = [];
    const docTypes = [];

    docs?.forEach(doc => {
        const docType = ethers.utils.formatBytes32String(doc.doctype);
        docTypes.push(docType);
        docHashes.push(doc.document[0]?.dochash);
    });

    const rootHash = editingRecord.roothash;
    console.log(tokenId, docTypes, docHashes, rootHash)

    if (!tokenId && !newCurrentHandler && !newState && !docHashes && !docTypes && rootHash) return;
    if (typeof window.ethereum !== "undefined") {
        try {
            await requestAccount();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contractAddress = editingRecord?.tokenname === "PNFT" ? YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS : YOUR_TOKENIZATION_TOKEN_COMPOSITION_CONTRACT_ADDRESS;
            const contractAbi = editingRecord?.tokenname === "PNFT" ? YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS_ABI : YOUR_TOKENIZATION_TOKEN_COMPOSITION_CONTRACT_ADDRESS_ABI;
            const contract = new ethers.Contract(contractAddress, contractAbi, signer);
            const transaction = await contract.changeStateAndHandler(
                tokenId,
                newCurrentHandler,
                newState,
                {
                    docHash: docHashes,
                    docType: docTypes,
                    rootHash: rootHash
                },
            );
        } catch (err) {
            console.log("Error: ", err);
            window.alert(err);
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

function ChangeStateAndHandler({ visible, onCancel, editingRecord, setEditingData }) {
    const [value, setValue] = useState([]);

    const states = [];
    states.push(<Option key='2'>RoadTransport</Option>);
    states.push(<Option key='3'>SeaTransport</Option>);
    states.push(<Option key='4'>RailTransport</Option>);
    states.push(<Option key='5'>AirTransport</Option>);
    states.push(<Option key='6'>Storage</Option>);
    states.push(<Option key='7'>Inspection</Option>);
    states.push(<Option key='8'>Processing</Option>);

    async function onCreate(values) {
        if (!values.docs) {
            message.warning("No documents supplied, at least one document is required for this transaction.")
            return
        }
        changeStateAndHandler(editingRecord, values);
        //Update Product and Get Docs detail from Product
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
            title={<>Change State And Handler ({editingRecord?.commodity}, {editingRecord?.tokenid})</>}
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
                    name="newCurrentHandler"
                    label={
                        <span>
                            New Current Handler <Tooltip placement="top" title="An Ethereum Address or name linked to an address">
                                <QuestionCircleOutlined />
                            </Tooltip>
                        </span>
                    }
                    rules={[
                        {
                            required: true,
                            message: 'Please input a valid Ethereum address',
                        },
                    ]}
                    hasFeedback
                >
                    <UserSelect
                        selectValue="baddress"
                        // mode="multiple"
                        value={value}
                        placeholder="Select handler"
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                        style={{
                            width: "283px",
                        }}
                    />

                </Form.Item>
                <Form.Item
                    name="newState"
                    label={
                        <span>
                            New State <Tooltip placement="top" title="The new state the product will be in">
                                <QuestionCircleOutlined />
                            </Tooltip>
                        </span>
                    }
                    rules={[
                        {
                            required: true,
                            message: 'Please select a valid State',
                        },
                    ]}
                    hasFeedback
                >
                    <Select
                        allowClear
                        style={{
                            width: '100%',
                        }}
                        placeholder="Please select"
                    >
                        {states}
                    </Select>

                </Form.Item>
                <DocumentModal editingRecord={editingRecord} form={form} />
            </Form>
        </Modal>
    );
};

export default ChangeStateAndHandler;