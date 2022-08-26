import { React, useState } from 'react'
import { useGetRolesQuery, useAddRoleMutation, useUpdateRoleMutation, useDeleteRoleMutation } from '../../store/auth/roleapi'
import { useGetPrivsQuery } from '../../store/auth/privapi'

import {
    Form,
    Input,
    Button,
    message, Table, Modal, Select, Tag, PageHeader, Divider, Transfer
} from 'antd';

import difference from 'lodash/difference';
import Moment from 'react-moment';
import { EditOutlined, DeleteOutlined, ReloadOutlined, PlusOutlined } from "@ant-design/icons";

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


function Role() {
    const [isEditing, setIsEditing] = useState(false);
    const [isCreate, setIsCreate] = useState(false);
    const [editingRole, setEditingRole] = useState(null);

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
            key: "createdAt",
            title: "Created",
            dataIndex: "createdAt",
            render: (record) => {
                return (
                    <Moment format="DD MMM, YYYY @ hh:mm:ss">{record}</Moment>
                );
            },
        },
        {
            key: "updatedAt",
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
                                onEditRole(record);
                            }}
                        />
                        <DeleteOutlined
                            onClick={() => {
                                onDeleteRole(record);
                            }}
                            style={{ color: "red", marginLeft: 12 }}
                        />
                    </>
                );
            },
        },
    ];

    const { data = [], isLoading, isFetching, isError } = useGetRolesQuery();

    if (!isLoading) {
        console.log("------------roleList------", data.roleList);
    }

    const [addRole, { isCreateLoading }] = useAddRoleMutation()
    const [updateRole, { isUpdateLoading }] = useUpdateRoleMutation()
    const [deleteRole, { isDeleteLoading }] = useDeleteRoleMutation()
    const key = 'updatable';

    const onEditRole = (record) => {
        setEditingRole({ ...record });
        setIsEditing(true);
    };

    const resetEditing = () => {
        setEditingRole(null);
        setIsEditing(false);
        setIsCreate(false);
    };

    const handleAddRole = async (role) => {
        try {
            await addRole(role).unwrap().then(res => {
                message.success({
                    content: 'Role added successfully!',
                    key,
                    duration: 2,
                });
                console.log(res)
            }).catch(err => {
                message.error({
                    content: 'Failed to add a role!',
                    key,
                    duration: 2,
                });
                console.log(err)
            })
        } catch {
        }
    }

    const handleEditRole = async (role) => {
        try {
            await updateRole(role).unwrap().then(res => {
                message.success({
                    content: 'Role updated successfully!',
                    key,
                    duration: 2,
                });
                console.log(res)
            }).catch(err => {
                message.error({
                    content: 'Failed to update a role!',
                    key,
                    duration: 2,
                });
                console.log(err)
            })
        } catch {
        }
    }

    const handleDeleteRole = async (id) => {
        try {
            await deleteRole(id).unwrap().then(res => {
                message.success({
                    content: 'Role deleted successfully!',
                    key,
                    duration: 2,
                });
                console.log(res)
            }).catch(err => {
                message.error({
                    content: 'Failed to delete a role!',
                    key,
                    duration: 2,
                });
                console.log(err)
            })
        } catch {
        }
    }

    const onCreate = (values, privs) => {

        console.log("selected privs----", privs);

        if (isEditing) {
            editingRole.name = values.name;
            editingRole.desc = values.desc;
            editingRole.type = values.type;
            editingRole.privs = privs;
            handleEditRole(editingRole);
            setIsEditing(false);
        } else if (isCreate) {
            handleAddRole(values);
        }
    };

    const onDeleteRole = (record) => {
        Modal.confirm({
            title: "Are you sure, you want to delete this role record?",
            okText: "Yes",
            okType: "danger",
            onOk: () => {

                console.log({ ...record });
                console.log({ ...record }._id);


                handleDeleteRole({ ...record }._id);

            },
        });
    };

    return (
        <div>

            <div className="site-page-header-ghost-wrapper">
                <PageHeader
                    ghost={false}
                    title="Role"
                    extra={[
                        <Button icon={<PlusOutlined />} onClick={() => {
                            setIsEditing(false);
                            setIsCreate(true)
                            setEditingRole(null);
                        }}>Add</Button>,
                        <Button icon={<ReloadOutlined />} onClick={() => {
                        }}></Button>
                    ]}
                >
                </PageHeader>
            </div>
            <Divider />

            <Table size="small" columns={columns} dataSource={data.roleList}></Table>
            <>{isEditing || isCreate ? <CollectionCreateForm
                visible={isEditing || isCreate}
                onCreate={onCreate}
                onCancel={() => {
                    resetEditing();
                }}
                editingRole={editingRole}
            /> : null}</>
        </div>
    )
}

const CollectionCreateForm = ({ visible, onCreate, onCancel, editingRole }) => {
    const [form] = Form.useForm();
    const { Option } = Select;

    const { data: privs, isLoading, isRolesFetching, isRolesError } = useGetPrivsQuery();

    if (!isLoading) {
        console.log("--------------rolesLIst-----", privs);
    }

    const rolesData = []
    if (privs) {
        privs?.privList.forEach((priv) => {
            rolesData.push({
                key: priv._id,
                title: priv.name,
                description: priv.desc,
                disabled: false,
            })
        })
    }
    const originTargetKeys = []
    if (editingRole) {
        editingRole?.privs.forEach((priv) => {
            originTargetKeys.push(priv._id)
        })
    }
    const onChange = (nextTargetKeys) => {
        setTargetKeys(nextTargetKeys);
    };
    const [targetKeys, setTargetKeys] = useState(originTargetKeys);
    const [disabled, setDisabled] = useState(false);


    const roleTypes = [];
    roleTypes.push(<Option key='Onchain'>Onchain</Option>);
    roleTypes.push(<Option key='Offchain'>Offchain</Option>);

    return (
        <Modal
            width={1000}
            title="Edit Role"
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
                        onCreate(values, targetKeys);
                    }).catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                {...formItemLayout}
                form={form}
                name="role"
                initialValues={editingRole}
            >
                <Form.Item
                    name="name"
                    label="Role Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input role name!',
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
                        {roleTypes}
                    </Select>
                </Form.Item>

            </Form>

            <Divider orientation="left">Assign Privileges</Divider>

            <>
                <TableTransfer
                    dataSource={rolesData}
                    targetKeys={targetKeys}
                    disabled={disabled}
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

export default Role;

const leftTableColumns = [
    {
        dataIndex: 'title',
        title: 'Privilege',
    },
    {
        dataIndex: 'description',
        title: 'Description',
    },
];
const rightTableColumns = [
    {
        dataIndex: 'title',
        title: 'Privilege',
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