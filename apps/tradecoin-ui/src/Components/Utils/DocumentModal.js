import React from "react";

import {
    Button,
    Form, Upload, Space, Select
} from 'antd';

import { UploadOutlined, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useUploadFileMutation } from '../../store/vault/vaultapi';
import { useGetDocTypesQuery } from '../../store/product/referenceapi';

const { Option } = Select;

function DocumentModal({ form, editingRecord, ...props }) {
    const [uploadFileToVault, { isUploadLoading }] = useUploadFileMutation();
    const { data, isLoading } = useGetDocTypesQuery();

    const docTypes = [];
    if (!isLoading) {
        data?.forEach(element => {
            docTypes.push(<Option key={element.doctype}>{element.doctype}</Option>)
        });
    }

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

    const normFile = (e) => {
        console.log('Upload event:---------------', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    return (
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
    );
}

export default DocumentModal;