import { React, useState } from 'react'
import {   useAddUnitMutation,
    useDeleteUnitMutation,
    useGetUnitQuery,
    useGetUnitsQuery,
    useUpdateUnitMutation } from '../../store/product/referenceapi'

import {
    Form,
    Input,
    Button,
    message, Table, Modal, Tooltip, PageHeader, Divider, InputNumber, 
} from 'antd';
import { Select } from 'antd';
import { EditOutlined, DeleteOutlined, ReloadOutlined, PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import Moment from 'react-moment';

const { Option } = Select;

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


function Units() {
    const [isEditing, setIsEditing] = useState(false);
    const [isCreate, setIsCreate] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);

    const columns = [
        {
            key: "unit",
            title: "Unit",
            dataIndex: "unit",
        },
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
            key: "type",
            title: "Type",
            dataIndex: "type",
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

    const { data =[], isLoading, isFetching, isError } = useGetUnitsQuery();
    const [addUnit, { isCreateLoading }] = useAddUnitMutation()
    const [updateUnit, { isUpdateLoading }] = useUpdateUnitMutation()
    const [deleteUnit, { isDeleteLoading }] = useDeleteUnitMutation()


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
            await addUnit(record).unwrap().then(res => {
                message.success({
                    content: 'Unit added successfully!',
                    key,
                    duration: 2,
                });
                console.log(res)
            }).catch(err => {
                message.error({
                    content: 'Failed to add new Unit!',
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
            await updateUnit(record).unwrap().then(res => {
                message.success({
                    content: 'Unit updated successfully!',
                    key,
                    duration: 2,
                });
                console.log(res)
            }).catch(err => {
                message.error({
                    content: 'Failed to update Unit!',
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
            await deleteUnit(id).unwrap().then(res => {
                message.success({
                    content: 'Unit deleted successfully!',
                    key,
                    duration: 2,
                });
                console.log(res)
            }).catch(err => {
                message.error({
                    content: 'Failed to delete Unit!',
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
            editingRecord.unit = values.unit;
            editingRecord.type = values.type;
            editingRecord.factor = values.factor;
          
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
                    title="Units"
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
            title="Edit Unit"
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
                    name="unit"
                    label="Unit"
                    rules={[
                        {
                            required: true,
                            message: 'Please input Unit',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="code"
                    label="Code"
                    rules={[
                        {   
                            required: true,
                            message: 'Please input Code!'
                        },
                    ]}
                    hasFeedback
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="desc"
                    label="Description"
                    
                    rules={[
                        {   
                            required: true,
                            message: 'Please input Description!'
                        },
                    ]}
                    hasFeedback
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="type"
                    label="Type"
                    
                    rules={[
                        {   
                            required: true,
                            message: 'Please input Type!'
                        },
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
                        <Option key="Volume Unit">Volume Unit</Option>
                        <Option key="Weight Unit">Weight Unit</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="factor"
                    label={
                        <span>
                            Factor <Tooltip placement="top" title="The factor of this unit based on KiloGrams for Weight Units and Cubic Meters for Volume Units">
                                <QuestionCircleOutlined />
                            </Tooltip>
                        </span>
                    }
                    
                    rules={[
                        {   
                            required: true,
                            message: 'Please input a factor!'
                        },
                    ]}
                    hasFeedback
                >
                    <InputNumber/>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default Units;