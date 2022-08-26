import React from "react";
import { ethers } from "ethers";
import { Button, Form, Input, Modal, Upload, Space, message } from 'antd';
import { UploadOutlined, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useUpdateResourceMutation, useAddResourceMutation } from '../../store/product/productapi'
import { useUploadFileMutation } from '../../store/vault/vaultapi'

import 'antd/dist/antd.css';

const config = require("../../config");
const {
  YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS,
  YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS_ABI,
  YOUR_TOKENIZATION_TOKEN_COMPOSITION_CONTRACT_ADDRESS,
  YOUR_TOKENIZATION_TOKEN_COMPOSITION_CONTRACT_ADDRESS_ABI,
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

function AppendProduct({ visible, onCancel, editingRecords, setEditingData }) {
  const [uploadFileToVault, { isUploadLoading }] = useUploadFileMutation();
  const [updateProduct, { isUpdateLoading }] = useUpdateResourceMutation();
  const [addProduct, { isAddLoading }] = useAddResourceMutation();

  let title = ""
  for (var i = 0, l = editingRecords.length; i < l; i++) {
    var record = editingRecords[i];
    for (var x = 0; x < editingRecords.length; x++){
      if (x === i){
        continue;
      }
      if (editingRecords[i].unit !== editingRecords[x].unit || editingRecords[i].tokenname !== editingRecords[x].tokenname){
        // TODO: Exit the form or prevent from entering the form more elegantly
        visible = false;
        message.error({
          content: 'Invalid combination of units to compose',
          duration: 2,
        });
        setEditingData(false);
        break;
      }
    }
    if (i==0) {
      title = record.tokenid + " (" + record.commodity + ")";
    } else {
      title = title + ", " + record.tokenid + " (" + record.commodity + ")"; 
    }
  }

  console.log("--------------", title);

  async function createComposition(values) {

    console.log("createComposition-------", editingRecords, values)

    let tokenIds = [];
    editingRecords.forEach((product) => {
      tokenIds.push(product.tokenid);
    })

    const docHashs = [];
    const docTypes = [];

    // Should have all documents ??? TODO: DISCUSS
    const rootHash = "0x0000000000000000000000000000000000000000000000000000000000000000";

    console.log("-----------------roothash", rootHash);

    if (!tokenIds && !docHashs && !docTypes && rootHash) return;
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const productNFTContract = new ethers.Contract(YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS, YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS_ABI, signer);
        const productNFTTransaction = await productNFTContract.massApproval(tokenIds, YOUR_TOKENIZATION_TOKEN_COMPOSITION_CONTRACT_ADDRESS);
        await productNFTTransaction.wait();

        const contract = new ethers.Contract(YOUR_TOKENIZATION_TOKEN_COMPOSITION_CONTRACT_ADDRESS, YOUR_TOKENIZATION_TOKEN_COMPOSITION_CONTRACT_ADDRESS_ABI, signer);

        contract.once("AppendProductToCompositionEvent", (tokenId) => {
          console.log("AppendProductToCompositionEvent Listner ---- ", tokenId);
          updateProductFromTx(tokenId,contract, values);
        })

        const transaction = await contract.appendProductToComposition(
          ,
          tokenIds,
          {
            docHash: docHashs,
            docType: docTypes,
            rootHash: rootHash
          }
        );
        await transaction.wait();

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

  async function updateProductFromTx(tokenId, contract, values) {
    const tradeCoin = await contract.tradeCoinComposition(tokenId);
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

    var record = {};

    record.commodity = values.compositionName;
    var totalAmount = 0;
    for (var i = 0, l = editingRecords.length; i < l; i++) {
      totalAmount += parseInt(editingRecords[i].amount);
    }
    record.amount = totalAmount.toString();
    record.unit = editingRecords[0].unit;
    record.tokenname = "CPNFT";

    record.tokenid = parseInt(tokenId);
    record.state = stateList[dataState];
    record.trans = trans;
    record.owner = ownerOfToken;
    record.handler = currentHandler;

    console.log("record --------------", record);

    try {
      addProduct(record).unwrap().then(res => { 
        message.success({
        content: 'Composition added successfully!',
        key,
        duration: 2,
      });
    }).catch(
      err => { 
        console.log(err) 
      }
    )} catch {
    }
  }

  const key = 'updatable';
  async function onCreate(values) {
    //Update Product and Get Docs detail from Product
    try {
      // Do composition
      await createComposition(values);
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
      title={<>Create composition [{title}]</>}
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
        <Form.Item
          name="compositionName"
          label="Composition Name"
          rules={[
            {
              required: true,
              message: 'Please fill in a correct composition name',
            },
          ]}
          hasFeedback
        >
          <Input />

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

export default AppendProduct;
