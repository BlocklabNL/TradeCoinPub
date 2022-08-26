
import React from "react";
import { ethers } from "ethers";

import {
    Form, Input, Modal, Tooltip, Select, message
} from 'antd';
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useGetCommodityQuery } from "../../store/product/referenceapi";
import DocumentModal from "../Utils/DocumentModal";
const { Option } = Select;
const config = require("../../config.js");
const {
    YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS,
    YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS_ABI,
    YOUR_TOKENIZATION_TOKEN_COMPOSITION_CONTRACT_ADDRESS,
    YOUR_TOKENIZATION_TOKEN_COMPOSITION_CONTRACT_ADDRESS_ABI
} = config.default;

async function transformation(editingRecord, values) {
    console.log("transformation-------", editingRecord, values)
    // TODO: Check if this actually works in the happy flow
    const tokenId = editingRecord.tokenid;
    const amountLoss = values.amountLoss;
    const transformationCode = values.transformationCode;

    const docs = values.docs;
    const docHash = [];
    const docTypes = [];

    docs?.forEach(doc => {
        const docType = ethers.utils.formatBytes32String(doc.doctype);
        docTypes.push(docType);
        docHash.push(doc.document[0]?.dochash);
    });

    const rootHash = editingRecord.roothash;
    console.log(tokenId, docTypes, docHash, rootHash)

    if (!tokenId && !docTypes && !docHash && !rootHash) return;
    if (typeof window.ethereum !== "undefined") {
        try {
            await requestAccount();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contractAddress = editingRecord?.tokenname === "PNFT" ? YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS : YOUR_TOKENIZATION_TOKEN_COMPOSITION_CONTRACT_ADDRESS;
            const contractAbi = editingRecord?.tokenname === "PNFT" ? YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS_ABI : YOUR_TOKENIZATION_TOKEN_COMPOSITION_CONTRACT_ADDRESS_ABI;
            const contract = new ethers.Contract(contractAddress, contractAbi, signer);
            const transaction = await contract.addTransformation(
                tokenId,
                (amountLoss * 1e3),
                transformationCode,
                {
                    docHash: docHash,
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

function TransformProduct({ visible, onCancel, editingRecord, setEditingData }) {
    const { data: singleCommodityData, isLoading: isLoadingCommodity } = useGetCommodityQuery(editingRecord?.commodity);

    const transformationList = [];
    
    if (!isLoadingCommodity){
        singleCommodityData?.transformations.forEach((transformation) => {
            transformationList.push(<Option key={transformation.code}>{transformation.code}</Option>)
        })
    }

    async function onCreate(values) {
        if(!values.docs){
            message.warning("No documents supplied, at least one document is required for this transaction.")
            return
        }
        //Update Product and Get Docs detail from Product
        const currentAmount = parseInt(editingRecord.amount);
        const newAmount = currentAmount - parseInt(values.amountLoss);
        editingRecord.amount = newAmount.toString();

        const original = editingRecord?.trans;
        let newArray = [...original, values.transformationCode]
        editingRecord.trans = newArray;

        transformation(editingRecord, values);

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
            title={<>Transform a Product ({editingRecord?.commodity}, {editingRecord?.tokenid})</>}
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
                    name="amountLoss"
                    label={
                        <span>
                            Amount lost <Tooltip placement="top" title="The total loss during the transformation; Define this in the unit type of the product">
                                <QuestionCircleOutlined />
                            </Tooltip>
                        </span>
                    }
                    rules={[
                        {
                            required: true,
                            message: 'Please input the amount of unit this product has lost',
                        },
                    ]}
                    hasFeedback
                >
                    <Input />

                </Form.Item>
                <Form.Item
                    name="transformationCode"
                    label={
                        <span>
                            Transformation <Tooltip placement="top" title="The code of the transformation, if it does not exists ask an admin to register your new transformation code">
                                <QuestionCircleOutlined />
                            </Tooltip>
                        </span>
                    }
                    rules={[
                        {
                            required: true,
                            message: 'Please input the transformation code linked to this transformation',
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
                        {transformationList}
                    </Select>

                </Form.Item>
                <DocumentModal editingRecord={editingRecord} form={form}/>
            </Form>
        </Modal>
    );
};

export default TransformProduct;