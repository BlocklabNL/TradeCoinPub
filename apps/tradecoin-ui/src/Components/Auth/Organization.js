import { React, useState } from 'react'
import { useGetOrgsQuery, useAddOrgMutation, useUpdateOrgMutation, useDeleteOrgMutation } from '../../store/auth/orgapi'

import {
    Form,
    Input,
    Button,
    message, Table, Modal, Select, Tag, PageHeader, Divider
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


function Organization() {
    const [isEditing, setIsEditing] = useState(false);
    const [isCreate, setIsCreate] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);

    const columns = [
        {
            key: "1",
            title: "Name",
            dataIndex: "name",
        },
        {
            key: "type",
            title: "Type",
            dataIndex: "type",
            render: (_, { type }) => (
                <>
                    {type.map(tag => {
                        let color = tag.length > 7 ? 'geekblue' : 'green';
                        return (
                            <Tag color={color} key={tag}>
                                {tag}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            key: "3",
            title: "Address",
            dataIndex: "address",
        },
        {
            key: "4",
            title: "Created",
            dataIndex: "createdAt",
            render: (record) => {
                return (
                    <Moment format="DD MMM, YYYY @ hh:mm:ss">{record}</Moment>
                );
            },
        },
        {
            key: "5",
            title: "Updated",
            dataIndex: "updatedAt",
            render: (record) => {
                return (
                    <Moment format="DD MMM, YYYY @ hh:mm:ss">{record}</Moment>
                );
            },
        },
        {
            key: "6",
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

    const { data = [], isLoading, isFetching, isError } = useGetOrgsQuery();

    const [addOrg, { isCreateLoading }] = useAddOrgMutation()
    const [updateOrg, { isUpdateLoading }] = useUpdateOrgMutation()
    const [deleteOrg, { isDeleteLoading }] = useDeleteOrgMutation()


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
            await addOrg(record).unwrap().then(res => {
                message.success({
                    content: 'Organisation added successfully!',
                    key,
                    duration: 2,
                });
                console.log(res)
            }).catch(err => {
                message.error({
                    content: 'Failed to add org!',
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
            await updateOrg(record).unwrap().then(res => {
                message.success({
                    content: 'Organisation updated successfully!',
                    key,
                    duration: 2,
                });
                console.log(res)
            }).catch(err => {
                message.error({
                    content: 'Failed to update Organisation!',
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
            await deleteOrg(id).unwrap().then(res => {
                message.success({
                    content: 'Organisation deleted successfully!',
                    key,
                    duration: 2,
                });
                console.log(res)
            }).catch(err => {
                message.error({
                    content: 'Failed to delete Organisation!',
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
            editingRecord.type = values.type;
            editingRecord.address = values.address;
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
                    title="Organization"
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

            <Table size="small" columns={columns} dataSource={data.orgList}></Table>
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

    const { Option } = Select;

    const orgTypes = [];
    orgTypes.push(<Option key='Warehouse'>Warehouse</Option>);
    orgTypes.push(<Option key='Farmer'>Farmer</Option>);
    orgTypes.push(<Option key='Processor'>Processor</Option>);
    orgTypes.push(<Option key='Financier'>Financier</Option>);


    const [form] = Form.useForm();
    return (
        <Modal
            title="Edit Organization"
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
                    name="name"
                    label="Organization Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input Organization name!',
                        },
                    ]}
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
                        mode="multiple"
                        allowClear
                        style={{
                            width: '100%',
                        }}
                        placeholder="Please select"
                    //onChange={handleChange}
                    >
                        {orgTypes}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="address"
                    label="Address"
                    rules={[
                    ]}
                    hasFeedback
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default Organization;