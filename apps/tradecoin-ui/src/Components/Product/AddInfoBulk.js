
import React from "react";
import { ethers } from "ethers";

import { Button, Form, Input, Modal, Upload, Space } from 'antd';
import { UploadOutlined, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useUpdateResourceMutation, useAddResourceMutation } from '../../store/product/productapi';
import { useUploadFileMutation } from '../../store/vault/vaultapi';

const config = require("../../config.js");
const {
    YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS,
    YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS_ABI,
    YOUR_TOKENIZATION_TOKEN_COMPOSITION_CONTRACT_ADDRESS,
    YOUR_TOKENIZATION_TOKEN_COMPOSITION_CONTRACT_ADDRESS_ABI
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

function AddInfoBulk({ visible, onCancel, editingRecords, setEditingData }) {

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
    const [addProduct, { isAddLoading }] = useAddResourceMutation();

    async function batchProductTx(editingRecords, values) {

        console.log("batchProductTx-------", editingRecords, values)

        let tokenIds = [];
        let tokenName = [];
        let rootHashes = [];

        editingRecords.forEach((product) => {
            tokenIds.push(product.tokenid);
            tokenName.push(product.tokenname);
            rootHashes.push(product.roothash);
        })

        const docHashs = [];
        const docTypes = [];

        const docs = values.docs;
        docs?.forEach(doc => {
            const docType = ethers.utils.formatBytes32String(doc.doctype);
            docTypes.push(docType);
            docHashs.push(doc.document[0]?.dochash);
        });
        console.log(docs)


        if (!tokenIds && !docHashs && !docTypes) return;
        if (typeof window.ethereum !== "undefined") {
            await requestAccount();
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const contractAddress = tokenName.includes("PNFT") ? YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS : YOUR_TOKENIZATION_TOKEN_COMPOSITION_CONTRACT_ADDRESS;
                const contractAbi = tokenName.includes("PNFT")  ? YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS_ABI : YOUR_TOKENIZATION_TOKEN_COMPOSITION_CONTRACT_ADDRESS_ABI;
                const contract = new ethers.Contract(contractAddress, contractAbi, signer);
            
                const transaction = await contract.addInformation(
                    tokenIds, 
                    {
                        docHash: docHashs,
                        docType: docTypes,
                        // This value does not matter as long as it is in bytes32
                        rootHash: rootHashes[0]
                    },
                    rootHashes
                );

            } catch (err) {
                console.log("Error: ", err);
                window.alert(err);
            }
        }
    }

    const stateList = [
        "PendingCreation",
        "Created",
        "RoadTransport",
        "SeaTransport",
        "RailTransport",
        "AirTransport",
        "Storage",
        "Inspection",
        "Processing",
        "Locked",
        "Burned",
        "EOL"
      ];

    async function updateProductFromTx(tokenId, contract, editingRecords) {
        const tradeCoin = await contract.tradeCoin(tokenId);
        const dataState = tradeCoin.state;
        const ownerOfToken =  await contract.ownerOf(tokenId);
        const currentHandler = tradeCoin.currentHandler;

        const dataTransformationsLength = await contract.getTransformationsLength(tokenId);
        const trans = [];
        if (dataTransformationsLength) {
            for (var i = 0; i < dataTransformationsLength.toNumber(); i++) {
                var data = await contract.getTransformationsbyIndex(tokenId, i);
                trans.push(data);
            }
        }

        console.log("State: ", stateList[dataState]);
        console.log("Transformations list: ", trans);
        console.log("Owner: ", ownerOfToken);
        console.log("Current Handler: ", currentHandler);

        //TODO - Dispatch the bc data to the product-service and update against the product

        var record = null;

        record.commodity = editingRecords[0].commodity;
        record.amount = editingRecords[0].amount;
        record.unit = editingRecords[0].unit;

        record.tokenid = parseInt(tokenId);
        record.state = stateList[dataState];
        record.trans = trans;
        record.owner = ownerOfToken;
        record.handler = currentHandler;

        console.log("record --------------", record);

        try {
            addProduct(record).unwrap().then(res => { console.log(res) }).catch(err => { console.log(err) })
        } catch {
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
            title={<>Add Info [{title}]</>}
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

export default AddInfoBulk;