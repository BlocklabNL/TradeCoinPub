import { React, useState } from 'react'
import { useGetTranformationQuery, useAddTransformationMutation, useUpdateTransformationMutation, useDeleteTransformationMutation, useGetTransformsQuery } from '../../store/product/referenceapi'

import {
    Form,
    Input,
    Button,
    message, Table, Modal, Select, Tag, PageHeader, Divider, InputNumber
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


function Transformation() {
    const [isEditing, setIsEditing] = useState(false);
    const [isCreate, setIsCreate] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);

    const columns = [
        {
            key: "code",
            title: "Code",
            dataIndex: "code",
        },
        {
            key: "desc",
            title: "Description",
            dataIndex: "desc",
        },
        {
            key: "spwt",
            title: "Specific Weight(kg/m^3)",
            dataIndex: "spwt",
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

    const { data =[], isLoading, isFetching, isError } = useGetTransformsQuery();
    const [addTransform, { isCreateLoading }] = useAddTransformationMutation()
    const [updateTransform, { isUpdateLoading }] = useUpdateTransformationMutation()
    const [deleteTransform, { isDeleteLoading }] = useDeleteTransformationMutation()


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
            await addTransform(record).unwrap().then(res => {
                message.success({
                    content: 'Transformation added successfully!',
                    key,
                    duration: 2,
                });
                console.log(res)
            }).catch(err => {
                message.error({
                    content: 'Failed to add Transformation!',
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
            await updateTransform(record).unwrap().then(res => {
                message.success({
                    content: 'Transformation updated successfully!',
                    key,
                    duration: 2,
                });
                console.log(res)
            }).catch(err => {
                message.error({
                    content: 'Failed to update Transformation!',
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
            await deleteTransform(id).unwrap().then(res => {
                message.success({
                    content: 'Transformation deleted successfully!',
                    key,
                    duration: 2,
                });
                console.log(res)
            }).catch(err => {
                message.error({
                    content: 'Failed to delete Transformation!',
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
            editingRecord.desc = values.desc;
            editingRecord.code = values.code;
            editingRecord.spwt = values.spwt;
          
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
                    title="Transformation"
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
            title="Edit Transformation"
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
                    name="code"
                    label="Code"
                    rules={[
                        {
                            required: true,
                            message: 'Please input Code!',
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
                <Form.Item
                    name="spwt"
                    label="Specific Weight(kg/m^3)"
                    
                    rules={[
                        {   required: true,
                            message: 'Please input Specific Weight!'},
                    ]}
                    hasFeedback
                >
                <InputNumber/>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default Transformation;