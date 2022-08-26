import {
    Avatar, Button, List, Skeleton, Divider, Typography, Form,
    Input, Segmented, Badge,
    message, Table, Modal, Select, Tag, PageHeader, Checkbox, Popover, Tabs, Tooltip
} from 'antd';
import { useState } from 'react';

import { useGetResourcesQuery, useAddResourceMutation, useUpdateResourceMutation } from '../../store/product/productapi';
import { useGetCommoditiesQuery, useGetUnitsQuery } from '../../store/product/referenceapi';
import { useSelector, useDispatch } from 'react-redux';
import { setProduct, removeProduct } from '../../store/product/productSlice';
import { useHistory, useLocation } from "react-router-dom";
import { ProfileOutlined, TeamOutlined, WalletOutlined, BarsOutlined, QuestionCircleOutlined, PlusOutlined } from "@ant-design/icons";

import FetchProduct from '../../bcclient/FetchProduct'

import { ethers } from "ethers";
import seedRandom from 'seedrandom';

const config = require("../../config");
const {
    YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS,
    YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS_ABI
} = config.default;

function MyProductsSider({ setCollapseddd }) {

    const [isEditing, setIsEditing] = useState(false);
    const [isCreate, setIsCreate] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);

    const [initLoading, setInitLoading] = useState(false);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();

    const { data = [], isLoading, isFetching, isError } = useGetResourcesQuery();
    const [addProduct, { isCreateLoading }] = useAddResourceMutation();
    const [updateProduct, { isUpdateLoading }] = useUpdateResourceMutation();

    if (!isLoading) {
        console.log("*********data", data);
    }

    //owned tokens
    let userbaddress = useSelector((state) => state.auth.userbaddress);
    var ownedProducts = []
    if (data) {
        data.forEach(product => {
            console.log("userbaddress", userbaddress?.toLowerCase())
            console.log("product.owner", product?.owner)
            if (userbaddress?.toLowerCase() == product.owner) {
                console.log("added owned product", product)
                ownedProducts.push(product);
            }
        });
    }

    console.log("ownedProducts", ownedProducts)

    var assignedProducts = []
    if (data) {
        data.forEach(product => {
            if (userbaddress?.toLowerCase() == product.handler) {
                console.log("added assined product", product)
                assignedProducts.push(product);
            }
        });
    }
    console.log("assignedProducts", assignedProducts)

    const loadMore =
        <div
            style={{
                textAlign: 'center',
                marginTop: 12,
                //height: 32,
                //lineHeight: '32px',
            }}
        >
            <Button
                //style={{ background: "rgba(196,196,196,255)" }}
                type="primary"
                shape="circle"
                size="large"
                icon={<PlusOutlined />}
                onClick={() => {
                    setIsEditing(false);
                    setIsCreate(true)
                    setEditingRecord(null);
                }}></Button>
            <Typography.Title level={5}>
                {/* <span class="text-white-no-hover"> */}
                New Product
                {/* </span> */}
            </Typography.Title>
        </div>


    const onSelectProduct = (e, item) => {
        console.log(e, item);
        if (e.target.checked) {
            dispatch(setProduct(item));
        } else {
            dispatch(removeProduct(item.ID));
        }
        history.push("/product");
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
            //handleEditRecord(editingRecord);
            setIsEditing(false);
        } else if (isCreate) {
            handleAddRecord(values);
        }
    };

    const key = 'updatable';
    const handleAddRecord = async (record) => {
        record.trans = [];
        try {
            // After Successful tokenization
            record.status = "draft"
            await addProduct(record).unwrap().then(res => {
                console.log("----", res.ID);
                record.ID = res.ID;
                message.success({
                    content: 'The product is created successfully, Tokenization is in-progress!',
                    key,
                    duration: 2,
                });
                console.log(res)
            }).catch(err => {
                message.error({
                    content: 'Failed to add new product!',
                    key,
                    duration: 2,
                });
                console.log(err)
            })
        } catch {
        }
        try {
            // Sub flow : Tokenize the product..
            await initialTokenization(record);
        } catch {
        }
    }


    //////blockchain client

    async function requestAccount() {
        await window.ethereum.request({ method: "eth_requestAccounts" });
    }

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

    async function updateTranHash(tranhash, record) {
        record.lasttranhash = tranhash;
        console.log("record --------------", record);
        try {
            updateProduct(record).unwrap().then(res => { console.log(res) }).catch(err => { console.log(err) })
        } catch {
        }
    }

    async function initialTokenization(record) {
        var amount = record.amount;
        var product = record.commodity;
        var unitType = record.unit

        if (!amount && !product && !unitType) return;
        if (typeof window.ethereum !== "undefined") {
            await requestAccount();
            try {
                const options = {
                    enableHighAccuracy: false,
                    maximumAge: 30000,
                    timeout: 27000
                }
                navigator.geolocation.getCurrentPosition(
                    async function (position) {
                        const provider = new ethers.providers.Web3Provider(window.ethereum);
                        const randomNumbers = seedRandom((await provider.getSigner().getAddress()).toString());
                        const plusOrMinusLon = randomNumbers() < 0.5 ? -1 : 1;
                        const plusOrMinusLat = randomNumbers() < 0.5 ? -1 : 1;
                        var randomLon = (randomNumbers() * (0.4 - 0.02) + 0.02).toFixed(7);
                        var randomLat = (randomNumbers() * (0.4 - 0.02) + 0.02).toFixed(7);
                        randomLon = position.coords.longitude + randomLon * plusOrMinusLon;
                        randomLat = position.coords.latitude + randomLat * plusOrMinusLat;
                        const geoLocation = randomLat.toString() + ", " + randomLon.toString();
                        const contract = new ethers.Contract(YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS, YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS_ABI, provider.getSigner());
                        const transaction = await contract.initialTokenization(product, amount * 1e3, ethers.utils.formatBytes32String(unitType), geoLocation);
                        //Update transactionhash to Product, so the in the callback we know which token is for which product
                        updateTranHash(transaction.hash, record);

                    },
                    function (error) {
                        console.error("Error Code = " + error.code + " - " + error.message);
                        alert('Your position could not be found, check if your gps is on.')
                    },
                    options
                );
            } catch (err) {
                console.log("Error: ", err);
                window.alert(err);
            }
        }
    }

    const { TabPane } = Tabs;

    const onChange = (key) => {
        console.log(key);
    };

    const [displayTab, setDisplayTab] = useState("Owned");

    const productListDisplay = (item) => {
        return (<List.Item>
            <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta
                    title={<>
                        {item.commodity} [{item.amount} {item.unit}, {stateList[item?.state] ? stateList[item?.state] : `Not Tokenenized`}]
                        <div style={{ float: 'right' }}>
                            <Checkbox
                                // disabled={item.status == "active" ? false : true}
                                onChange={(e) => {
                                    onSelectProduct(e, item);
                                }}>
                            </Checkbox>
                        </div>
                    </>}
                    description={
                        <Badge.Ribbon placement="end"
                            color={item.status == "active" ? "cyan" : item.status == "exit" ? "volcano" : "blue"}
                            text={item.status == "active" ? "Active" : item.status == "exit" ? "Inactive" : item.status == "draft" ? "Draft" : item.status}>
                            <div style={{ overflow: 'auto' }}>{item.tokenname}-{item.tokenid}</div>
                        </Badge.Ribbon>}
                />
            </Skeleton>
        </List.Item>);
    }



    return (
        <div style={{ padding: '0px 20px' }}>

            <Segmented block size="large" onChange={(e) => {
                setDisplayTab(e);
            }}
                options={[
                    {
                        label: <Typography.Text strong> Owned</Typography.Text>,
                        value: 'Owned',
                        icon: <WalletOutlined />,
                    },
                    {
                        label: <Typography.Text strong> Assigned</Typography.Text>,
                        value: 'Assigned',
                        icon: <TeamOutlined />,

                    },
                    {
                        label: <Typography.Text strong> Others</Typography.Text>,
                        value: 'Others',
                        icon: <ProfileOutlined />,
                    },
                ]}
            />

            <br></br>

            {displayTab == "Owned" ? <List
                className="demo-loadmore-list"
                loading={initLoading}
                itemLayout="horizontal"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 6,
                    size: "small",
                    position: "bottom",
                }}

                dataSource={ownedProducts}
                footer={loadMore}
                renderItem={(item) => (
                    productListDisplay(item)
                )}
            /> : ""}

            {displayTab == "Assigned" ? <List
                className="demo-loadmore-list"
                loading={initLoading}
                itemLayout="horizontal"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 6,
                    position: "bottom",
                    size: "small"
                }}

                dataSource={assignedProducts}
                footer={loadMore}
                renderItem={(item) => (
                    productListDisplay(item)
                )}
            /> : ""}

            {displayTab == "Others" ? <List
                className="demo-loadmore-list"
                loading={initLoading}
                itemLayout="horizontal"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 6,
                    size: "small",
                }}

                dataSource={data}
                footer={loadMore}
                renderItem={(item) => (
                    productListDisplay(item)
                )}
            /> : ""}

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

const CollectionCreateForm = ({ visible, onCreate, onCancel, editingRecord }) => {
    const { data, isLoading } = useGetCommoditiesQuery();
    const { data: unitData, isLoading: isLoadingData } = useGetUnitsQuery();
    const { Option } = Select;

    const unitList = [];
    if (!isLoadingData) {
        unitData?.forEach(element => {
            unitList.push(<Option key={element.unit}>{element.unit}</Option>)
        });
    }

    const productTypes = [];
    if (!isLoading) {
        data?.forEach(element => {
            console.log(element)
            productTypes.push(<Option key={element.name}>{element.name}</Option>)
        });
    }

    const units = [];
    units.push(<Option key='Cubic Meter (m^3)'>Cubic Meter (m^3)</Option>);
    units.push(<Option key='Bushel (US)'>Bushel (US)</Option>);
    units.push(<Option key='Liter'>Liter</Option>);
    units.push(<Option key='KiloGram'>KiloGram</Option>);
    units.push(<Option key='Gram'>Gram</Option>);
    units.push(<Option key='Ton (Metric)'>Ton (Metric)</Option>);


    const [form] = Form.useForm();
    return (
        <Modal
            title="New Product"
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
                    name="commodity"
                    label="Product Type"
                    rules={[
                        {
                            required: true,
                            message: 'Please input Amount name!',
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
                        {productTypes}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="amount"
                    label={
                        <span>
                            Amount <Tooltip placement="top" title="Make sure this is according to the unit type">
                                <QuestionCircleOutlined />
                            </Tooltip>
                        </span>
                    }
                    rules={[
                        {
                            required: true,
                            message: 'Please input Amount name!',
                        },
                    ]}
                    hasFeedback
                >

                    <Input />

                </Form.Item>
                <Form.Item
                    name="unit"
                    label="Unit"
                    rules={[
                        {
                            required: true,
                            message: 'Please input Amount name!',
                        },
                    ]}
                    hasFeedback
                >
                    <Select allowClear
                        style={{
                            width: '100%',
                        }}
                        placeholder="Please select"
                    >
                        {unitList}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="state"
                    label={
                        <span>
                            State <Tooltip placement="top" title="The default state of the new product">
                                <QuestionCircleOutlined />
                            </Tooltip>
                        </span>
                    }
                >
                    <Input disabled={true} defaultValue="Raw" />
                </Form.Item>
                <Tooltip />

                <Form.Item
                    name="status"
                    label={
                        <span>
                            Status <Tooltip placement="top" title="The Default status of the new product">
                                <QuestionCircleOutlined />
                            </Tooltip>
                        </span>
                    }
                >
                    <Input disabled={true} defaultValue="Pending Creation" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default MyProductsSider;

const HashDisplay = ({ hash }) => {

    var buttonVal = "";
    buttonVal = hash?.slice(0, 5) + "..." + hash?.slice(hash?.length - 4, hash?.length)

    return (
        <div>
            <Popover content={hash} trigger="click" >
                <Button type="link">{buttonVal}</Button>
            </Popover>
        </div>);
}
