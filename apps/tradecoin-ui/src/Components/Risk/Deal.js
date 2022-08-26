import { React, useState } from 'react'
import { useAddDealMutation, useDeleteDealMutation, useUpdateDealMutation, useGetDealsQuery } from '../../store/risk/dealapi'
import {
    Typography, Drawer, Space,
    Form,
    Input,
    Button,
    message, Table, Modal, Select, Tag, PageHeader, Divider, Row, Col, Card, Tabs, Collapse, Timeline, Descriptions, Steps
} from 'antd';

import { useGetRiskModelQuery } from '../../store/risk/riskmodelapi'
import { useAddRiskAssessmentMutation } from '../../store/risk/riskassessapi'
import { useAddProductEventMutation } from '../../store/product/productapi'

import { BgColorsOutlined, EditOutlined, DeleteOutlined, ReloadOutlined, PlusOutlined } from "@ant-design/icons";
import Moment from 'react-moment';
import { DisplayUser } from '../Utils/DisplayUser';
import UserSelect from '../Utils/UserSelect';
import { useSelector } from 'react-redux';
import { DisplayHash } from '../Utils/DisplayHash';
import { useGetEventsQuery } from '../../store/product/productapi'

import { useGetResourceQuery } from '../../store/product/productapi'
import { DisplayUserByBAddress } from "../Utils/DisplayUserByBAddress";

import { useHistory } from "react-router-dom";

const { Step } = Steps;


const stateList = [
    "PendingCreation",
    "Created",
    "RoadTransport",
    "SeaTransport",
    "RailTransport",
    "AirTransport",
    "Storage",
    "Inspection",
    "Processing",
    "Locked",
    "Burned",
    "EOL"
];

function Deal() {
    const [isEditing, setIsEditing] = useState(false);
    const [isCreate, setIsCreate] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);
    let history = useHistory();

    let userid = useSelector((state) => state.auth.userid);


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
            key: "amount",
            title: "Total Deal",
            dataIndex: "amount",
            render: (record) => {
                return (
                    <div>€ {record}</div>
                );
            },
        },
        {
            key: "lgd",
            title: "LGD",
            dataIndex: "lgd",
            render: (record) => {
                return (
                    <div>€ {record}</div>
                );
            },
        },
        {
            key: "status",
            title: "Status",
            dataIndex: "status",
            render: (record) => (
                <>
                    <Tag color="geekblue" key={record}>
                        {record}
                    </Tag>
                </>
            ),
        },
        {
            key: "financier",
            title: "Financier",
            dataIndex: "financier",
            render: (record) => {
                return (
                    <DisplayUser userid={record}></DisplayUser>
                );
            },
        },
        {
            key: "borrower",
            title: "Borrower",
            dataIndex: "borrower",
            render: (record) => {
                return (
                    <DisplayUser userid={record}></DisplayUser>
                );
            },
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

    const { data = [], isLoading, isFetching, isError } = useGetDealsQuery();

    var updatedData = []
    if (!isLoading) {
        console.log(data);
        data?.forEach((deal) => {
            if (deal.financier == userid) {
                updatedData.push(deal);
            }
        })
    }


    const [deleteDeal, { isDeleteLoading }] = useDeleteDealMutation();

    const key = 'updatable';

    const onDeleteRecord = (record) => {
        Modal.confirm({
            title: "Are you sure, you want to delete this record record?",
            okText: "Yes",
            okType: "danger",
            onOk: () => {
                handleDeleteRecord({ ...record }.ID);
            },
        });
    };
    const handleDeleteRecord = async (id) => {
        try {
            await deleteDeal(id).unwrap().then(res => {
                message.success({
                    content: 'Deal deleted successfully!',
                    key,
                    duration: 2,
                });
                console.log(res)
            }).catch(err => {
                message.error({
                    content: 'Failed to delete deal!',
                    key,
                    duration: 2,
                });
                console.log(err)
            })
        } catch {
        }
    }
    const onEditRecord = (record) => {
        history.push({
            pathname: `/deal/${record.ID}`
        });
    };

    const onAddRecord = () => {
        history.push({
            pathname: `/deal/create`
        });
    };

    return (
        <div>
            <div className="site-page-header-ghost-wrapper">
                <PageHeader
                    ghost={false}
                    title="Deals"
                    extra={[
                        <Button icon={<PlusOutlined />} onClick={() => { onAddRecord() }}>Add</Button>,
                        <Button icon={<ReloadOutlined />} onClick={() => {
                        }}></Button>
                    ]}
                >
                </PageHeader>
            </div>
            <Divider />

            <Table size="small" columns={columns} dataSource={updatedData}></Table>
        </div>
    )
}

export default Deal;