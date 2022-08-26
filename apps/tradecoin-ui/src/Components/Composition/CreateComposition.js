import React from "react";
import { ethers } from "ethers";

import { Button, Form, Input, Modal, Upload, Space, message, Tooltip, Select } from 'antd';
import { QuestionCircleOutlined } from "@ant-design/icons";

import { UploadOutlined, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useUploadFileMutation } from '../../store/vault/vaultapi';
import { useGetDocTypesQuery } from '../../store/product/referenceapi';

import 'antd/dist/antd.css';
const { Option } = Select;
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

function CreateComposition({ visible, onCancel, editingRecords, setEditingData }) {
  const [uploadFileToVault, { isUploadLoading }] = useUploadFileMutation();
  const { data, isLoading } = useGetDocTypesQuery();

  const docTypes = [];
  if (!isLoading) {
    data?.forEach(element => {
      docTypes.push(<Option key={element.doctype}>{element.doctype}</Option>)
    });
  }

  let title = ""
  for (var i = 0, l = editingRecords.length; i < l; i++) {
    var record = editingRecords[i];
    for (var x = 0; x < editingRecords.length; x++){
      if (x === i){
        continue;
      }
      // if (editingRecords[i].unit !== editingRecords[x].unit || editingRecords[i].tokenname !== editingRecords[x].tokenname){
      //   // TODO: Exit the form or prevent from entering the form more elegantly
      //   visible = false;
      //   message.error({
      //     content: 'Invalid combination of units to compose',
      //     duration: 2,
      //   });
      //   setEditingData(false);
      //   break;
      // }
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

        const transaction = await contract.createComposition(
          values.compositionName,
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

  async function onCreate(values) {
    //Update Product and Get Docs detail from Product
    try {
      // Do composition
      message.success({
        content: 'The transaction is initiated successfully! Follow the instructions in Metamask (NOTE THERE ARE TWO TRANSACTIONS TO CONFIRM)!',
        duration: 4,
      });
      
      await createComposition(values);
      
    } catch {
    }
    setEditingData([], false);
  };

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
          label={
            <span>
              Composition Name <Tooltip placement="top" title="The NEW unit type you want the product TO BE in">
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
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

export default CreateComposition;
