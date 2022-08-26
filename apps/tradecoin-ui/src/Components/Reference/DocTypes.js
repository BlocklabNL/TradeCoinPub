import { React, useState } from 'react'
import { useAddDocTypeMutation, useUpdateDocTypeMutation, useDeleteDocTypeMutation, useGetDocTypesQuery } from '../../store/product/referenceapi'

import {
    Form,
    Input,
    Button,
    message, Table, Modal, PageHeader, Divider, InputNumber
} from 'antd';

import { EditOutlined, DeleteOutlined, ReloadOutlined, PlusOutlined } from "@ant-design/icons";
import Moment from 'react-moment';

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
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
};


function DocTypes() {
    const [isEditing, setIsEditing] = useState(false);
    const [isCreate, setIsCreate] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);

    const columns = [
        {
            key: "doctype",
            title: "DocType",
            dataIndex: "doctype",
        },
        {
            key: "desc",
            title: "Description",
            dataIndex: "desc",
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
                        <EditOutlined
                            onClick={() => {
                                onEditRecord(record);
                            }}
                            style={{ marginRight: 10 }}
                        />
                        <Divider type="vertical"></Divider>
                        <DeleteOutlined
                            onClick={() => {
                                onDeleteRecord(record);
                            }}
                            style={{ color: "red", marginLeft: 10 }}
                        />
                    </>
                );
            },
        },
    ];

    const { data =[], isLoading, isFetching, isError } = useGetDocTypesQuery();
    const [addDocType, { isCreateLoading }] = useAddDocTypeMutation()
    const [updateDocType, { isUpdateLoading }] = useUpdateDocTypeMutation()
    const [deleteDocType, { isDeleteLoading }] = useDeleteDocTypeMutation()


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

    const handleAddRecord = async (record) => {
        try {
            await addDocType(record).unwrap().then(res => {
                message.success({
                    content: 'DocType added successfully!',
                    key,
                    duration: 2,
                });
                console.log(res)
            }).catch(err => {
                message.error({
                    content: 'Failed to add DocType!',
                    key,
                    duration: 2,
                });
                console.log(err)
            })
        } catch {
        }
    }

    const handleEditRecord = async (record) => {
        try {
            await updateDocType(record).unwrap().then(res => {
                message.success({
                    content: 'DocType updated successfully!',
                    key,
                    duration: 2,
                });
                console.log(res)
            }).catch(err => {
                message.error({
                    content: 'Failed to update DocType!',
                    key,
                    duration: 2,
                });
                console.log(err)
            })
        } catch {
        }
    }

    const handleDeleteRecord = async (id) => {
        try {
            await deleteDocType(id).unwrap().then(res => {
                message.success({
                    content: 'DocType deleted successfully!',
                    key,
                    duration: 2,
                });
                console.log(res)
            }).catch(err => {
                message.error({
                    content: 'Failed to delete DocType!',
                    key,
                    duration: 2,
                });
                console.log(err)
            })
        } catch {
        }
    }

    const onCreate = (values) => {

        if (isEditing) {
            console.log(editingRecord)
            editingRecord.doctype = values.doctype;
            editingRecord.desc = values.desc;
          
            handleEditRecord(editingRecord);
            setIsEditing(false);
        } else if (isCreate) {
            handleAddRecord(values);
        }
    };

    const onDeleteRecord = (record) => {
        Modal.confirm({
            title: "Are you sure, you want to delete this record record?",
            okText: "Yes",
            okType: "danger",
            onOk: () => {

                console.log({ ...record });
                console.log({ ...record }.ID);


                handleDeleteRecord({ ...record }.ID);

            },
        });
    };

    return (
        <div>

            <div className="site-page-header-ghost-wrapper">
                <PageHeader
                    ghost={false}
                    title="DocTypes"
                    extra={[
                        <Button icon={<PlusOutlined />} onClick={() => {
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
    const [form] = Form.useForm();
    return (
        <Modal
            title="Edit DocTypes"
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
            <Form
                {...formItemLayout}
                form={form}
                name="org"
                initialValues={editingRecord}
            >
                <Form.Item
                    name="doctype"
                    label="DocType"
                    rules={[
                        {
                            required: true,
                            message: 'Please input a document type!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="desc"
                    label="Description"
                    rules={[
                        {   required: true,
                            message: 'Please input Description!'},
                    ]}
                    hasFeedback
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default DocTypes;