
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import {
    Form, Input, Modal, Checkbox, Tooltip, message
} from 'antd';
import { QuestionCircleOutlined } from "@ant-design/icons";

import { useUpdateResourceMutation } from '../../store/product/productapi'
import DocumentModal from "../Utils/DocumentModal";
import UserSelect from "../Utils/UserSelect";
const config = require("../../config.js");
const {
    YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS,
    YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS_ABI,
    YOUR_TOKENIZATION_TOKEN_COMPOSITION_SALES_CONTRACT_ADDRESS,
    YOUR_TOKENIZATION_TOKEN_COMPOSITION_SALES_CONTRACT_ADDRESS_ABI
} = config.default;

async function servicePayment(editingRecord, values) {
    console.log("servicePayment-------", editingRecord, values)
    const tokenId = editingRecord.tokenid;
    const receiver = values.receiver.value;
    const payInFiat = values.payinfiat;
    const priceInEth = parseFloat(values.price);

    const docs = values.docs;
    const docHashs = [];
    const docTypes = [];
    docs?.forEach(doc => {
        const docType = ethers.utils.formatBytes32String(doc.doctype);
        docTypes.push(docType);
        docHashs.push(doc.document[0]?.dochash);
    });

    const rootHash = editingRecord.roothash;
    console.log(tokenId, receiver, payInFiat, priceInEth, docTypes, docHashs, rootHash)

    if (!tokenId && !receiver && !priceInEth && !docTypes && !docHashs && !rootHash && !payInFiat) return;
    if (typeof window.ethereum !== "undefined") {
        try {
            await requestAccount();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contractAddress = editingRecord?.tokenname === "PNFT" ? YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS : YOUR_TOKENIZATION_TOKEN_COMPOSITION_SALES_CONTRACT_ADDRESS;
            const contractAbi = editingRecord?.tokenname === "PNFT" ? YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS_ABI : YOUR_TOKENIZATION_TOKEN_COMPOSITION_SALES_CONTRACT_ADDRESS_ABI;

            const contract = new ethers.Contract(contractAddress, contractAbi, signer);
            const transaction = await contract.servicePayment(
                tokenId,
                receiver,
                (priceInEth * 1e18),
                payInFiat,
                {
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

function ServicePayment({ visible, onCancel, editingRecord, setEditingData }) {
    const [updateProduct, { isUpdateLoading }] = useUpdateResourceMutation();
    const [checked, setChecked] = useState(false);
    const [price, setPrice] = useState(0);
    const [value, setValue] = useState([]);

    const onChange = () => {
        toggleChecked();
    };

    const toggleChecked = () => {
        setChecked(!checked);
    };

    useEffect(() =>{
        if(checked){
            form.setFieldsValue({price: '0'})
        }
    }, [onChange])

    async function onCreate(values) {
        if(!values.docs){
            message.warning("No documents supplied, at least one document is required for this transaction.")
            return
        }
        console.log("-----onCreate", values);
        if(checked){
            values.price = 0;
        }
        servicePayment(editingRecord, values);
        //Update Product and Get Docs detail from Product
        try {
            await updateProduct(editingRecord).unwrap().then(res => {
                console.log("----res", res);
                setChecked(!checked);

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
        setChecked(!checked);
        setEditingData(null, false);
    };

    const [form] = Form.useForm();
    return (
        <Modal
            width={500}
            title={<>Service Payment ({editingRecord?.commodity}, {editingRecord?.tokenid})</>}
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
                        form.resetFields();
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
                    name="payinfiat"
                    valuePropName="checked"
                    wrapperCol={{ offset: 8, span: 24 }}
                    rules={[
                    ]}
                    hasFeedback
                >
                    <Checkbox checked={checked} onChange={onChange}>Pay In Fiat</Checkbox>
                </Form.Item>
                <Form.Item
                    initialValue={price}
                    name="price"
                    label={
                        <span>
                            Offer Price <Tooltip placement="top" title="If Fiat is chosen this is defaulted to 0, otherwise select a price in Eth">
                                <QuestionCircleOutlined />
                            </Tooltip>
                        </span>
                    }
                    rules={[
                        {
                            required: true,
                            message: 'Please input Offer Price!',
                        },
                    ]}
                    hasFeedback
                >
                    {checked ? 
                        <Input name="price" disabled={checked} value={price}/>
                        :
                        <Input name="price" value={price} onChange={(e) => {setPrice(e.target.value)}}/>
                    }

                </Form.Item>
                <Form.Item
                    name="receiver"
                    label={
                        <span>
                            Receiver <Tooltip placement="top" title="The Eth Address or name linked to Eth Address">
                                <QuestionCircleOutlined />
                            </Tooltip>
                        </span>
                    }
                    rules={[
                        {
                            required: true,
                            message: 'Please input the receiver his address!',
                        },
                    ]}
                    hasFeedback
                >
                    <UserSelect
                        selectValue="baddress"
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

                <DocumentModal editingRecord={editingRecord} form={form}/>
            </Form>
        </Modal>
    );
};

export default ServicePayment;