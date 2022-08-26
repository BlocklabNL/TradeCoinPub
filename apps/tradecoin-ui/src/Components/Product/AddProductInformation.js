
import React from "react";
import { ethers } from "ethers";

import {
    Form, Modal, message
} from 'antd';
import { useUpdateResourceMutation } from '../../store/product/productapi';
import DocumentModal from "../Utils/DocumentModal";

const config = require("../../config.js");
const {
    YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS,
    YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS_ABI,
    YOUR_TOKENIZATION_TOKEN_COMPOSITION_CONTRACT_ADDRESS,
    YOUR_TOKENIZATION_TOKEN_COMPOSITION_CONTRACT_ADDRESS_ABI
} = config.default;

async function addInformation(editingRecord, values) {
    console.log("addInformation-------", editingRecord, values)
    const tokenId = editingRecord.tokenid;

    const docs = values.docs;
    const tokenIds = [];
    tokenIds.push(tokenId);

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
            const transaction = await contract.addInformation(
                tokenIds,
                {
                    docHash: docHash,
                    docType: docTypes,
                    rootHash: rootHash
                },
                // TODO Fix rootHash of multiple tokenIDS
                [rootHash]
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

function AddProductInformation({ visible, onCancel, editingRecord, setEditingData }) {
    const [updateProduct, { isUpdateLoading }] = useUpdateResourceMutation();

    async function onCreate(values) {
        console.log("-----onCreate", values);
        addInformation(editingRecord, values);
        //Update Product and Get Docs detail from Product
        try {
            await updateProduct(editingRecord).unwrap().then(res => {
                console.log("----res", res);
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
            title={<>Add Product Information ({editingRecord?.commodity}, {editingRecord?.tokenid})</>}
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
                <DocumentModal editingRecord={editingRecord} form={form}/>
            </Form>
        </Modal>
    );
};

export default AddProductInformation;