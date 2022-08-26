import { React, useState } from 'react'
import { useGetPrivsQuery, useAddPrivMutation, useUpdatePrivMutation, useDeletePrivMutation } from '../../store/auth/privapi'

import {
    Form,
    Input,
    Button,
    message, Table, Modal, PageHeader, Divider, Select
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

function Priv() {
    const [isEditing, setIsEditing] = useState(false);
    const [isCreate, setIsCreate] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);

    const columns = [
        {
            key: "name",
            title: "Name",
            dataIndex: "name",
        },
        {
            key: "desc",
            title: "Description",
            dataIndex: "desc",
        },
        {
            key: "type",
            title: "Type",
            dataIndex: "type",
        },
        {
            key: "created",
            title: "Created",
            dataIndex: "createdAt",
            render: (record) => {
                return (
                    <Moment format="DD MMM, YYYY @ hh:mm:ss">{record}</Moment>
                );
            },
        },
        {
            key: "updated",
            title: "Updated",
            dataIndex: "updatedAt",
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
                        />
                        <DeleteOutlined
                            onClick={() => {
                                onDeleteRecord(record);
                            }}
                            style={{ color: "red", marginLeft: 12 }}
                        />
                    </>
                );
            },
        },
    ];

    const { data = [], isLoading, isFetching, isError } = useGetPrivsQuery();

    if (!isLoading) {
        console.log("------------privList------",data.privList);
    }

    const [addPriv, { isCreateLoading }] = useAddPrivMutation()
    const [updatePriv, { isUpdateLoading }] = useUpdatePrivMutation()
    const [deletePriv, { isDeleteLoading }] = useDeletePrivMutation()
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
            await addPriv(record).unwrap().then(res => {
                message.success({
                    content: 'Privilege added successfully!',
                    key,
                    duration: 2,
                });
                console.log(res)
            }).catch(err => {
                message.error({
                    content: 'Failed to add privilege!',
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
            await updatePriv(record).unwrap().then(res => {
                message.success({
                    content: 'Privilege updated successfully!',
                    key,
                    duration: 2,
                });
                console.log(res)
            }).catch(err => {
                message.error({
                    content: 'Failed to update privilege!',
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
            await deletePriv(id).unwrap().then(res => {
                message.success({
                    content: 'Privilege deleted successfully!',
                    key,
                    duration: 2,
                });
                console.log(res)
            }).catch(err => {
                message.error({
                    content: 'Failed to delete privilege!',
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
            editingRecord.name = values.name;
            editingRecord.desc = values.desc;
            editingRecord.type = values.type;
            handleEditRecord(editingRecord);
            setIsEditing(false);
        } else if (isCreate) {
            handleAddRecord(values);
        }
    };

    const onDeleteRecord = (record) => {
        Modal.confirm({
            title: "Are you sure, you want to delete this privilege record?",
            okText: "Yes",
            okType: "danger",
            onOk: () => {

                console.log({ ...record });
                console.log({ ...record }._id);


                handleDeleteRecord({ ...record }._id);

            },
        });
    };

    return (
        <div>

            <div className="site-page-header-ghost-wrapper">
                <PageHeader
                    ghost={false}
                    title="Privilege"
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

            <Table size="small" columns={columns} dataSource={data.privList}></Table>
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

    const { Option } = Select;

    const orgTypes = [];
    orgTypes.push(<Option key='Menu'>Menu</Option>);
    orgTypes.push(<Option key='Action'>Action</Option>);
    orgTypes.push(<Option key='View'>View</Option>);
    orgTypes.push(<Option key='Onchain'>Onchain</Option>);

    return (
        <Modal
            title="Edit Privilege"
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
                name="priv"
                initialValues={editingRecord}
            >
                <Form.Item
                    name="name"
                    label="Privilege Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input privilege name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="desc"
                    label="Description"
                    rules={[
                    ]}
                    hasFeedback
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="type"
                    label="Type"
                    rules={[
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
                        {orgTypes}
                    </Select>
                </Form.Item>

            </Form>
        </Modal>
    );
};

export default Priv;