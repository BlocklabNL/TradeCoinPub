import { React, useState, useMemo, useRef } from 'react'
import { useGetResourcesQuery, useDownloadDocumentQuery } from '../../store/vault/vaultapi'
import { useGetDocumentsQuery } from '../../store/product/productapi'
import { useGetAuthInfoQuery, useGrantAccessMutation, useLiftAccessMutation } from '../../store/vault/vaultapi'
import { DisplayHash } from '../Utils/DisplayHash';
import { DisplayUser } from '../Utils/DisplayUser';

import { useSelector, useDispatch } from "react-redux";

import axios from 'axios'

import {
    Form,
    Input,
    Button,
    message, Table, Modal, Select, Tag, PageHeader, Divider, Spin, Avatar, Typography
} from 'antd';

import { ZoomInOutlined, FileWordFilled, FileImageFilled, FileTextFilled, FileExcelFilled, FileFilled, DownloadOutlined, FilePdfFilled, ReloadOutlined, PlusOutlined } from "@ant-design/icons";
import Moment from 'react-moment';
import UserSelect from '../Utils/UserSelect';

function Document() {
    const [isEditing, setIsEditing] = useState(false);
    const [isCreate, setIsCreate] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);

    const columns = [
        {
            key: "doctype",
            title: "Document Type",
            dataIndex: "doctype",
        },
        {
            key: "filename",
            title: "Document Name",
            dataIndex: "filename",
        },
        {
            key: "hash",
            title: "Document Hash",
            dataIndex: "hash",
            render: (record) => {
                return (
                    <DisplayHash hash={record}></DisplayHash>
                );
            },
        },
        {
            key: "contentType",
            title: "Content Type",
            dataIndex: "contentType",
            render: (record) => {
                switch(record){
                    case "application/pdf":
                        return (
                            <>
                                <Tag icon={<FilePdfFilled />} color="#55acee">
                                    pdf
                                </Tag>
                            </>
                        );
                    case "application/msword":
                    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                        return (
                            <>
                                <Tag icon={<FileWordFilled />} color="#55acee">
                                    word
                                </Tag>
                            </>
                        );
                    case "image/png":
                        return (
                            <>
                                <Tag icon={<FileImageFilled />} color="#55acee">
                                    image
                                </Tag>
                            </>
                        );
                    case "application/vnd.ms-excel":
                    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                        return (
                            <>
                                <Tag icon={<FileExcelFilled />} color="#55acee">
                                    excel
                                </Tag>
                            </>
                        );
                    case "text/rtf":
                    case "text/plain":
                        return (
                            <>
                                <Tag icon={<FileTextFilled />} color="#55acee">
                                    text
                                </Tag>
                            </>
                        );
                    default:
                        return (
                            <>
                                <Tag icon={<FileFilled />} color="#55acee">
                                    {record}
                                </Tag>
                            </>
                        );
                }
            },
        },
        {
            key: "size",
            title: "Size",
            dataIndex: "size",
            render: (record) => {
                return (
                    <>
                        {record}Kb
                    </>
                );
            },
        },
        {
            key: "CreatedAt",
            title: "Created",
            dataIndex: "CreatedAt",
            render: (record) => {
                return (
                    <Moment format="DD MMM, YYYY @ hh:mm:ss">{record}</Moment>
                );
            },
        },
        {
            key: "UpdatedAt",
            title: "Updated",
            dataIndex: "UpdatedAt",
            render: (record) => {
                return (
                    <Moment format="DD MMM, YYYY @ hh:mm:ss">{record}</Moment>
                );
            },
        },
        {
            key: "actions",
            title: "Actions",
            render: (record) => {
                return (
                    <>

                        <ZoomInOutlined
                            style={{ marginRight: 10 }}
                            onClick={() => {
                                onEditRecord(record);
                            }}
                        />
                        <Divider type="vertical"></Divider>
                        <DownloadOutlined
                            onClick={() => {
                                onDownloadDocument(record);
                            }}
                        />
                    </>
                );
            },
        },
    ];

    const { data = [], isLoading, isFetching, isError } = useGetResourcesQuery();

    // const [addOrg, { isCreateLoading }] = useAddResourceMutation()
    // const [updateOrg, { isUpdateLoading }] = useUpdateResourceMutation()
    // const [deleteOrg, { isDeleteLoading }] = useDeleteResourceMutation()


    if (!isLoading) {
        console.log(data);
    }

    const key = 'updatable';
    const onEditRecord = (record) => {
        setEditingRecord({ ...record });
        setIsEditing(true);
    };

    const resetEditing = () => {
        setEditingRecord(null);
        setIsEditing(false);
        setIsCreate(false);
    };

    const onCreate = (values) => {
        if (isEditing) {
            editingRecord.name = values.name;
            editingRecord.type = values.type;
            editingRecord.postalCode = values.postalCode;
            //handleEditRecord(editingRecord);
            setIsEditing(false);
        } else if (isCreate) {
            //handleAddRecord(values);
        }
    };

    let token = useSelector((state) => state.auth.token);
    token = token.replace('Bearer ', '');

    const onDownloadDocument = (record) => {
        axios.get("http://localhost:8080/assets/" + record.hash, {
            responseType: 'blob',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((blob) => {
            console.log("blob",blob)
            // Create blob link to download
            const url = window.URL.createObjectURL(
                new Blob([blob.data]),
            );
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute(
                'download',
                record.filename,
            );

            // Append to html link element page
            document.body.appendChild(link);

            // Start download
            link.click();

            // Clean up and remove the link
            link.parentNode.removeChild(link);
        })
    };

    return (
        <div>

            <div className="site-page-header-ghost-wrapper">
                <PageHeader
                    ghost={false}
                    title="Document"
                    extra={[
                        <Button disabled icon={<PlusOutlined />} onClick={() => {
                            setIsEditing(false);
                            setIsCreate(true)
                            setEditingRecord(null);
                        }}>Add</Button>,
                        <Button icon={<ReloadOutlined />} onClick={() => {
                        }}></Button>
                    ]}
                >
                </PageHeader>
            </div>
            <Divider />

            <Table size="small" columns={columns} dataSource={data}></Table>
            <>{isEditing || isCreate ? <CollectionCreateForm
                visible={isEditing || isCreate}
                onCreate={onCreate}
                onCancel={() => {
                    resetEditing();
                }}
                editingRecord={editingRecord}
            /> : null}</>
        </div>
    )
}

const CollectionCreateForm = ({ visible, onCreate, onCancel, editingRecord }) => {

    console.log("editingRecord-----", editingRecord, editingRecord.hash);

    const { data, isLoading, isFetching, isError } = useGetDocumentsQuery(editingRecord.hash);
    const { data: auths, isLoading: isAuthsLoading, isFetching: isAuthsFetching, isError: isAuthsError } = useGetAuthInfoQuery(editingRecord.ID);

    const [grantAccess, { isGrantLoading }] = useGrantAccessMutation();
    const [liftAccess, { isLiftLoading }] = useLiftAccessMutation();

    if (!isAuthsLoading) {
        console.log("Auths for the document----", auths);
    }

    const onRemoveAccess = (record) => {
        Modal.confirm({
            title: "Are you sure, you want to remove access for the user?",
            okText: "Yes",
            okType: "danger",
            onOk: () => {
                handleLiftRecord(record)
            },
        });
    };

    const columnsAuth = [
        {
            key: "avatar",
            dataIndex: "userId",
            render: (record) => {
                return (
                    <DisplayUser userid={record}></DisplayUser>
                );
            },
        },
        {
            key: "accessType",
            title: "Access Type",
            dataIndex: "accessType",
            render: (record) => {
                return (
                    <>
                        {record == "OWNER" ? <>Owner</> : record == "VIEWER" ? <>Viewer</> : ''}
                    </>
                );
            },
        },
        {
            key: "removeaccess",
            title: "Access Type",
            render: (record) => {
                return (
                    <>
                        {record.accessType != "OWNER" ?
                            <>
                                <Button onClick={() => {
                                    onRemoveAccess(record);
                                }} type="link">Remove access</Button>
                            </> : ''
                        }
                    </>
                );
            },
        },
    ];

    const columns = [
        {
            key: "tokenid",
            title: "Token Id",
            dataIndex: "tokenid",
        },
        {
            key: "tokenName",
            title: "Token Name",
            dataIndex: "tokenname",
        },
        {
            key: "commodity",
            title: "Commodity",
            dataIndex: "commodity",
        },
        {
            key: "amount",
            title: "Amount",
            dataIndex: "amount",
        },
        {
            key: "unit",
            title: "Unit",
            dataIndex: "unit",
        },
    ];

    let showHeader = false;

    const [value, setValue] = useState([]);

    const submitGrantAccess = (values) => {
        console.log("submitGrantAccess", values);
        handleGrantRecord(values);
    };

    const key = 'updatable';
    const handleGrantRecord = async (values) => {
        try {
            const input = {
                userid: values.userids[0].value,
                assethash: editingRecord.hash
            }
            await grantAccess(input).unwrap().then(res => {
                message.success({
                    content: 'Access granted!',
                    key,
                    duration: 2,
                });
                console.log(res)
            }).catch(err => {
                message.error({
                    content: 'Failed to grant access!',
                    key,
                    duration: 2,
                });
                console.log(err)
            })
        } catch {
        }
    }
    const handleLiftRecord = async (record) => {
        console.log("lift", record);
        try {
            const input = {
                userid: record.userId,
                assethash: editingRecord.hash
            }
            await liftAccess(input).unwrap().then(res => {
                message.success({
                    content: 'Access lifted!',
                    key,
                    duration: 2,
                });
                console.log(res)
            }).catch(err => {
                message.error({
                    content: 'Failed to lift access!',
                    key,
                    duration: 2,
                });
                console.log(err)
            })
        } catch {
        }
    }

    const [form] = Form.useForm();
    return (
        <Modal
            width={700}
            title={<>{editingRecord?.doctype} - {editingRecord?.filename}</>}
            visible={visible}
            okText="Save"
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

            <Form layout="inline"
                form={form} onFinish={submitGrantAccess}
            >
                <Form.Item name="userids">
                    <UserSelect
                        selectValue="uid"
                        mode="multiple"
                        value={value}
                        placeholder="Select user(s)"
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                        style={{
                            width: "400px",
                        }}
                    />
                </Form.Item>
                <Form.Item name="accesstype">
                    <Select placeholder="Select">
                        <Select.Option value="VIEWER">Viewer</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item >
                    <Button htmlType="submit" type="primary">Grant access</Button>
                </Form.Item>
            </Form>
            <Divider orientation="left">People with access</Divider>

            <Table size="small" pagination={false} showHeader={showHeader} columns={columnsAuth} dataSource={auths}></Table>

            <Divider orientation="left">Document attached to token(s)</Divider>

            <Table size="small" pagination={false} columns={columns} dataSource={data?.products}></Table>
        </Modal>
    );
};

export default Document;