import { React, useState } from 'react'
import {
    useGetUsersQuery,
    useUpdateUserMutation,
    useDeleteUserMutation
} from '../../store/auth/userapi'

import {
    useGetOrgsQuery
} from '../../store/auth/orgapi'

import { DisplayHash } from '../Utils/DisplayHash';


import {
    Form,
    Input,
    Button,
    message, Table, Modal, Select, Tag, PageHeader, Divider, Transfer, List
} from 'antd';

import { EditOutlined, DeleteOutlined, ReloadOutlined, PlusOutlined } from "@ant-design/icons";


import difference from 'lodash/difference';

import { useGetRolesQuery } from '../../store/auth/roleapi'

import { ethers } from "ethers";
import Moment from 'react-moment';

const config = require("../../config.js");
const {
    YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS,
    YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS_ABI,
    YOUR_TOKENIZATION_TOKEN_COMPOSITION_CONTRACT_ADDRESS,
    YOUR_TOKENIZATION_TOKEN_COMPOSITION_CONTRACT_ADDRESS_ABI
} = config.default;


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


function User() {

    const [isEditing, setIsEditing] = useState(false);
    const [isCreate, setIsCreate] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);

    const columns = [
        {
            key: "fname",
            title: "First Name",
            dataIndex: "fname",
        },
        {
            key: "lname",
            title: "Last Name",
            dataIndex: "lname",
        },
        {
            key: "email",
            title: "Email",
            dataIndex: "email",
        },
        {
            key: "baddress",
            title: "Blockchain Address",
            dataIndex: "baddress",
            ellipsis: true,
            render: (record) => {
                return (
                    <DisplayHash hash={record}></DisplayHash>
                );
            },
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

    async function addOrRemoveOnchainPrivilegePNFT(privname, address, type) {
        if (!address) return;
        if (typeof window.ethereum !== "undefined") {
            try {
                await requestAccount();
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS, YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS_ABI, signer);
                if (privname == "onchain_pnft_tokenize_product") {
                    if (type == "add") {
                        const transaction = await contract.addTokenizer(address);
                        await transaction.wait();
                    } else if (type == "remove") {
                        const transaction = await contract.removeTokenizer(address);
                        await transaction.wait();
                    }
                }
                if (privname == "onchain_pnft_handle_product") {
                    if (type == "add") {
                        const transaction = await contract.addProductHandler(address);
                        await transaction.wait();
                    } else if (type == "remove") {
                        const transaction = await contract.removeProductHandler(address);
                        await transaction.wait();
                    }
                }
                if (privname == "onchain_pnft_handle_product_info") {
                    if (type == "add") {
                        const transaction = await contract.addInformationHandler(address);
                        await transaction.wait();
                    } else if (type == "remove") {
                        const transaction = await contract.removeInformationHandler(address);
                        await transaction.wait();
                    }
                }
                if (privname == "onchain_pnft_add_admin") {
                    if (type == "add") {
                        const transaction = await contract.addAdmin(address);
                        await transaction.wait();
                    } else if (type == "remove") {
                        const transaction = await contract.removeAdmin(address);
                        await transaction.wait();
                    }
                }
            } catch (err) {
                console.log("Error: ", err);
                window.alert(err);
            }
        }
    }

    async function addOrRemoveOnchainPrivilegeCPNFT(privname, address, type) {
        if (!address) return;
        if (typeof window.ethereum !== "undefined") {
            try {
                await requestAccount();
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(YOUR_TOKENIZATION_TOKEN_COMPOSITION_CONTRACT_ADDRESS, YOUR_TOKENIZATION_TOKEN_COMPOSITION_CONTRACT_ADDRESS_ABI, signer);
                if (privname == "onchain_cpnft_tokenize_product") {
                    if (type == "add") {
                        const transaction = await contract.addTokenizer(address);
                        await transaction.wait();
                    } else if (type == "remove") {
                        const transaction = await contract.removeTokenizer(address);
                        await transaction.wait();
                    }
                }
                if (privname == "onchain_cpnft_handle_product") {
                    if (type == "add") {
                        const transaction = await contract.addProductHandler(address);
                        await transaction.wait();
                    } else if (type == "remove") {
                        const transaction = await contract.removeProductHandler(address);
                        await transaction.wait();
                    }
                }
                if (privname == "onchain_cpnft_handle_product_info") {
                    if (type == "add") {
                        const transaction = await contract.addInformationHandler(address);
                        await transaction.wait();
                    } else if (type == "remove") {
                        const transaction = await contract.removeInformationHandler(address);
                        await transaction.wait();
                    }
                }
                if (privname == "onchain_cpnft_add_admin") {
                    if (type == "add") {
                        const transaction = await contract.addAdmin(address);
                        await transaction.wait();
                    } else if (type == "remove") {
                        const transaction = await contract.removeAdmin(address);
                        await transaction.wait();
                    }
                }
            } catch (err) {
                console.log("Error: ", err);
                window.alert(err);
            }
        }
    }

    async function requestAccount() {
        await window.ethereum.request({ method: "eth_requestAccounts" });
    }

    const { data = [], isLoading, isFetching, isError } = useGetUsersQuery();
    const [updateUser, { isUpdateLoading }] = useUpdateUserMutation()
    const [deleteUser, { isDeleteLoading }] = useDeleteUserMutation()


    if (!isLoading) {
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

    const handleEditRecord = async (record) => {
        try {
            await updateUser(record).unwrap().then(res => {
                message.success({
                    content: 'User updated successfully!',
                    key,
                    duration: 2,
                });
            }).catch(err => {
                message.error({
                    content: 'Failed to update user!',
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
            await deleteUser(id).unwrap().then(res => {
                message.success({
                    content: 'Deleted user successfully!',
                    key,
                    duration: 2,
                });
            }).catch(err => {
                message.error({
                    content: 'Failed to delete user!',
                    key,
                    duration: 2,
                });
                console.log(err)
            })
        } catch {
        }
    }

    const onCreate = (values, roleIds, roles) => {
        const oldRoles = editingRecord.roles;
        if (isEditing) {
            editingRecord.fname = values.fname;
            editingRecord.lname = values.lname;
            editingRecord.email = values.email;
            editingRecord.org = values.org;
            editingRecord.baddress = values.baddress.toLowerCase();
            editingRecord.roles = roleIds;
            handleEditRecord(editingRecord);
            setIsEditing(false);

            //Add/Remove Onchain roles
            let onchainPrivsAdded = [];
            roles?.forEach((role) => {
                if (role.type == "Onchain") {
                    role?.privs?.forEach((priv) => {
                        onchainPrivsAdded.push(priv.desc);
                        addOrRemoveOnchainPrivilegePNFT(priv.name, editingRecord.baddress, "add");
                        addOrRemoveOnchainPrivilegeCPNFT(priv.name, editingRecord.baddress, "add");
                    })
                }
            })

            let onchainPrivsRemoved = [];
            console.log("oldRoles", oldRoles);
            console.log("roles", roles);
            oldRoles?.forEach((oldRole) => {
                if (oldRole && oldRole.type == "Onchain") {
                    let isInNewRoles = false;

                    roles?.forEach((role) => {
                        if (role && role.type == "Onchain" && role._id == oldRole._id) {
                            isInNewRoles = true;
                        }
                    })
                    if (!isInNewRoles) {
                        oldRole?.privs?.forEach((priv) => {
                            onchainPrivsRemoved.push(priv.desc);
                            addOrRemoveOnchainPrivilegePNFT(priv.name, editingRecord.baddress, "remove");
                            addOrRemoveOnchainPrivilegeCPNFT(priv.name, editingRecord.baddress, "remove");
                        })
                    }
                }
            })

            if (onchainPrivsAdded.length > 0 || onchainPrivsRemoved.length > 0) {
                Modal.info({
                    title: 'Onchain privilge(s)',
                    content: (
                        <div>
                            <p>The following onchain privileges updated for the user.</p>
                            {onchainPrivsAdded?.length > 0 ?
                                <>
                                    <Divider orientation="left" plain>Added</Divider>
                                    <List
                                        size="small"
                                        bordered
                                        dataSource={onchainPrivsAdded}
                                        renderItem={(item) => <List.Item>{item}</List.Item>}
                                    /></> : ''
                            }
                            {onchainPrivsRemoved?.length > 0 ?
                                <>
                                    <Divider orientation="left" plain>Removed</Divider>
                                    <List
                                        size="small"
                                        bordered
                                        dataSource={onchainPrivsRemoved}
                                        renderItem={(item) => <List.Item>{item}</List.Item>}
                                    /></> : ''
                            }
                        </div>
                    ),
                    onOk() { },
                });
            }
        } else if (isCreate) {
            //handleAddRecord(values);
        }
    };

    const onDeleteRecord = (record) => {
        Modal.confirm({
            title: "Are you sure, you want to delete this record record?",
            okText: "Yes",
            okType: "danger",
            onOk: () => {
                handleDeleteRecord({ ...record }._id);
            },
        });
    };

    return (
        <div>

            <div className="site-page-header-ghost-wrapper">
                <PageHeader
                    ghost={false}
                    title="User"
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

            <Table size="small" columns={columns} dataSource={data.userList}></Table>
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

    const { data = [], isLoading, isFetching, isError } = useGetOrgsQuery();
    const { data: roles, isLoading: isRolesLoading, isRolesFetching, isRolesError } = useGetRolesQuery();

    if (!isRolesLoading) {
    }

    const children = [];
    const { Option } = Select;
    if (!isLoading) {
        if (data.orgList) {
            data.orgList.forEach(org => {
                children.push(<Option key={org._id}>{org.name}</Option>);
            });
        }
    }
    const [form] = Form.useForm();

    const rolesData = []
    if (roles) {
        roles?.roleList.forEach((role) => {
            rolesData.push({
                key: role._id,
                title: role.name,
                description: role.desc,
                disabled: false,
            })
        })
    }
    const originTargetKeys = []
    const originTargetRoles = []
    if (editingRecord) {
        editingRecord?.roles.forEach((role) => {
            originTargetKeys.push(role._id);
            originTargetRoles.push(role)
        })
    }
    const onChange = (nextTargetKeys) => {
        let selectedRoles = [];
        if (roles) {
            nextTargetKeys?.forEach((roleId => {
                roles?.roleList.forEach((role) => {
                    if (roleId == role._id) {
                        selectedRoles.push(role);
                    }
                })
            }))
        }
        setTargetKeys(nextTargetKeys);
        setTargetRoles(selectedRoles);
    };
    const [targetKeys, setTargetKeys] = useState(originTargetKeys);
    const [targetRoles, setTargetRoles] = useState(originTargetRoles);
    const [disabled, setDisabled] = useState(false);


    return (
        <Modal
            width={1000}
            title="Edit User"
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
                        onCreate(values, targetKeys, targetRoles);
                    }).catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                {...formItemLayout}
                form={form}
                name="user"
                initialValues={editingRecord}
            >
                <Form.Item
                    name="fname"
                    label="First Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input First name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="lname"
                    label="Last Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input Last name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="org"
                    label="Organization"
                    rules={[
                    ]}
                >
                    <Select> {children} </Select>
                </Form.Item>
                <Form.Item
                    name="baddress"
                    label="Blockchain Address"
                    rules={[
                        {
                            required: true,
                            message: 'Please input Blockchain address!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>

            <Divider orientation="left">Assign Roles</Divider>

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

export default User;

const leftTableColumns = [
    {
        dataIndex: 'title',
        title: 'Role',
    },
    {
        dataIndex: 'description',
        title: 'Description',
    },
];
const rightTableColumns = [
    {
        dataIndex: 'title',
        title: 'Role',
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