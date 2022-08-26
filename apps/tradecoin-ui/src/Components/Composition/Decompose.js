import React from "react";
import { ethers } from "ethers";
import { Button, Form, Input, Modal, Upload, Space } from 'antd';
import { UploadOutlined, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useUploadFileMutation } from '../../store/vault/vaultapi'

import 'antd/dist/antd.css';
import { useUpdateResourceMutation } from "../../store/product/productapi";
import DocumentModal from "../Utils/DocumentModal";

const config = require("../../config");
const {
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

function Decompose({ visible, onCancel, editingRecord, setEditingData }) {
  const [uploadFileToVault, { isUploadLoading }] = useUploadFileMutation();
  const [updateProduct, { isUpdateLoading }] = useUpdateResourceMutation();

  async function decompose(values) {

    console.log("decompose-------", editingRecord, values)

    let tokenId = editingRecord.tokenid;

    const docHashs = [];
    const docTypes = [];

    // Should have all documents ??? TODO: DISCUSS
    const rootHash = "0x0000000000000000000000000000000000000000000000000000000000000000";

    console.log("-----------------roothash", rootHash);

    if (!tokenId && !docHashs && !docTypes && rootHash) return;
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(YOUR_TOKENIZATION_TOKEN_COMPOSITION_CONTRACT_ADDRESS, YOUR_TOKENIZATION_TOKEN_COMPOSITION_CONTRACT_ADDRESS_ABI, signer);

        const transaction = await contract.decomposition(
          tokenId,
          {
            docHash: docHashs,
            docType: docTypes,
            rootHash: rootHash
          }
        );

        await transaction.wait()
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
      await decompose(values);
      await updateProduct(editingRecord).unwrap().then(res => {
        console.log("----res", res);
        setEditingData(res, false);
      }).catch(err => {
          console.log("-----err", err)
      })
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

  function uploadFile({ file, onSuccess }) {
    var documentType = "Default";
    form.validateFields().then((values) => {
      const docs = values.docs;
      docs?.forEach(doc => {
        if (file.uid == doc.document[0].uid) {
          documentType = doc.doctype
          uploadtovault(file, documentType, onSuccess)
        }
      });
    })
  }

  async function uploadtovault(file, documentType, onSuccess) {
    const upload_file = new FormData();
    upload_file.append("uploadFile", file);
    upload_file.append("doctype", documentType)
    await uploadFileToVault(upload_file).unwrap().then(res => {
      console.log("----res", res);
      const docdata = {
        dochash: res.asset
      }
      //add doc hash to the file object, so this can be linked to the doctype
      file.dochash = res.asset;
      const updatedDocs = [...editingRecord.documents, docdata]
      editingRecord.documents = updatedDocs;
      onSuccess("ok");
    }).catch(err => {
      console.log("-----err", err)
    })
  }

  const [form] = Form.useForm();
  return (
    <Modal
      width={500}
      title={<>Decompose ({editingRecord?.commodity}, {editingRecord?.tokenid})</>}
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
        <DocumentModal editingRecord={editingRecord} form={form}/>
      </Form>
    </Modal>
  );
};

export default Decompose;
