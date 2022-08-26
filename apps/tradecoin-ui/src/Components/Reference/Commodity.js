import { React, useState } from 'react'
import { useAddCommodityMutation, useDeleteCommodityMutation, useGetCommoditiesQuery, useUpdateCommodityMutation } from '../../store/product/referenceapi'
import { useGetTransformsQuery } from '../../store/product/referenceapi';

import {
    Form,
    Input,
    Button,
    message, Table, Modal, Select, PageHeader, Divider, Transfer
} from 'antd';

import difference from 'lodash/difference';

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


function Commodity() {
    const [isEditing, setIsEditing] = useState(false);
    const [isCreate, setIsCreate] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);

    const columns = [
        {
            key: "name",
            title: "Commodity Name",
            dataIndex: "name",
        },
        {
            key: "desc",
            title: "Commodity Description",
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

    const { data =[] } = useGetCommoditiesQuery();
    const [addCommodity] = useAddCommodityMutation();
    const [updateCommodity] = useUpdateCommodityMutation();
    const [deleteCommodity] = useDeleteCommodityMutation();

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

    const handleAddRecord = async (record, transformations) => {
        record.transformations = transformations;
        try {
            await addCommodity(record).unwrap().then(res => {
                message.success({
                    content: 'Commodity added successfully!',
                    key,
                    duration: 2,
                });
                console.log(res)
            }).catch(err => {
                message.error({
                    content: 'Failed to upload Commodity!',
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
            await updateCommodity(record).unwrap().then(res => {
                message.success({
                    content: 'Commodity updated successfully!',
                    key,
                    duration: 2,
                });
                console.log(res)
            }).catch(err => {
                message.error({
                    content: 'Failed to update Commodity!',
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
            await deleteCommodity(id).unwrap().then(res => {
                message.success({
                    content: 'Commodity deleted successfully!',
                    key,
                    duration: 2,
                });
                console.log(res)
            }).catch(err => {
                message.error({
                    content: 'Failed to delete Commodity!',
                    key,
                    duration: 2,
                });
                console.log(err)
            })
        } catch {
        }
    }

    const onCreate = (values, transformations) => {
        if (isEditing) {
            editingRecord.name = values.name
            editingRecord.desc = values.desc;
            editingRecord.transformations = transformations;
          
            handleEditRecord(editingRecord);
            setIsEditing(false);

        } else if (isCreate) {
            handleAddRecord(values, transformations);
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
                    title="Commodity"
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
    const { Option } = Select;
    const { data =[], isLoading } = useGetTransformsQuery();

    const transformationList = [];
    if (!isLoading) {
        data?.forEach(element => {
            transformationList.push(<Option key={element.code}>{element.code}</Option>)
        });
    }

    const transformationData = []
    if (data) {
        data?.forEach((transformation) => {
            transformationData.push({
                key: transformation.ID,
                title: transformation.code,
                description: transformation.desc,
                disabled: false,
            })
        })
    }

    const originTargetKeys = []
    const originTargetTransfromations = []
    if (editingRecord) {
        editingRecord?.transformations.forEach((transformation) => {
            originTargetKeys.push(transformation.ID);
            originTargetTransfromations.push(transformation)
        })
    }
    const onChange = (nextTargetKeys) => {
        let selectedTransformations = [];
        if (data) {
            nextTargetKeys?.forEach((transformationId => {
                data?.forEach((transformation) => {
                    if (transformationId == transformation.ID) {
                        selectedTransformations.push(transformation);
                    }
                })
            }))
        }
        setTargetKeys(nextTargetKeys);
        setTargetTransformations(selectedTransformations);
    };
    const [targetKeys, setTargetKeys] = useState(originTargetKeys);
    const [targetTransformations, setTargetTransformations] = useState(originTargetTransfromations);

    const [form] = Form.useForm();

    return (
        <Modal
            width={1000}
            title="Edit Commodity"
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
                        onCreate(values, targetTransformations);
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
                    label="Commodity Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input Commodity Name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="desc"
                    label="Commodity Description"
                    rules={[
                        {   required: true,
                            message: 'Please input Commodity Description!'},
                    ]}
                    hasFeedback
                >
                    <Input />
                </Form.Item>
            </Form>

            <Divider orientation="left">Assign Transformation</Divider>

            <>
                <TableTransfer
                    dataSource={transformationData}
                    targetKeys={targetKeys}
                    showSearch="true"
                    onChange={onChange}
                    filterOption={(inputValue, item) =>
                        item.title.indexOf(inputValue) !== -1 || item.description.indexOf(inputValue) !== -1
                    }
                    leftColumns={leftTableColumns}
                    rightColumns={rightTableColumns}
                />
            </>
        </Modal>
    );

};

const leftTableColumns = [
    {
        dataIndex: 'title',
        title: 'Code',
    },
    {
        dataIndex: 'description',
        title: 'Description',
    },
];
const rightTableColumns = [
    {
        dataIndex: 'title',
        title: 'Code',
    },
    {
        dataIndex: 'description',
        title: 'Description',
    },
];

// Customize Table Transfer
const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
    <Transfer {...restProps}>
        {({
            direction,
            filteredItems,
            onItemSelectAll,
            onItemSelect,
            selectedKeys: listSelectedKeys,
            disabled: listDisabled,
        }) => {
            const columns = direction === 'left' ? leftColumns : rightColumns;
            const rowSelection = {
                getCheckboxProps: (item) => ({
                    disabled: listDisabled || item.disabled,
                }),

                onSelectAll(selected, selectedRows) {
                    const treeSelectedKeys = selectedRows
                        .filter((item) => !item.disabled)
                        .map(({ key }) => key);
                    const diffKeys = selected
                        ? difference(treeSelectedKeys, listSelectedKeys)
                        : difference(listSelectedKeys, treeSelectedKeys);
                    onItemSelectAll(diffKeys, selected);
                },

                onSelect({ key }, selected) {
                    onItemSelect(key, selected);
                },

                selectedRowKeys: listSelectedKeys,
            };
            return (
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={filteredItems}
                    size="small"
                    style={{
                        pointerEvents: listDisabled ? 'none' : undefined,
                    }}
                    onRow={({ key, disabled: itemDisabled }) => ({
                        onClick: () => {
                            if (itemDisabled || listDisabled) return;
                            onItemSelect(key, !listSelectedKeys.includes(key));
                        },
                    })}
                />
            );
        }}
    </Transfer>
);

export default Commodity;