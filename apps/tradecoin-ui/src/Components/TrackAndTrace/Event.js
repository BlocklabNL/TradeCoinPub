import { React, useState } from 'react'
import { useGetResourcesByParamQuery } from '../../store/product/eventapi'

import {
    Form,
    Input,
    Button,
    Table,
    Modal,
    Divider,
    Col,
    Row,
    Descriptions,
    Typography, PageHeader
} from 'antd';

import { ZoomInOutlined, UpOutlined, DownOutlined } from "@ant-design/icons";
import Moment from 'react-moment';

import { DisplayHash } from '../Utils/DisplayHash';
import { DisplayUserByBAddress } from "../Utils/DisplayUserByBAddress";
import UserSelect from '../Utils/UserSelect';

function Event() {
    const [isEditing, setIsEditing] = useState(false);
    const [isCreate, setIsCreate] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);

    const [searchParams, setsearchParams] = useState(null);

    const columns = [
        {
            key: "tokenid",
            title: "Token Id",
            render: (record) => {
                return (
                    <>{record.tokenid}</>
                );
            },
        },
        {
            key: "eventname",
            title: "Name",
            dataIndex: "eventname",
        },
        {
            key: "eventdesc",
            title: "Description",
            dataIndex: "eventdesc",
        },
        {
            key: "creatoraddress",
            title: "Creator",
            dataIndex: "creatoraddress",
            render: (record) => {
                return (
                    <DisplayUserByBAddress baddress={record}></DisplayUserByBAddress>
                );
            },
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
                        <ZoomInOutlined
                            onClick={() => {
                                onEditRecord(record);
                            }}
                        />
                    </>
                );
            },
        },
    ];

    const { data = [], isLoading } = useGetResourcesByParamQuery(searchParams);


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
            console.log(editingRecord)
            //handleEditRecord(editingRecord);
            setIsEditing(false);
        } else if (isCreate) {
            //handleAddRecord(values);
        }
    };

    const setParams = (values) => {
        values.creatoraddress = values?.creatoraddress?.value;
        setsearchParams(values);
    }

    return (
        <div>
            {/* <div className="site-page-header-ghost-wrapper">
                <PageHeader
                    ghost={false}
                    title="Event"
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
                    <AdvancedSearchForm />
                </PageHeader>
            </div> */}

            <AdvancedSearchForm setParams={setParams} />

            <Divider />

            <Table size="small" columns={columns} dataSource={data}></Table>

            <>{isEditing || isCreate ? <EventForm
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

const EventForm = ({ visible, onCreate, onCancel, editingRecord }) => {
    const doccolumns = [
        {
            title: 'Documnet Type',
            dataIndex: 'doctype',
            key: 'doctype',
        },
        {
            title: 'Document Hash',
            dataIndex: 'dochash',
            key: 'dochash',
            render: (record) => {
                return (
                    <DisplayHash hash={record}></DisplayHash>
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
    ];


    return (
        <Modal
            width={1000}
            title="Event Details"
            visible={visible}
            okText="OK"
            onCancel={() => {
                onCancel()
            }}
            onOk={() => {
                onCancel()
            }}
        >

            <Descriptions size="small" bordered>
                <Descriptions.Item label={(<Typography.Text strong>Token Id</Typography.Text>)}>{editingRecord?.tokenid}</Descriptions.Item>
                <Descriptions.Item label={(<Typography.Text strong>Name</Typography.Text>)}>{editingRecord?.eventname}</Descriptions.Item>
                <Descriptions.Item label={(<Typography.Text strong>Description</Typography.Text>)}>{editingRecord?.eventdesc}</Descriptions.Item>
                <Descriptions.Item label={(<Typography.Text strong>Location</Typography.Text>)}>{editingRecord?.geolocation}</Descriptions.Item>

                {editingRecord?.dynamicfields?.map((field, index) =>
                    <Descriptions.Item label={(<Typography.Text strong>{field?.fieldname}</Typography.Text>)}>{field?.fieldvalue}</Descriptions.Item>
                )}

                <Descriptions.Item label={(<Typography.Text strong>Creator</Typography.Text>)} ><DisplayUserByBAddress baddress={editingRecord?.creatoraddress}></DisplayUserByBAddress></Descriptions.Item>
                <Descriptions.Item label={(<Typography.Text strong>Root Hash</Typography.Text>)}><DisplayHash hash={editingRecord?.roothash}></DisplayHash></Descriptions.Item>

                <Descriptions.Item label={(<Typography.Text strong>Created</Typography.Text>)}><Moment format="DD MMM, YYYY @ hh:mm:ss">{editingRecord?.CreatedAt}</Moment></Descriptions.Item>
                <Descriptions.Item label={(<Typography.Text strong>Updated</Typography.Text>)}><Moment format="DD MMM, YYYY @ hh:mm:ss">{editingRecord?.UpdatedAt}</Moment></Descriptions.Item>

                <Descriptions.Item label={(<Typography.Text strong>Tran Hash</Typography.Text>)}><DisplayHash hash={editingRecord?.tranhash}></DisplayHash></Descriptions.Item>
                <Descriptions.Item label={(<Typography.Text strong>Contract</Typography.Text>)}><DisplayHash hash={editingRecord?.contadd}></DisplayHash></Descriptions.Item>
                <Descriptions.Item label={(<Typography.Text strong>Block Hash</Typography.Text>)}><DisplayHash hash={editingRecord?.blockhash}></DisplayHash></Descriptions.Item>
                <Descriptions.Item label={(<Typography.Text strong>Block Numer</Typography.Text>)}>{editingRecord?.blocknbr}</Descriptions.Item>
            </Descriptions>

            {editingRecord?.documents?.length > 0 ?
                <div>
                    <Divider orientation="left">Event Documents</Divider>
                    <Table size="small" showHeader={true} pagination={false} columns={doccolumns} dataSource={editingRecord?.documents} />
                </div> : ''
            }
        </Modal>
    );
};

const AdvancedSearchForm = ({ setParams }) => {
    const [value, setValue] = useState([]);
    const [expand, setExpand] = useState(false);
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        setParams(values);
    };

    return (
        <div>
            <PageHeader
                className="site-page-header"
                title="Track and Trace"
            >
                <Form
                    form={form}
                    name="advanced_search"
                    // style={{
                    //     padding: "24px",
                    //     border: "1px solid #d9d9d9",
                    //     "border-radius": "2px",
                    // }}
                    onFinish={onFinish} layout="vertical" hideRequiredMark
                >
                    <Row gutter={70}>
                        <Col span={8} >
                            <Form.Item
                                name="eventname"
                                label="Event Name"
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8} >
                            <Form.Item
                                name="tokenid"
                                label="Token Id"
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8} >
                            <Form.Item
                                name="creatoraddress"
                                label="Creator"
                            >
                                <UserSelect
                                    selectValue="baddress"
                                    // mode="multiple"
                                    value={value}
                                    placeholder="Select creator"
                                    onChange={(newValue) => {
                                        setValue(newValue);
                                    }}
                                    style={{
                                        width: "100%",
                                    }}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8} >
                            <Form.Item
                                name="roothash"
                                label="Root Hash"
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8} >
                            <Form.Item
                                name="dochash"
                                label="Document Hash"
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8} >
                            <Form.Item
                                name="doctype"
                                label="Document Type">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col
                            span={24}
                            style={{
                                textAlign: 'right',
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Search
                            </Button>
                            <Button
                                style={{
                                    margin: '0 8px',
                                }}
                                onClick={() => {
                                    form.resetFields();
                                }}
                            >
                                Clear
                            </Button>
                            <a
                                style={{
                                    fontSize: 12,
                                }}
                                onClick={() => {
                                    setExpand(!expand);
                                }}
                            >
                                {expand ? <UpOutlined /> : <DownOutlined />} Collapse
                            </a>
                        </Col>
                    </Row>
                </Form>
            </PageHeader>
        </div>
    );
};

export default Event;