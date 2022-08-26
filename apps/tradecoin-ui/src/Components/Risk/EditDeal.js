import { React, useEffect, useState } from 'react'
import { useAddDealMutation, useDeleteDealMutation, useUpdateDealMutation, useGetDealsQuery, useGetDealQuery } from '../../store/risk/dealapi'
import {
    Typography, Drawer, Space, List, Skeleton, Checkbox,
    Form, Popconfirm, Popover, Link,
    Input,
    Button,
    message, Table, Modal, Select, Tag, PageHeader, Divider, Row, Col, Card, Tabs, Collapse, Timeline, Descriptions, Steps, InputNumber
} from 'antd';

import {
    useGetUserQuery
} from '../../store/auth/userapi'

import { useGetRiskModelQuery, useGetRiskModelsQuery } from '../../store/risk/riskmodelapi'
import { useAddRiskAssessmentMutation, useGetRiskAssessmentsQuery } from '../../store/risk/riskassessapi'
import { useAddProductEventMutation } from '../../store/product/productapi'

import { CaretRightFilled, StopOutlined, DoubleRightOutlined, LeftCircleFilled, RightCircleFilled, BackwardOutlined, ForwardOutlined, MoreOutlined, ReloadOutlined, AuditOutlined, BgColorsOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import Moment from 'react-moment';
import { DisplayUser } from '../Utils/DisplayUser';
import UserSelect from '../Utils/UserSelect';
import { useSelector } from 'react-redux';
import { DisplayHash } from '../Utils/DisplayHash';
import { useGetEventsQuery } from '../../store/product/productapi'

import { useGetResourceQuery } from '../../store/product/productapi'
import { DisplayUserByBAddress } from "../Utils/DisplayUserByBAddress";

import { useHistory } from "react-router-dom";
import { useGetResourcesQuery } from '../../store/product/productapi';

import {
    useParams
} from "react-router-dom";
import { DisplayEvents } from '../Product/Common/DisplayEvents';

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


const EditDeal = (props) => {

    let { id } = useParams();
    console.log(id);

    const { data, isLoading, isFetching, isError } = useGetDealQuery(id);
    var deal = {}
    if (!isLoading) {
        console.log("------editing record", data)
        deal = data;
    }

    const [addDeal, { isCreateLoading }] = useAddDealMutation()
    const [updateDeal, { isUpdateLoading }] = useUpdateDealMutation()

    let userid = useSelector((state) => state.auth.userid);

    const key = 'updatable';

    let history = useHistory();

    const handleAddRecord = async (record) => {
        try {
            await addDeal(record).unwrap().then(res => {
                message.success({
                    content: 'Deal added successfully!',
                    key,
                    duration: 2,
                });
                console.log(res)

                history.push({
                    pathname: `/deal/${res.ID}`
                });

            }).catch(err => {
                message.error({
                    content: 'Failed to add Deal!',
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
            await updateDeal(record).unwrap().then(res => {
                message.success({
                    content: 'Deal updated successfully!',
                    key,
                    duration: 2,
                });
                console.log(res)
            }).catch(err => {
                message.error({
                    content: 'Failed to update Deal!',
                    key,
                    duration: 2,
                });
                console.log(err)
            })
        } catch {
        }
    }

    const onCreate = (values) => {
        if (id == "create") {
            values.borrower = values.borrower.value;
            values.financier = userid
            handleAddRecord(values);
        } else {
            var updateDeal = { ...deal }
            updateDeal.name = values.name;
            updateDeal.desc = values.desc;
            updateDeal.status = values.status;
            if (values.borrower && values.borrower.value) {
                updateDeal.borrower = values.borrower.value;
            }

            updateDeal.amount = values.amount;
            updateDeal.lgd = values.lgd;

            handleEditRecord(updateDeal);
        }
    };

    const { Option } = Select;
    const { Text, Link } = Typography;

    const [value, setValue] = useState([]);

    const [drwarerVisible, setDrwarerVisible] = useState(false);
    const [assessDrwarerVisible, setAssessDrwarerVisible] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);

    const showDrawer = (productid) => {
        console.log("---------showDrawer", productid)
        setDrwarerVisible(true);
        setSelectedProductId(productid);
    };

    const showAssessViewDrawer = (productid) => {
        console.log("---------showAssessViewDrawer", productid)
        setAssessDrwarerVisible(true);
        setSelectedProductId(productid);
    };

    const onClose = () => {
        console.log("---------", drwarerVisible)
        setDrwarerVisible(false);
        setAssessDrwarerVisible(false);
        console.log("---------", drwarerVisible)
    };

    const statusOptions = [];
    statusOptions.push(<Option key='requested'>Requested</Option>);
    statusOptions.push(<Option key='draft'>Draft</Option>);
    statusOptions.push(<Option key='approved'>Approved</Option>);
    statusOptions.push(<Option key='rejected'>Rejected</Option>);
    statusOptions.push(<Option key='closed'>Closed</Option>);

    const colletral_columns = [
        {
            title: 'Events',
            dataIndex: 'collateralid',
            key: 'collateralid',
            //width: 700,
            render: (record) => {
                let loadcount = 4;
                return (
                    <DisplayEvents loadcount={loadcount} productid={record} node="main" loadmore={() => { }}></DisplayEvents>
                );
            },
        },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 600,
            render: (record) => {
                return (
                    <ProductDetails productid={record.collateralid} deal={record} showDrawer={showDrawer} showAssessViewDrawer={showAssessViewDrawer}></ProductDetails>
                );
            },
        },
    ];

    const [form] = Form.useForm();

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = (selectedCollaterals) => {

        console.log("selectedCollaterals", selectedCollaterals);

        var exitingCollaterals = []
        exitingCollaterals = [...deal.collaterals]

        selectedCollaterals.forEach((collateral) => {
            exitingCollaterals.push(collateral);
        })

        var cloneEditingRecord = { ...deal }
        cloneEditingRecord.collaterals = exitingCollaterals
        deal = cloneEditingRecord;

        handleEditRecord(deal);

        console.log("deal", deal);
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (

        <div>
            <PageHeader
                className="site-page-header"
                onBack={() => {
                    history.push({
                        pathname: `/deal/list`
                    });
                }}
                title="Edit Deal"
            />
            <br></br>

            {!isLoading ?
                <div>
                    <div style={{
                        padding: "24px",
                        // background: "#fbfbfb",
                        border: "1px solid #d9d9d9",
                    }}>
                        <Form
                            form={form}
                            name="org"
                            initialValues={deal}
                            onFinish={onCreate}
                            layout="vertical" hideRequiredMark
                        >
                            <Row gutter={[100, 0]}>
                                <Col span={8} >
                                    <Form.Item
                                        name="name"
                                        label={<Text>Name</Text>}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input Organization name!',
                                            },
                                        ]}
                                    >
                                        <Input ></Input>
                                    </Form.Item>
                                </Col>
                                <Col span={8} >
                                    <Form.Item
                                        name="desc"
                                        label={<Text>Description</Text>}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input Organization name!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={8} >
                                    <Form.Item
                                        name="status"
                                        label={<Text>Status</Text>}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input Organization name!',
                                            },
                                        ]}
                                        hasFeedback
                                    >
                                        <Select
                                            allowClear
                                            style={{
                                                width: "100%",
                                            }}
                                            placeholder="Please select"
                                        //onChange={handleChange}
                                        >
                                            {statusOptions}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={8} >
                                    <Form.Item name="borrower" label={<Text>Borrower</Text>} rules={[
                                        {
                                            required: true,
                                            message: 'Please input Borrower!',
                                        },
                                    ]} hasFeedback>
                                        <UserSelect

                                            selectValue="uid"
                                            // mode="multiple"
                                            value={value}
                                            placeholder="Select Borrower"
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
                                        name="amount"
                                        label={<Text>Total Deal</Text>}
                                        rules={[
                                        ]}
                                    >
                                        <InputNumber prefix="€" style={{
                                            width: "100%",
                                        }}></InputNumber>
                                    </Form.Item>
                                </Col>
                                <Col span={8} >
                                    <Form.Item
                                        name="lgd"
                                        label={<Text>LGD</Text>}
                                        rules={[
                                        ]}
                                    >
                                        <InputNumber prefix="€" style={{
                                            width: "100%",
                                        }}></InputNumber>
                                    </Form.Item>
                                </Col>
                                <Col span={8} >
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                    <Divider orientation='left'><div>Collateral Pool <Button size="small" type="primary" shape="circle" icon={<PlusOutlined />}
                        onClick={() => {
                            showModal();
                        }}></Button>

                        <CollateralPool isModalVisible={isModalVisible} handleOk={handleOk} handleCancel={handleCancel} borrower={value} deal={deal}></CollateralPool>

                    </div>
                    </Divider>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Table size="small" showHeader={false}
                                columns={colletral_columns}
                                dataSource={deal?.collaterals}
                                scroll={{
                                    x: 1000,
                                    y: 10000,
                                }}
                            />
                        </Col>
                    </Row>

                    <AssessRisk deal={deal} selectedProductId={selectedProductId} drwarerVisible={drwarerVisible} onClose={onClose}></AssessRisk>
                    <ViewRiskAssessments selectedProductId={selectedProductId} drwarerVisible={assessDrwarerVisible} onClose={onClose}></ViewRiskAssessments>

                </div> : ""
            }
        </div>


    );
};

const CollateralPool = ({ isModalVisible, handleOk, handleCancel, borrower, deal }) => {

    const { data = [], isLoading, isFetching, isError } = useGetResourcesQuery();
    const [selectedCollaterals, setSelectedCollaterals] = useState([]);


    console.log("borrower", borrower)

    var borrowerId = "";
    if (borrower.length == 0) {
        borrowerId = deal?.borrower
    } else {
        borrowerId = borrower?.value
    }

    const { data: userData, isLoading: isUserLoading, isFetching: isUserFeatching, isError: isUserError } = useGetUserQuery(borrowerId);
    if (!isUserLoading) {
        console.log("DisplayUser----data", userData);
    }

    var ownedProducts = []
    if (data) {
        data.forEach(product => {
            if (userData?.baddress?.toLowerCase() == product.owner) {
                console.log("added owned product", product)
                ownedProducts.push(product);
            }
        });
    }

    console.log("ownedProducts", ownedProducts);

    //remove selected collateralids
    var productsToShow = []
    if (ownedProducts) {
        ownedProducts.forEach(product => {
            var isAlreadyAdded = false;
            if (deal) {
                deal.collaterals.forEach(collateral => {
                    if (collateral.collateralid === product.ID) {
                        isAlreadyAdded = true;
                    }
                })
            }
            if (!isAlreadyAdded) {
                productsToShow.push(product);
            }

        });
    }


    const onSelectProduct = (e, item) => {
        console.log(e, item);
        if (e.target.checked) {

            var clonedSelectedCollaterals = [...selectedCollaterals]
            clonedSelectedCollaterals.push({
                collateralid: item.ID,
                tokenid: item.tokenid,
                tokenname: item.tokenname,
                type: "product",
            })
            setSelectedCollaterals(clonedSelectedCollaterals);


        } else {

            var clonedSelectedCollaterals = [...selectedCollaterals]
            clonedSelectedCollaterals = clonedSelectedCollaterals.filter(data => data.ID != item.ID);

            setSelectedCollaterals(clonedSelectedCollaterals);

        }
    };

    return (<Modal
        title="Select Collateral(s)"
        visible={isModalVisible}
        onCancel={() => {
            handleCancel()
        }}
        onOk={() => {
            handleOk(selectedCollaterals);
        }}
    >

        <List
            className="demo-loadmore-list"
            itemLayout="horizontal"
            pagination={{
                onChange: (page) => {
                    console.log(page);
                },
                pageSize: 6,
                position: "bottom",
            }}

            dataSource={productsToShow}
            renderItem={(item) => (
                <List.Item>
                    <Skeleton avatar title={false} loading={item.loading} active>
                        <List.Item.Meta
                            title={<>
                                {item.tokenname} {item.tokenid}
                                <Divider type="vertical" />
                                {item.commodity}
                                <div style={{ float: 'right' }}><Checkbox onChange={(e) => {
                                    onSelectProduct(e, item);
                                }}></Checkbox></div>
                            </>}
                            description={<div style={{ overflow: 'auto' }}>{item.amount} {item.unit}, {stateList[item?.state]}</div>}
                        />
                    </Skeleton>
                </List.Item>
            )}
        />

    </Modal>);

}

const AddMetric = ({ riskmodel }) => {

    console.log("riskmdoel id", riskmodel)
    const { data: riskmdoel, isLoading, isFetching, isError } = useGetRiskModelQuery(riskmodel);

    if (!isLoading) {
        console.log(riskmdoel)
    }

    return (
        <div>
            {riskmdoel?.risks?.length > 0 ?
                <div>
                    <Row gutter={16}>
                        {riskmdoel?.risks?.map((risk, index) =>
                            <Col span={12}>
                                <Divider orientation='left'>{risk.name}</Divider>
                                {
                                    risk?.metrics?.map((metric, index) => {
                                        return (<div>
                                            {metric.type == "boolean" ? <Form.Item
                                                name={metric.name}
                                                label={metric.name}
                                                valuePropName="checked"
                                            >
                                                <Checkbox style={{
                                                    width: '90%',
                                                }} />
                                            </Form.Item> : <Form.Item
                                                name={metric.name}
                                                label={metric.name}
                                            >
                                                {metric.type == "string" ? <Input style={{
                                                    width: '90%',
                                                }}></Input> : metric.type == "number" ? <InputNumber style={{
                                                    width: '90%',
                                                }} /> : ""
                                                }

                                            </Form.Item>}

                                        </div>
                                        )
                                    }

                                    )
                                }
                            </Col>
                        )}
                    </Row>
                </div> : ''
            }
        </div>);
}

const ViewRiskAssessments = ({ selectedProductId, onClose, drwarerVisible }) => {

    const { data: riskassessments, isLoading, isFetching, isError } = useGetRiskAssessmentsQuery();

    if (!isLoading) {
        console.log(riskassessments)
    }

    var selectedRiskAssessments = []
    let count = 0;
    if (!isLoading) {
        //Filter by user
        riskassessments?.forEach((riskassessment) => {
            if (riskassessment?.collaterals) {
                var collateral = riskassessment.collaterals[0];
                if (collateral?.collateralid == selectedProductId) {
                    var clone = { ...riskassessment }
                    clone.key = count;
                    count = count + 1;
                    selectedRiskAssessments.push(clone)
                }
            }
        })
    }

    const columns = [
        {
            key: "id",
            title: "Id",
            dataIndex: "ID",
        },
        {
            key: "name",
            title: "Name",
            dataIndex: "name",
        },
        {
            key: "lgd",
            title: "LGD",
            dataIndex: "lgd",
            render: (record) => {
                return (
                    <>€ {record}</>
                );
            },
        },
        {
            key: "CreatedAt",
            title: "Created",
            dataIndex: "CreatedAt",
            render: (record) => {
                return (
                    <Moment format="DD MMM, YYYY">{record}</Moment>
                );
            },
        },
        {
            key: "UpdatedAt",
            title: "Updated",
            dataIndex: "UpdatedAt",
            render: (record) => {
                return (
                    <Moment format="DD MMM, YYYY">{record}</Moment>
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
                                //onEditRecord(record);
                            }}
                            style={{ marginRight: 10 }}
                        />
                        <Divider type="vertical"></Divider>
                        <DeleteOutlined
                            onClick={() => {
                                //onDeleteRecord(record);
                            }}
                            style={{ color: "red", marginLeft: 10 }}
                        />
                    </>
                );
            },
        },
    ];



    return (
        <div>
            <Drawer
                size="large"
                title="View Risk Assessments"
                placement="right"
                closable={true}
                onClose={onClose}
                visible={drwarerVisible}
                getContainer={false}
                bodyStyle={{
                    paddingBottom: 80,
                }}
                style={{
                    position: 'absolute',
                }}

            >
                <Table size="small" columns={columns} expandable={{
                    expandedRowRender: (record) => (
                        <Descriptions size="small">
                            {record?.dynstringfields?.map((field, index) =>
                                <Descriptions.Item label={(<Typography.Text>{field.name}</Typography.Text>)} span={1}>{field.value}</Descriptions.Item>
                            )}
                            {record?.dynbooleanfields?.map((field, index) =>
                                <Descriptions.Item label={(<Typography.Text>{field.name}</Typography.Text>)} span={1}>{field.value + ""}</Descriptions.Item>
                            )}
                            {record?.dynuintfields?.map((field, index) =>
                                <Descriptions.Item label={(<Typography.Text>{field.name}</Typography.Text>)} span={1}>{field.value}</Descriptions.Item>
                            )}
                        </Descriptions>
                    ),
                    rowExpandable: (record) => record.name !== 'Not Expandable',
                }} dataSource={selectedRiskAssessments}></Table>

            </Drawer>
        </div >
    );
}

const AssessRisk = ({ deal, selectedProductId, onClose, drwarerVisible }) => {

    const [form] = Form.useForm();
    const [value, setValue] = useState([]);

    const { data, isLoading: isProductLoading, isFetching: isProductFetching, isError: isProductError } = useGetResourceQuery(selectedProductId);
    const { data: riskmdoels, isLoading, isFetching, isError } = useGetRiskModelsQuery();

    let userid = useSelector((state) => state.auth.userid);

    const [updateDeal, { isUpdateLoading }] = useUpdateDealMutation()

    const updateDealRecord = async (record) => {
        try {
            await updateDeal(record).unwrap().then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
        } catch {
        }
    }

    if (!isProductLoading) {
        console.log(data)
    }

    var riskModels = []
    if (!isLoading && !isProductLoading) {

        console.log("riskmdoels--------", riskmdoels);

        //Filter by user
        riskmdoels?.forEach((riskmodel) => {
            if (riskmodel.userid == userid) {
                //filter by product type and state
                if (data?.commodity == riskmodel?.commodity) {
                    riskModels.push(<Option key={riskmodel.ID}>{riskmodel.name}</Option>)
                }
            }
        })
    }

    const [addRiskAssessment, { isCreateLoading }] = useAddRiskAssessmentMutation()
    const [addProductEvent, { isAddProductEventLoading }] = useAddProductEventMutation()

    const onSelectRiskModel = (value) => {
        setValue(value);
    }

    const onCreate = (values) => {
        console.log("values", values);

        var riskassess = {
            name: "Risk Assessement",
            lgd: values.lgd,
        }

        //recalculate and update deal level LGD
        let totalLgd = deal.lgd + values.lgd;
        var cloneDeal = { ...deal }
        cloneDeal.lgd = totalLgd
        updateDealRecord(cloneDeal);

        let collaterals = []
        if (data) {
            const collateral = {
                collateralid: data.ID,
                tokenid: data.tokenid,
                tokenname: data.tokenname,
                type: "product",
            }
            collaterals.push(collateral)
        }
        riskassess.collaterals = collaterals;


        //get selected risk model and get all mtricsts
        console.log("riskmdoels--------", riskmdoels);
        var cloneValues = { ...values }
        var allMetrics = []
        if (!isLoading) {
            riskmdoels.forEach((riskmodel) => {
                if (riskmodel.ID + "" == cloneValues.riskmodel) {
                    riskmodel.risks?.forEach((risk) => {
                        if (risk.metrics && risk.metrics.length > 0) {
                            risk.metrics.forEach((metric) => {
                                allMetrics.push(metric);
                            })
                        }
                    })
                }
            })
        }


        delete cloneValues.value
        delete cloneValues.riskmodel
        delete cloneValues.lgd

        var dynstringfields = []
        var dynuintfields = []
        var dynbooleanfields = []
        const entries = Object.entries(cloneValues);
        entries.forEach(([key, value]) => {
            if (key != "value" && key != "riskmodel") {

                //Find out the type of metric and add accoringly
                const searchIndex = allMetrics.findIndex((metric) => metric.name == key);
                const inputtype = allMetrics[searchIndex].type;

                if (inputtype == "string") {
                    dynstringfields.push({
                        name: key,
                        value: value
                    })
                } else if (inputtype == "number") {
                    dynuintfields.push({
                        name: key,
                        value: value
                    })
                } else if (inputtype == "boolean") {
                    dynbooleanfields.push({
                        name: key,
                        value: value
                    })
                }

            }
        });

        riskassess.dynstringfields = dynstringfields;
        riskassess.dynuintfields = dynuintfields;
        riskassess.dynbooleanfields = dynbooleanfields;
        console.log("riskassess", riskassess);
        handleAddRecord(riskassess);

    }

    const key = 'updatable';
    const handleAddRecord = async (record) => {
        try {
            await addRiskAssessment(record).unwrap().then(res => {
                message.success({
                    content: 'RiskAssesment added successfully!',
                    key,
                    duration: 2,
                });
                console.log(res)

                var productEvent = {}
                productEvent.productid = selectedProductId
                productEvent.event = {
                    eventname: "Risk Assessment",
                    eventdesc: "Risk assessment is performed on the Product ",
                    dynamicfields: [{
                        fieldname: "Risk Assessment ID",
                        fieldvalue: res.ID + ""
                    }]
                }
                console.log("productEvent", productEvent)

                handleAddProductEvent(productEvent);

            }).catch(err => {
                message.error({
                    content: 'Failed to add RiskAssesment!',
                    key,
                    duration: 2,
                });
                console.log(err)
            })
        } catch {
        }
    }

    const handleAddProductEvent = async (record) => {
        try {
            await addProductEvent(record).unwrap().then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
        } catch {
        }
    }

    return (
        <div>
            <Drawer
                size="large"
                title="Assess Risk"
                placement="right"
                closable={true}
                onClose={onClose}
                visible={drwarerVisible}
                getContainer={false}
                bodyStyle={{
                    paddingBottom: 80,
                }}
                style={{
                    position: 'absolute',
                }}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={() => {
                            form
                                .validateFields()
                                .then((values) => {
                                    console.log("------", values)
                                    form.resetFields();
                                    onCreate(values);
                                }).catch((info) => {
                                    console.log('Validate Failed:', info);
                                });
                        }} type="primary">
                            Submit
                        </Button>
                    </Space>
                }
            >
                <Form form={form} name="assessrisk" layout="vertical" hideRequiredMark>
                    <Form.Item name="riskmodel" label="Risk Model" rules={[
                        {
                            required: true,
                            message: 'Please input Financier!',
                        },
                    ]} hasFeedback>
                        <Select
                            allowClear
                            style={{
                                width: '100%',
                            }}
                            placeholder="Please select"
                            onSelect={(e) => {
                                console.log("-------select", e);
                                onSelectRiskModel(e);
                            }}
                        >
                            {riskModels}
                        </Select>
                    </Form.Item>
                    <Form.Item name="lgd" label="Loss Given Default (LGD)" rules={[
                        {
                            required: true,
                            message: 'Please input LGD!',
                        },
                    ]} hasFeedback>
                        <InputNumber style={{ width: "100%" }} prefix="€"></InputNumber>
                    </Form.Item>

                    <AddMetric riskmodel={value}></AddMetric>


                </Form>
            </Drawer>
        </div >
    );
}

const ProductDetails = ({ productid, deal, showDrawer, showAssessViewDrawer }) => {

    console.log(productid);

    const { data, isLoading: isProductLoading, isFetching: isProductFetching, isError: isProductError } = useGetResourceQuery(productid);

    if (!isProductLoading) {
        console.log(data)
    }

    return (
        <div>

            <div style={{
                padding: "8px",
                // background: "#fbfbfb",
                border: "1px solid #d9d9d9",
            }}>

                <Descriptions size="small">
                    <Descriptions.Item label={(<Typography.Text strong>{data?.tokenname}-{data?.tokenid}</Typography.Text>)} span={1.5}>{data?.amount} {data?.unit} of {data?.commodity}</Descriptions.Item>
                    <Descriptions.Item label={(<Typography.Text strong>State</Typography.Text>)} span={1.5}>{stateList[data?.state]}</Descriptions.Item>
                    <Descriptions.Item label={(<Typography.Text strong>Owner</Typography.Text>)} span={1.5}><DisplayUserByBAddress baddress={data?.owner}></DisplayUserByBAddress></Descriptions.Item>
                    <Descriptions.Item label={(<Typography.Text strong>Handler</Typography.Text>)} span={1.5} ><DisplayUserByBAddress baddress={data?.handler}></DisplayUserByBAddress></Descriptions.Item>
                </Descriptions>
                <Descriptions size="small">
                    <Descriptions.Item label={(<Typography.Text strong>Transformation</Typography.Text>)} span={3}>
                        {data?.trans?.length > 0 ?
                            <div>
                                {data?.trans?.map((e, index) =>
                                    <><Tag color="#108ee9">{e}</Tag><DoubleRightOutlined /> </>
                                )}
                            </div> : ''
                        }
                    </Descriptions.Item>
                </Descriptions>
                <Row gutter={[8, 16]}>
                    <Col span={12}><Button type="primary" block onClick={() => { showDrawer(productid) }}>Assess Risk</Button></Col>
                    <Col span={12}><Button type="primary" block onClick={() => { showAssessViewDrawer(productid) }}>View Assessements</Button></Col>
                </Row>

            </div>
        </div>);
}



export default EditDeal;