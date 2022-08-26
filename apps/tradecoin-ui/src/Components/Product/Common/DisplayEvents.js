import { React, useEffect, useState } from 'react'
import {
    Typography, Drawer, Space, List, Skeleton, Checkbox,
    Form, Popconfirm, Popover, Link,
    Input,
    Button,
    message, Table, Modal, Select, Tag, PageHeader, Divider, Row, Col, Card, Tabs, Collapse, Timeline, Descriptions, Steps, InputNumber
} from 'antd';

import { LeftOutlined, CaretRightFilled, StopOutlined, DoubleRightOutlined, LeftCircleFilled, RightCircleFilled, BackwardOutlined, ForwardOutlined, MoreOutlined, ReloadOutlined, AuditOutlined, BgColorsOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import Moment from 'react-moment';

import { DisplayHash } from '../../Utils/DisplayHash';
import { useGetEventsQuery } from '../../../store/product/productapi';
import GoogleMap from '../../TrackAndTrace/GoogleMap/GoogleMaps';

const { Step } = Steps;

export const DisplayEvents = ({ productid, node, loadmore, loadcount, initdirection }) => {

    console.log(productid);

    const [displayEvents, setDisplayEvents] = useState([]);
    const { data: events, isLoading, isFetching, isError } = useGetEventsQuery(productid);

    //remove transfer events

    var data = []
    if (!isLoading && events) {
        data = [...events]
        data = data.filter(event => event.eventname != "Transfer");
    }

    const [totalEvents, setTotalEvents] = useState(0);
    const [startCount, setStartCount] = useState(0);

    var dataToLoad = []

    useEffect(() => {
        console.log("inuseeffect", isLoading, events)
        if (!isLoading && events) {
            console.log(data);
            if (initdirection == "first") {
                let start = 0;
                let end = start + loadcount;
                if (start + loadcount >= data.length) {
                    end = data.length;
                }
                setTotalEvents(data.length);
                setStartCount(start);
                dataToLoad = data.slice(start, end);
                setDisplayEvents(dataToLoad);
            } else {
                let start = data.length - loadcount;
                let end = data.length;
                if (data.length - loadcount < 0) {
                    start = 0;
                }
                setTotalEvents(data.length);
                setStartCount(start);
                dataToLoad = data.slice(start, end);
                setDisplayEvents(dataToLoad);
            }

        }

    }, [events]);

    console.log("--- displayEvents", displayEvents)

    const onBackward = () => {
        let start = startCount - loadcount;
        let end = startCount;
        if (startCount - loadcount < 0) {
            start = 0;
            end = start + loadcount;
        }
        dataToLoad = data.slice(start, end);
        setDisplayEvents(dataToLoad);
        setStartCount(start);

        if (start == 0 && node == "main") {
            loadmore("left");
        }

    }

    const onForward = () => {
        let start = startCount + loadcount;
        let end = startCount + loadcount * 2;
        if (startCount + loadcount >= totalEvents) {
            start = totalEvents - loadcount;
            end = start + loadcount;
        }
        dataToLoad = data.slice(start, end);
        setDisplayEvents(dataToLoad);
        setStartCount(start);

        if (startCount + loadcount < totalEvents) {
            if (node == "main") {
                loadmore("right");
            }
        }

    }

    return (
        <div>

            {!isLoading && displayEvents?.length > 0 ?
                <Steps size="small" labelPlacement="vertical" current={displayEvents?.length + 1}>
                    {startCount != 0 && <Step status="finish"
                        icon={<LeftCircleFilled
                            onClick={() => {
                                onBackward();
                            }}
                        />}
                    />
                    }
                    {displayEvents?.map((e, index) => {
                        return (<Step title={<Popover placement="bottom" trigger="click" title={e.eventname} content={<EventDetails e={e}></EventDetails>} >
                            <Typography.Link>{e.eventname}</Typography.Link>
                        </Popover>} description={<Moment format="DD MMM, YYYY">{e.CreatedAt}</Moment>} />)

                    }
                    )}
                    {startCount + loadcount < totalEvents && <Step status="finish"
                        icon={<RightCircleFilled
                            onClick={() => {
                                onForward();
                            }}
                            style={{ marginRight: 10 }}
                        />} />

                    }
                </Steps> : ''
            }
        </div>);
}

const EventDetails = ({ e }) => {
    const geoLocation = e?.geolocation;


    const product_doc_columns = [
        {
            key: "doctype",
            title: "Document Type",
            dataIndex: "doctype",
        },
        {
            key: "dochash",
            title: "Document Hash",
            dataIndex: "dochash",
            render: (record) => {
                return (
                    <DisplayHash hash={record}></DisplayHash>
                );
            },
        },
    ]

    return (<div style={{
        width: "255px",
    }}>
        <Descriptions size="small">
            <Descriptions.Item span={3} label="Description">{e.eventdesc}</Descriptions.Item>
            <Descriptions.Item span={3} label="Token">{e.tokenid}</Descriptions.Item>
            {e?.dynamicfields?.map((field, index) =>
                <Descriptions.Item span={3} label={field.fieldname}>{field.fieldvalue}</Descriptions.Item>
            )}
            <Descriptions.Item span={3} label="Contract"><DisplayHash hash={e.contadd}></DisplayHash></Descriptions.Item>
            <Descriptions.Item span={3} label="Tran Hash"><DisplayHash hash={e.tranhash}></DisplayHash></Descriptions.Item>
            <Descriptions.Item span={3} label="Block Number">{e.blocknbr}</Descriptions.Item>
            {geoLocation ?
                <>
                    <Descriptions.Item span={3} label="GeoLocation">{
                        geoLocation
                    }</Descriptions.Item>
                    <Modal>
                        <GoogleMap lat={parseFloat(geoLocation.split(", ")[0])} lon={parseFloat(geoLocation.split(", ")[1])} />
                    </Modal>
                </> : ''
            }
        </Descriptions>
        {e?.documents?.length > 0 ?
            <Table size='small' columns={product_doc_columns} dataSource={e?.documents}></Table> : ""
        }
    </div>)
}