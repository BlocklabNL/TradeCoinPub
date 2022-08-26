import React from "react";
import { useState, useEffect } from "react";

import {
  Tag, Table, Empty, Steps, Descriptions, PageHeader, Button, Typography, Row, Col, Card, Timeline, Tabs, Collapse, Divider
} from 'antd';
import { DoubleRightOutlined, PayCircleOutlined, SwapOutlined, FullscreenExitOutlined, LogoutOutlined, BgColorsOutlined, UserAddOutlined, InfoOutlined, GiftOutlined, ShoppingOutlined, MergeCellsOutlined, SplitCellsOutlined, RollbackOutlined } from "@ant-design/icons";

import { useGetResourceQuery, useGetEventsQuery } from '../../store/product/productapi'

import { useSelector } from 'react-redux'

import OfferProduct from './OfferProduct'
import BuyProduct from './BuyProduct'
import ExitProduct from './ExitProduct'
import TransformProduct from "./TransformProduct";
import ApproveProduct from "./ApproveProduct";
import ChangeStateAndHandler from "./ChangeStateAndHandler";
import AddProductInformation from "./AddProductInformation";
import BatchProduct from "./BatchProduct";
import CreateComposition from "../Composition/CreateComposition";
import AddInfoBulk from "./AddInfoBulk";
import SplitProduct from "./SplitProduct";
import Decompose from "../Composition/Decompose";
import ServicePayment from "./ServicePayment";
import UnitConversion from "./UnitConversion";

import Moment from 'react-moment';
import { DisplayHash } from '../Utils/DisplayHash';
import { DisplayUserByBAddress } from "../Utils/DisplayUserByBAddress";
import RequestFinance from "./RequestFinance";
import { DisplayEvents } from "./Common/DisplayEvents";

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

function Product() {

  const [isBatchProduct, setIsBatchProduct] = useState(false);
  const [isComposeProduct, setIsComposeProduct] = useState(false);
  const [isAddInfo, setIsAddInfo] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingRecords, setEditingRecords] = useState([]);

  const [isRequestFinance, setIsRequestFinance] = useState(false);

  const products = useSelector((state) => state.product.products);


  const [activeTabKey1, setActiveTabKey1] = useState('');
  const onTab1Change = (key) => {
    setActiveTabKey1(key);
  };

  var tabList = [];
  var tokenNames = [];

  if (products) {
    products.forEach(product => {
      let tabName = product.tokenname + " " + product.tokenid + " (" + product.commodity + ")";
      tabList.push({ key: product.ID, tab: tabName });
      tokenNames.push(product.tokenname);
    });
  }

  let disabled = true;
  if (products?.length > 1) {
    const onlyPNFT = tokenNames.every(tokenName => {
      return tokenName === "PNFT"
    });
    const onlyCPNFT = tokenNames.every(tokenName => {
      return tokenName === "CPNFT"
    });
    if (onlyPNFT || onlyCPNFT) {
      disabled = false;
    }
  }

  let disableCPNFT = false;

  if (products?.length > 1) {
    products.forEach(product => {
      if (product.tokenname != "PNFT") {
        disableCPNFT = true;
      }
    });
  } else {
    disableCPNFT = true;
  }

  const setEditingData = (inEditRecords, inIsEdit) => {
    setEditingRecords(inEditRecords);
    setIsEditing(inIsEdit);
  };

  useEffect(() => {
    console.log("in useeffect", products)
    if (products) {
      console.log("inside useeffect", products[0]?.ID)
      setActiveTabKey1(products[0]?.ID);
    }
  }, [products]);

  return (
    <div>

      <PageHeader
        className="site-page-header"
        title="Product(s)"
        extra={products?.length > 1 ?
          <div>
            <Row gutter={[10, 16]}>
              <Col >
                <Button type="primary" disabled={disableCPNFT} icon={<MergeCellsOutlined />}
                  onClick={() => {
                    setIsEditing(true);
                    setEditingRecords([...products]);
                    setIsBatchProduct(true);
                  }}>Batch</Button>
                {/* <Typography.Title level={5}>Batch</Typography.Title> */}
              </Col>
              <Col >
                <Button type="primary" disabled={products?.length > 1 ? false : true} icon={<FullscreenExitOutlined />}
                  onClick={() => {
                    setIsEditing(true);
                    setEditingRecords([...products]);
                    setIsComposeProduct(true);
                  }}>Compose</Button>
              </Col>
              <Col >
                <Button type="primary" disabled={disabled} icon={<InfoOutlined />} onClick={() => {
                  setIsEditing(true);
                  setEditingRecords([...products]);
                  setIsAddInfo(true);
                }}>Add Info</Button>
              </Col>
              <Col >
                <Button type="primary" disabled={products?.length > 1 ? false : true} icon={<PayCircleOutlined />}
                  onClick={() => {
                    setIsEditing(true);
                    setEditingRecords([...products]);
                    setIsRequestFinance(true);
                  }}>Request Finance</Button>
              </Col>
            </Row>
          </div> : ""
        }
      >
      </PageHeader>

      <Divider></Divider>

      {products?.length > 0 ?
        <Tabs onChange={onTab1Change} defaultActiveKey={products[0]?.ID} type="card" size="small">
          {tabList.map(pane => (
            <Tabs.TabPane tab={pane.tab} key={pane.key} >
              <ProductInfo productid={activeTabKey1} />
              <ProductJourney productid={activeTabKey1} />
            </Tabs.TabPane>
          ))}
        </Tabs> : <Empty description="Select one or more products to proceed further." />
      }

      {/* {products?.length > 0 ?
        <Card
          style={{
            width: '100%',
          }}
          tabList={tabList}
          activeTabKey={activeTabKey1}
          onTabChange={(key) => {
            console.log("inside key---------------", key);
            onTab1Change(key);
          }}
        >
          <ProductInfo productid={activeTabKey1} />
          <ProductJourney productid={activeTabKey1} />
        </Card>
        : <Empty description="Select one or more products to proceed further." />
      } */}


      <>{isBatchProduct ? <BatchProduct
        visible={isEditing}
        onCancel={() => {
          setEditingData(null, false);
          setIsBatchProduct(false);
        }}
        setEditingData={setEditingData}
        editingRecords={editingRecords}
      /> : null}</>
      <>{isComposeProduct ? <CreateComposition
        visible={isEditing}
        onCancel={() => {
          setEditingData(null, false);
          setIsComposeProduct(false);
        }}
        setEditingData={setEditingData}
        editingRecords={editingRecords}
      /> : null}</>
      <>{isAddInfo ? <AddInfoBulk
        visible={isEditing}
        onCancel={() => {
          setEditingData(null, false);
          setIsAddInfo(false);
        }}
        setEditingData={setEditingData}
        editingRecords={editingRecords}
      /> : null}</>
      <>{isRequestFinance ? <RequestFinance
        visible={isEditing}
        onCancel={() => {
          setEditingData(null, false);
          setIsRequestFinance(false);
        }}
        setEditingData={setEditingData}
        editingRecords={editingRecords}
      /> : null}</>

    </div>
  );
}

export default Product;

const ProductInfo = ({ productid }) => {

  const [isEditing, setIsEditing] = useState(false);
  const [isProductOffer, setIsProductOffer] = useState(false);
  const [isBuyProduct, setIsBuyProduct] = useState(false);
  const [isSplitProduct, setIsSplitProduct] = useState(false);
  const [isApproveProduct, setIsApproveProduct] = useState(false);
  const [isProductExit, setIsProductExit] = useState(false);
  const [isProductTransformation, setIsProductTransformation] = useState(false);
  const [isChangingHandlerAndState, setIsChangingHandlerAndState] = useState(false);
  const [isAddProductInformation, setIsAddProductInformation] = useState(false);
  const [isDecompose, setIsDecompose] = useState(false);
  const [isServicePayment, setIsServicePayment] = useState(false);
  const [isUnitConversion, setIsUnitConversion] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  const { data } = useGetResourceQuery(productid);

  const setEditingData = (inEditRecord, inIsEdit) => {
    setEditingRecord(inEditRecord);
    setIsEditing(inIsEdit);
  };

  let disablePNFT = false;
  if (data?.tokenname !== "CPNFT") {
    disablePNFT = true;
  } else {
    disablePNFT = false;
  };

  let disableCPNFT = false;
  if (data?.tokenname !== "PNFT") {
    disableCPNFT = true;
  } else {
    disableCPNFT = false;
  };

  return (<div>

    {data?.status == "active" ? <div style={{
      textAlign: 'center',
    }}>
      <Row gutter={[10, 16]}>
        <Col>
          <div ><Button type="primary" icon={<GiftOutlined />} onClick={() => {
            setIsEditing(true);
            setEditingRecord({ ...data });
            setIsProductOffer(true);
          }}>Offer</Button>
          </div>
        </Col>
        <Col>
          <Button type="primary" icon={<ShoppingOutlined />} onClick={() => {
            setIsEditing(true);
            setEditingRecord({ ...data });
            setIsApproveProduct(true);
          }}>Approve & Buy</Button>
        </Col>
        <Col>
          <Button type="primary" icon={<ShoppingOutlined />} onClick={() => {
            setIsEditing(true);
            setEditingRecord({ ...data });
            setIsBuyProduct(true);
          }}>Buy</Button>
        </Col>
        <Col>
          <Button type="primary" icon={<ShoppingOutlined />} onClick={() => {
            setIsEditing(true);
            setEditingRecord({ ...data });
            setIsServicePayment(true);
          }}>Service Payment</Button>
        </Col>
        {!disableCPNFT &&
          <Col >
            <Button type="primary" icon={<SplitCellsOutlined />} onClick={() => {

              setIsEditing(true);
              setEditingRecord({ ...data });
              setIsSplitProduct(true);

            }}>Split</Button>
          </Col>}
        {!disableCPNFT &&
          <Col>
            <Button type="primary" icon={<SwapOutlined />} onClick={() => {

              setIsEditing(true);
              setEditingRecord({ ...data });
              setIsUnitConversion(true);

            }}>Unit Conversion</Button>
          </Col>
        }
        <Col>
          <Button type="primary" icon={<InfoOutlined />} onClick={() => {
            setIsEditing(true);
            setEditingRecord({ ...data });
            setIsAddProductInformation(true);
          }}>Add Info</Button>
        </Col>
        <Col>
          <Button type="primary" icon={<UserAddOutlined />} onClick={() => {
            setIsEditing(true);
            setEditingRecord({ ...data });
            setIsChangingHandlerAndState(true);
          }}>Change Handler/State</Button>
        </Col>
        <Col>
          <Button type="primary" icon={<BgColorsOutlined />} onClick={() => {
            setIsEditing(true);
            setEditingRecord({ ...data });
            setIsProductTransformation(true);
          }}>Transform</Button>
        </Col>
        {!disablePNFT &&
          <Col>
            <Button type="primary" disabled={disablePNFT} icon={<RollbackOutlined />} onClick={() => {
              setIsEditing(true);
              setEditingRecord({ ...data });
              setIsDecompose(true);
            }}>Decompose</Button>
          </Col>}
        <Col>
          <Button type="primary" icon={<LogoutOutlined />} onClick={() => {
            setIsEditing(true);
            setEditingRecord({ ...data });
            setIsProductExit(true);
          }}>Exit</Button>
        </Col>
      </Row>
    </div> : ""}


    <Divider orientation="left">Product Info</Divider>

    <Descriptions size="small" bordered>
      <Descriptions.Item label={(<Typography.Text strong>Amount</Typography.Text>)} span={1}>{data?.amount} {data?.unit}</Descriptions.Item>
      <Descriptions.Item label={(<Typography.Text strong>Owner</Typography.Text>)} span={1}><DisplayUserByBAddress baddress={data?.owner}></DisplayUserByBAddress></Descriptions.Item>
      <Descriptions.Item label={(<Typography.Text strong>Handler</Typography.Text>)} span={1} ><DisplayUserByBAddress baddress={data?.handler}></DisplayUserByBAddress></Descriptions.Item>
      <Descriptions.Item label={(<Typography.Text strong>State</Typography.Text>)} span={1}>{stateList[data?.state]}</Descriptions.Item>
      <Descriptions.Item label={(<Typography.Text strong>Root Hash</Typography.Text>)} span={1}><DisplayHash hash={data?.roothash}></DisplayHash></Descriptions.Item>
      <Descriptions.Item label={(<Typography.Text strong>Created</Typography.Text>)} span={1}> <Moment format="DD MMM, YYYY @ hh:mm:ss">{data?.CreatedAt}</Moment></Descriptions.Item>
      <Descriptions.Item label={(<Typography.Text strong>Updated</Typography.Text>)} span={1}><Moment format="DD MMM, YYYY @ hh:mm:ss">{data?.UpdatedAt}</Moment></Descriptions.Item>
      <Descriptions.Item label={(<Typography.Text strong>Transformation</Typography.Text>)} span={1}>
        {data?.trans?.length > 0 ?
          <div>
            {data?.trans?.map((e, index) =>
              <><Tag color="#108ee9">{e}</Tag><DoubleRightOutlined /> </>
            )}
          </div> : ''
        }
      </Descriptions.Item>
    </Descriptions>

    <Divider orientation="left">Product Journey</Divider>

    <>{isProductOffer ? <OfferProduct
      visible={isEditing}
      onCancel={() => {
        setEditingData(null, false);
        setIsProductOffer(false);
      }}
      setEditingData={setEditingData}
      editingRecord={editingRecord}
    /> : null}</>
    <>{isBuyProduct ? <BuyProduct
      visible={isEditing}
      onCancel={() => {
        setEditingData(null, false);
        setIsBuyProduct(false);
      }}
      setEditingData={setEditingData}
      editingRecord={editingRecord}
    /> : null}</>
    <>{isApproveProduct ? <ApproveProduct
      visible={isEditing}
      onCancel={() => {
        setEditingData(null, false);
        setIsApproveProduct(false);
      }}
      setEditingData={setEditingData}
      editingRecord={editingRecord}
    /> : null}</>
    <>{isServicePayment ? <ServicePayment
      visible={isEditing}
      onCancel={() => {
        setEditingData(null, false);
        setIsServicePayment(false);
      }}
      setEditingData={setEditingData}
      editingRecord={editingRecord}
    /> : null}</>
    <>{isAddProductInformation ? <AddProductInformation
      visible={isEditing}
      onCancel={() => {
        setEditingData(null, false);
        setIsAddProductInformation(false);
      }}
      setEditingData={setEditingData}
      editingRecord={editingRecord}
    /> : null}</>
    <>{isChangingHandlerAndState ? <ChangeStateAndHandler
      visible={isEditing}
      onCancel={() => {
        setEditingData(null, false);
        setIsChangingHandlerAndState(false);
      }}
      setEditingData={setEditingData}
      editingRecord={editingRecord}
    /> : null}</>
    <>{isProductTransformation ? <TransformProduct
      visible={isEditing}
      onCancel={() => {
        setEditingData(null, false);
        setIsProductTransformation(false);
      }}
      setEditingData={setEditingData}
      editingRecord={editingRecord}
    /> : null}</>
    <>{isProductExit ? <ExitProduct
      visible={isEditing}
      onCancel={() => {
        setEditingData(null, false);
        setIsProductExit(false);
      }}
      setEditingData={setEditingData}
      editingRecord={editingRecord}
    /> : null}</>
    <>{isSplitProduct ? <SplitProduct
      visible={isEditing}
      onCancel={() => {
        setEditingData(null, false);
        setIsSplitProduct(false);
      }}
      setEditingData={setEditingData}
      editingRecord={editingRecord}
    /> : null}</>
    <>{isUnitConversion ? <UnitConversion
      visible={isEditing}
      onCancel={() => {
        setEditingData(null, false);
        setIsUnitConversion(false);
      }}
      setEditingData={setEditingData}
      editingRecord={editingRecord}
    /> : null}</>
    <>{isDecompose ? <Decompose
      visible={isEditing}
      onCancel={() => {
        setEditingData(null, false);
        setIsDecompose(false);
      }}
      setEditingData={setEditingData}
      editingRecord={editingRecord}
    /> : null}</>

  </div>);
}

const ProductJourney = ({ productid }) => {
  const { TabPane } = Tabs;
  const { Panel } = Collapse;

  const [direction, setDirection] = useState("right");



  console.log(productid);
  const { data, isLoading } = useGetEventsQuery(productid);

  var tokenTimeLineList = [];
  data?.forEach(element => {
    if (element.eventname === "Product Batch") {
      tokenTimeLineList = (element.dynamicfields[0].fieldvalue.split(','))
    }
    if (element.eventname === "Create Composition") {
      console.log("element.dynamicfields[0]", element.dynamicfields[0])
      tokenTimeLineList = (element.dynamicfields[0].fieldvalue.split(','))
    }
  })

  console.log("tokenTimeLineList", tokenTimeLineList)

  var splitTokens = [];
  data?.forEach(element => {
    if (element.eventname === "Product Split") {
      splitTokens = (element.dynamicfields[0].fieldvalue.split(','))
    }
  })

  useEffect(() => {
    if (!isLoading && data) {
      data?.forEach(element => {
        if (element.eventname === "Product Batch") {
          setDirection("left");
        }
        if (element.eventname === "Create Composition") {
          setDirection("left");
        }
      })

      data?.forEach(element => {
        if (element.eventname === "Product Split") {
          setDirection("right");
        }
      })

    }

  }, [data]);

  const { data: product, isLoading: isProductLoading } = useGetResourceQuery(productid);

  if (!isProductLoading) {
    console.log(product)
  }

  const product_doc_columns = [
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
  ]

  const loadmore = (dir) => {
    console.log("loadmore direction", dir);
    setDirection(dir);
  }

  var loadcount = 4;
  var childloadcount = 2;

  return (
    <div align="left">

      <br></br>

      <Row align="middle" gutter={[16, 0]}>
        {direction == "left" && <Col>
          <Row gutter={[0, 0]}>
            <Col flex="auto">
              <DisplayEvents loadcount={childloadcount} productid={tokenTimeLineList?.[0]} node="child" loadmore={loadmore}></DisplayEvents>
            </Col>
          </Row>
          <Row><br></br><br></br><br></br></Row>
          <Row gutter={[0, 0]}>
            <Col flex="auto">
              <DisplayEvents loadcount={childloadcount} productid={tokenTimeLineList?.[1]} node="child" loadmore={loadmore}></DisplayEvents>
            </Col>
          </Row>
        </Col>
        }
        <Col flex="auto">
          <DisplayEvents loadcount={loadcount} productid={productid} node="main" loadmore={loadmore}></DisplayEvents>
        </Col>
        {direction == "right" && <Col>
          <Row gutter={[0, 0]}>
            <Col flex="auto">
              <DisplayEvents initdirection="first" loadcount={childloadcount} productid={splitTokens?.[1]} node="child" loadmore={loadmore}></DisplayEvents>
            </Col>
          </Row>
          <Row><br></br><br></br><br></br></Row>
          <Row gutter={[0, 0]}>
            <Col flex="auto">
              <DisplayEvents initdirection="first" loadcount={childloadcount} productid={splitTokens?.[2]} node="child" loadmore={loadmore}></DisplayEvents>
            </Col>
          </Row>
        </Col>
        }
      </Row>

      <Divider orientation="left">Documents</Divider>

      <Table columns={product_doc_columns} dataSource={product?.documents}></Table>
    </div >);
}
