import { React, useState } from 'react'
import { useAddRiskModelMutation, useDeleteRiskModelMutation, useGetRiskModelQuery, useUpdateRiskModelMutation, useGetRiskModelsQuery } from '../../store/risk/riskmodelapi'
import { useGetCommoditiesQuery, useGetCommodityQuery, useGetUnitsQuery } from '../../store/product/referenceapi';
import {
    Form, List, Card,
    Input,
    Button,
    message, Table, Modal, Select, Tag, PageHeader, Divider, InputNumber, Popconfirm, Typography
} from 'antd';

import {CopyOutlined,  MinusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined, PlusOutlined } from "@ant-design/icons";
import Moment from 'react-moment';

import { useSelector, useDispatch } from 'react-redux';
import { updateRiskModel } from '../../store/risk/riskmodelSlice';


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


function RiskModel() {
    const [isEditing, setIsEditing] = useState(false);
    const [isCreate, setIsCreate] = useState(false);

    //const [editingRecord, setEditingRecord] = useState(null);

    let userid = useSelector((state) => state.auth.userid);

    const editingRecord = useSelector((state) => state.riskmodel.riskmodel);
    const dispatch = useDispatch();

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
            key: "commodity",
            title: "Commodity",
            dataIndex: "commodity",
        },
        {
            key: "productstate",
            title: "Product State",
            dataIndex: "productstate",
        },
        {
            key: "4",
            title: "Created",
            dataIndex: "CreatedAt",
            render: (record) => {
                return (
                    <Moment format="DD MMM, YYYY @ hh:mm:ss">{record}</Moment>
                );
            },
        },
        {
            key: "5",
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
                        <CopyOutlined
                            onClick={() => {
                                onDuplicateRecord(record);
                            }}
                            style={{ color: "green", marginRight: 10, marginLeft:10 }}
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

    const { data = [], isLoading, isFetching, isError } = useGetRiskModelsQuery();

    const [addRiskModel, { isCreateLoading }] = useAddRiskModelMutation()
    const [updateRiskModelApi, { isUpdateLoading }] = useUpdateRiskModelMutation()
    const [deleteRiskModel, { isDeleteLoading }] = useDeleteRiskModelMutation()

    var updatedData = []
    if (!isLoading) {
        console.log(data);
        data?.forEach((riskmodel) => {
            if (riskmodel.userid==userid) {
                updatedData.push(riskmodel);
            }
        })
    }

    const key = 'updatable';
    const onEditRecord = (record) => {
        console.log("r4cord", record)
        dispatch(updateRiskModel({ ...record }));
        //setEditingRecord({ ...record });
        setIsEditing(true);
    };

    const resetEditing = () => {
        dispatch(updateRiskModel(null));
        //setEditingRecord(null);
        setIsEditing(false);
        setIsCreate(false);
    };

    const handleAddRecord = async (record) => {
        try {
            await addRiskModel(record).unwrap().then(res => {
                message.success({
                    content: 'RiskModel added successfully!',
                    key,
                    duration: 2,
                });
                console.log(res)
            }).catch(err => {
                message.error({
                    content: 'Failed to add RiskModel!',
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
            await updateRiskModelApi(record).unwrap().then(res => {
                message.success({
                    content: 'RiskModel updated successfully!',
                    key,
                    duration: 2,
                });
                console.log(res)
            }).catch(err => {
                message.error({
                    content: 'Failed to update RiskModel!',
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
            await deleteRiskModel(id).unwrap().then(res => {
                message.success({
                    content: 'RiskModel deleted successfully!',
                    key,
                    duration: 2,
                });
                console.log(res)
            }).catch(err => {
                message.error({
                    content: 'Failed to delete RiskModel!',
                    key,
                    duration: 2,
                });
                console.log(err)
            })
        } catch {
        }
    }

    const onCreate = (values) => {

        const clonedEdititngRecord = { ...editingRecord }
        if (isEditing) {
            clonedEdititngRecord.name = values.name;
            clonedEdititngRecord.desc = values.desc;
            clonedEdititngRecord.commodity = values.commodity;
            clonedEdititngRecord.productstate = values.productstate;
            clonedEdititngRecord.userid = userid;

            //editingRecord.risks = values.risks;
            dispatch(updateRiskModel({ ...clonedEdititngRecord }));
            handleEditRecord(clonedEdititngRecord);
            setIsEditing(false);
        } else if (isCreate) {

            clonedEdititngRecord.name = values.name;
            clonedEdititngRecord.desc = values.desc;
            clonedEdititngRecord.commodity = values.commodity;
            clonedEdititngRecord.productstate = values.productstate;

            clonedEdititngRecord.userid = userid;

            dispatch(updateRiskModel({ ...clonedEdititngRecord }));
            handleAddRecord(clonedEdititngRecord);
        }
    };

    const onDeleteRecord = (record) => {
        Modal.confirm({
            title: "Are you sure, you want to delete this record?",
            okText: "Yes",
            okType: "danger",
            onOk: () => {
                handleDeleteRecord({ ...record }.ID);
            },
        });
    };

    const onDuplicateRecord = (record) => {
        Modal.confirm({
            title: "Are you sure, you want to duplicate this record?",
            okText: "Yes",
            okType: "danger",
            onOk: () => {

                var clonedRiskModel = { ...record };
                clonedRiskModel.ID = null;
                clonedRiskModel.name = "Clone of "+record.name;
                handleAddRecord(clonedRiskModel);
            },
        });
    };

    return (
        <div>

            <div className="site-page-header-ghost-wrapper">
                <PageHeader
                    ghost={false}
                    title="Risk Model"
                    extra={[
                        <Button icon={<PlusOutlined />} onClick={() => {
                            setIsEditing(false);
                            setIsCreate(true);
                            dispatch(updateRiskModel(null));
                            //setEditingRecord(null);
                        }}>Add</Button>,
                        <Button icon={<ReloadOutlined />} onClick={() => {
                        }}></Button>
                    ]}
                >
                </PageHeader>
            </div>
            <Divider />

            <Table size="small" columns={columns} dataSource={updatedData}></Table>
            <>{isEditing || isCreate ? <RecordCreateUpdateForm
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

const RecordCreateUpdateForm = ({ visible, onCreate, onCancel, editingRecord }) => {


    const { data, isLoading } = useGetCommoditiesQuery();
    const [transformationList, setTransformationList] = useState([]);
    //const { data: singleCommodityData, isLoading: isLoadingCommodity } = useGetCommodityQuery(commodity);

    const [form] = Form.useForm();
    const [riskgroupfrom] = Form.useForm();

    const dispatch = useDispatch();

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = (values) => {

        const cloneEditingRecord = { ...editingRecord }
        const newRisk = {
            name: values.name,
            desc: values.desc,
            metrics: []
        }
        if (cloneEditingRecord?.risks?.length > 0) {
            const risks = [...cloneEditingRecord?.risks]
            risks.push(newRisk)
            cloneEditingRecord.risks = risks
            dispatch(updateRiskModel(cloneEditingRecord));
        } else {
            const risks = []
            risks.push(newRisk)
            cloneEditingRecord.risks = risks
        }
        dispatch(updateRiskModel(cloneEditingRecord));

        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const { Option } = Select;

    const productTypes = [];
    if (!isLoading) {
        data?.forEach(element => {
            console.log(element)
            productTypes.push(<Option key={element.name}>{element.name}</Option>)
        });
    }

    const onCommoditySelect = (commoString) => {
        const udpateTrans = [];
        if (commoString) {
            data?.forEach((commodity) => {
                console.log("asdas", commodity.name, commoString)
                if (commodity.name == commoString) {
                    commodity?.transformations.forEach((transformation) => {
                        udpateTrans.push(<Option key={transformation.code}>{transformation.code}</Option>)
                    })
                }
            })
        }
        console.log("asdas", udpateTrans)
        setTransformationList(udpateTrans);
    }

    return (
        <Modal width={1300}
            title="Edit Risk Model"
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
                    label="Name"
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
                    name="desc"
                    label="Description"
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
                    name="commodity"
                    label="Commodity"
                    rules={[
                        {
                            required: true,
                            message: 'Please select Commodity!',
                        },
                    ]}
                >
                    <Select
                        allowClear
                        style={{
                            width: '100%',
                        }}
                        placeholder="Please select"
                        onSelect={(e) => {
                            console.log("-------select", e);
                            onCommoditySelect(e);
                        }}
                    >
                        {productTypes}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="productstate"
                    label="Product State"
                    rules={[
                        {
                            required: true,
                            message: 'Please select State!',
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
                        {transformationList}
                    </Select>
                </Form.Item>

                <Divider orientation='left'>
                    <div>Risk Groups <Button size="small" type="primary" shape="circle" icon={<PlusOutlined />}
                        onClick={() => {
                            showModal();
                        }}></Button>
                        <Modal
                            title="Add Risk Group"
                            visible={isModalVisible}
                            onCancel={() => {
                                riskgroupfrom.resetFields();
                                handleCancel()
                            }}
                            onOk={() => {
                                riskgroupfrom
                                    .validateFields()
                                    .then((values) => {
                                        riskgroupfrom.resetFields();
                                        handleOk(values);
                                    }).catch((info) => {
                                        console.log('Validate Failed:', info);
                                    });
                            }}
                        >
                            <Form
                                {...formItemLayout}
                                form={riskgroupfrom}
                                name="riskgroup"
                            >
                                <Form.Item
                                    name="name"
                                    label=" Name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input Risk Group name!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="desc"
                                    label="Description"
                                >
                                    <Input />
                                </Form.Item>
                            </Form>
                        </Modal>
                    </div>
                </Divider>

                <List
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 2,
                        lg: 2,
                        xl: 3,
                        xxl: 3,
                    }}
                    dataSource={editingRecord?.risks}
                    renderItem={(risk) => (
                        <List.Item>
                            <RiskGroupCard risk={risk} editingRecord={editingRecord}></RiskGroupCard>
                        </List.Item>
                    )}
                />
            </Form>
        </Modal>
    );
};

const RiskGroupCard = ({ risk, editingRecord }) => {

    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const [count, setCount] = useState(0);

    //setup unique keys
    console.log("risk", risk)
    var newMetrics = []
    if (risk && risk.metrics) {
        risk.metrics.forEach(metric => {
            var cloneMetric = { ...metric }
            cloneMetric.key = metric.ID;
            newMetrics.push(cloneMetric);
        });
    }

    const [data, setData] = useState(newMetrics);

    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.key === editingKey;
    const edit = (record) => {
        form.setFieldsValue({
            name: '',
            type: '',
            ...record,
        });
        setEditingKey(record.key);
    };
    const cancel = () => {
        setEditingKey('');
    };
    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];

            const index = newData.findIndex((item) => key === item.key);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }

            const cloneRisk = { ...risk };
            cloneRisk.metrics = newData;

            const risks = [...editingRecord.risks];
            const riskIndex = risks.indexOf(risk);

            if (riskIndex > -1) {
                risks[riskIndex] = cloneRisk;
            } else {
                risks.push(cloneRisk);
            }
            const editingRecordClone = { ...editingRecord };
            editingRecordClone.risks = risks;
            dispatch(updateRiskModel({ ...editingRecordClone }));
            console.log("editingRecord", editingRecordClone)

        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const handleDelete = (key) => {
        const newData = data.filter((item) => item.key !== key);
        setData(newData);
    };

    const columns = [
        {
            title: 'Metric Name',
            dataIndex: 'name',
            editable: true,
        },
        {
            title: 'Input Type',
            dataIndex: 'type',
            editable: true,
        },
        {
            title: 'Actions',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => save(record.key)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <span>
                        <Typography.Link disabled={editingKey !== ''} style={{
                            marginRight: 8,
                        }}
                            onClick={() => edit(record)}>
                            Edit
                        </Typography.Link>
                        <Popconfirm disabled={editingKey !== ''} title="Sure to remove?" onConfirm={() => handleDelete(record.key)}>
                            <a disabled={editingKey !== ''} >Remove</a>
                        </Popconfirm>
                    </span>
                );
            },
        },
    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'type' ? 'select' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    const handleAdd = () => {
        const newData = {
            key: count,
            name: "*enter name",
            type: '*select type',
        };
        setData([...data, newData]);
        setCount(count + 1);
    };

    const { Meta } = Card;

    return (
        <Card title={<Meta
            title={risk.name}
            description={risk.desc}
        />} size="small" extra={<Button size="small" type="primary" shape="circle" icon={<MinusOutlined />}
            onClick={() => {

                const risks = [...editingRecord.risks];
                const riskIndex = risks.indexOf(risk);

                if (riskIndex > -1) {
                    risks.splice(riskIndex, 1);
                }
                const editingRecordClone = { ...editingRecord };
                editingRecordClone.risks = risks;
                dispatch(updateRiskModel({ ...editingRecordClone }));

            }}></Button>}>

            <Button size='small' onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
                Add Metric
            </Button>

            <Form form={form} component={false}>
                <Table size="small"
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    bordered
                    dataSource={data}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: cancel,
                        position: ["none", "none"],
                    }}
                />
            </Form>

        </Card>
    );
}

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === 'select' ? <Select defaultValue="string">
        <Select.Option value="string">String</Select.Option>
        <Select.Option value="number">Number</Select.Option>
        <Select.Option value="boolean">Boolean</Select.Option>
        <Select.Option value="date" disabled>Date</Select.Option>
    </Select> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

export default RiskModel;


