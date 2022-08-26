import "./App.css";
import React from "react";
import { useState } from "react";
import { BrowserRouter, Switch, Route, Link, useHistory, useLocation } from 'react-router-dom';

import { setAuth } from './store/auth/authSlice'

import Product from "./Components/Product/Product";
import Registration from "./Components/Auth/Registration";
import Role from "./Components/Auth/Role";
import Priv from "./Components/Auth/Priv";
import Organization from "./Components/Auth/Organization";
import Transformation from "./Components/Reference/Transformation";
import Units from "./Components/Reference/Units";
import DocTypes from "./Components/Reference/DocTypes";
import Commodity from "./Components/Reference/Commodity";
import User from "./Components/Auth/User";
import Login from "./Components/Auth/Login";
import Document from "./Components/Document/Document";
import Event from "./Components/TrackAndTrace/Event";
import MyProductsSider from "./Components/Sider/MyProductsSider";
import { PrivateRoute } from "./Components/PrivateRoute/PrivateRoute";

import { useSelector, useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { SafetyCertificateOutlined, UnlockOutlined, LineChartOutlined, WalletOutlined, UserOutlined, SearchOutlined, LoginOutlined, IdcardOutlined, SettingOutlined, HddFilled, DashboardFilled, DatabaseFilled, BankFilled, PoweroffOutlined, UserAddOutlined } from "@ant-design/icons";
import AddAdmin from "./Components/Owner/AddAdmin";
import CompAddAdmin from "./Components/Owner/CompAddAdmin";
import Deal from "./Components/Risk/Deal";
import RiskModel from "./Components/Risk/RiskModel";
import EditDeal from "./Components/Risk/EditDeal";
const { Header, Content, Footer, Sider } = Layout;


function App() {

  let location = useLocation();

  const [current, setCurrent] = React.useState('');
  const [collapsed, setCollapsed] = useState(location.pathname == "/product" ? false : true);


  let token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  if (token == '') {
    const jwtFromStorage = localStorage.getItem("jwt");
    if (jwtFromStorage) {
      token = jwtFromStorage;
      token = token.replace('Bearer ', '');
      const decoded = jwt_decode(token);
      const authObj = {
        token: token,
        userid: decoded.userId,
        userbaddress: decoded.baddress,
        roles: decoded.roles,
      }
      dispatch(setAuth(authObj));
    }
  }

  const allMenuItems = [
    {
      label: 'Products',
      icon: <WalletOutlined />,
      key: 'products',
      label: (<Link to="/product" onClick={() => setCollapsed(false)}>My Products</Link>),
      privid: 'l1_menu_product'
    },
    {
      label: (<Link to="/tandt" onClick={() => setCollapsed(true)}>Track and Trace</Link>),
      icon: <SearchOutlined />,
      key: 'tandt',
      privid: 'l1_menu_document'
    },
    {
      label: 'Administration',
      icon: <UnlockOutlined />,
      key: 'admin',
      children: [
        {
          label: (<Link to="/org" onClick={() => setCollapsed(true)}>Organization</Link>),
          key: 'org',
          privid: 'l2_menu_org'
        },
        {
          label: (<Link to="/user" onClick={() => setCollapsed(true)}>User</Link>),
          key: 'user',
          privid: 'l2_menu_user'
        },
        {
          label: (<Link to="/role" onClick={() => setCollapsed(true)}>Role</Link>),
          key: 'role',
          privid: 'l2_menu_role'
        },
        {
          label: (<Link to="/priv" onClick={() => setCollapsed(true)}>Privilege</Link>),
          key: 'priv',
          privid: 'l2_menu_priv'
        },
        {
          label: (<Link to="/product" onClick={() => setCollapsed(true)}>Onchain-Authorization</Link>),
          key: 'onchain',
          privid: 'l2_menu_onchain'
        }
      ],
      privid: 'l1_menu_admin'
    },
    {
      label: 'Configuration',
      icon: <SettingOutlined />,
      key: 'config',
      children: [
        {
          label: (<Link to="/unit" onClick={() => setCollapsed(true)}>Units</Link>),
          key: 'unit',
          privid: 'l2_menu_units'
        },
        {
          label: (<Link to="/tra" onClick={() => setCollapsed(true)}>Transformations</Link>),
          key: 'tra',
          privid: 'l2_menu_transformation'
        },
        {
          label: (<Link to="/commodity" onClick={() => setCollapsed(true)}>Commodities</Link>),
          key: 'commodity',
          privid: 'l2_menu_commodities'
        },
        {
          label: (<Link to="/doctypes" onClick={() => setCollapsed(true)}>Document Types</Link>),
          key: 'doctypes',
          privid: 'l2_menu_doctypes'
        }
      ],
      privid: 'l1_menu_config'
    },
    {
      label: (<Link to="/document" onClick={() => setCollapsed(true)}>Document Vault</Link>),
      icon: <SafetyCertificateOutlined />,
      key: 'document',
      privid: 'l1_menu_document'
    },
    {
      label: 'Risk Analysis',
      icon: <LineChartOutlined />,
      key: 'riskanalysis',
      children: [
        {
          label: (<Link to="/deal/list" onClick={() => setCollapsed(true)}>Deals</Link>),
          key: 'deal',
          privid: 'l2_menu_deal'
        },
        {
          label: (<Link to="/riskmodel" onClick={() => setCollapsed(true)}>Risk Model</Link>),
          key: 'riskmodel',
          privid: 'l2_menu_riskmodel'
        },
      ],
      privid: 'l1_menu_riskanalysis'
    },
    {
      label: (<Link to="/login" onClick={() => setCollapsed(true)}>Login</Link>),
      icon: <LoginOutlined />,
      key: 'login',
      privid: 'na',
      children: [],
      style: ({ marginLeft: 'auto' }),
    },
    {
      label: 'Logout',
      icon: <PoweroffOutlined />,
      key: 'logout',
      privid: 'l1_default',
      style: ({ marginLeft: 'auto' }),
    },
    {
      label: (<Link to="/register" onClick={() => setCollapsed(true)}>Register</Link>),
      icon: <UserAddOutlined />,
      key: 'register',
      privid: 'na',
      children: [],
    },

  ]

  //get the roles
  let userroles = [];
  userroles = useSelector((state) => state.auth.roles);

  let menuPrivIds = [];
  console.log("userroles", userroles);
  if (userroles && userroles.length > 0) {
    userroles.forEach((role) => {
      if (role && role.type == "Offchain") {
        role?.privs.forEach((priv) => {
          if (priv && priv.type == "Menu") {
            menuPrivIds.push(priv.name);
          }
        })
      }
    })
  }
  console.log("menuPrivIds", menuPrivIds);

  menuPrivIds.push("l1_default");

  var menuItemsToLoad = [];

  token ? (allMenuItems.forEach((e1) => menuPrivIds.forEach(e2 => {
    if (e1.privid == e2) {
      if (e1.children) {
        var childs = [];
        e1.children.forEach((c1) => menuPrivIds.forEach(c2 => {
          if (c1.privid == c2) {
            childs.push(c1);
          }
        }))
        e1.children = childs;
      }
      menuItemsToLoad.push(e1);
    }
  }))) : (allMenuItems.forEach((e1) => {
    if (e1.privid == "na") {
      menuItemsToLoad.push(e1);
    }
  }))

  console.log("Menu items to load:", menuItemsToLoad);

  //remove duplciates
  let uniqueMenuItemsToLoad = [...new Set(menuItemsToLoad)];

  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
    if (e.key == 'logout') {

      setCollapsed(true)
      const authObj = {
        token: '',
        userid: '',
        userbaddress: '',
        roles: [],
      }
      dispatch(setAuth(authObj));
      localStorage.removeItem("jwt");
      //logout logic

    }
  };

  return (
    <div>
      <Layout>
        <Header
          style={{
            position: 'fixed',
            zIndex: 1,
            width: '100%',
          }}
        >
          <div className="logo" >TradeCoin</div>
          <Menu onClick={onClick} selectedKeys={[current]}
            theme="dark"
            mode="horizontal" items={uniqueMenuItemsToLoad} />
        </Header>

        <Layout>
          <Sider /*id="product-sider"*/ collapsedWidth="30"
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            theme='light'
            width={380}
            style={{
              padding: '10px 0px',
              marginTop: 74,
            }} >
            <PrivateRoute path="/product">
              {
                collapsed ? "" : <MyProductsSider />
              }
            </PrivateRoute>
          </Sider>
          <Content
            className="site-layout"
            style={{
              padding: '0 10px',
              marginTop: 58,
            }}
          >
            <Breadcrumb
              style={{
                margin: '8px 0',
              }}
            >
              {/* <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>Account</Breadcrumb.Item>
              <Breadcrumb.Item>Register</Breadcrumb.Item> */}
            </Breadcrumb>
            <div
              className="site-layout-background"
              style={{
                padding: 24,
                minHeight: 500,
              }}
            >
              <Switch>
                {/* TODO: DO this in a more elegant way */}
                <Route path="/addadmin">
                  <AddAdmin />
                </Route>
                <Route path="/compaddadmin">
                  <CompAddAdmin />
                </Route>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/register">
                  <Registration />
                </Route>
                <PrivateRoute path="/user">
                  <User />
                </PrivateRoute>
                <PrivateRoute path="/role">
                  <Role />
                </PrivateRoute>
                <PrivateRoute path="/priv">
                  <Priv />
                </PrivateRoute>
                <PrivateRoute path="/org">
                  <Organization />
                </PrivateRoute>
                <PrivateRoute path="/tra">
                  <Transformation />
                </PrivateRoute>
                <PrivateRoute path="/unit">
                  <Units />
                </PrivateRoute>
                <PrivateRoute path="/commodity">
                  <Commodity />
                </PrivateRoute>
                <PrivateRoute path="/doctypes">
                  <DocTypes />
                </PrivateRoute>
                <PrivateRoute path="/document">
                  <Document />
                </PrivateRoute>
                <PrivateRoute path="/tandt">
                  <Event />
                </PrivateRoute>
                <PrivateRoute path="/product">
                  <Product />
                </PrivateRoute>
                <PrivateRoute path="/deal/list">
                  <Deal />
                </PrivateRoute>
                <PrivateRoute path="/deal/:id">
                  <EditDeal />
                </PrivateRoute>
                <PrivateRoute path="/riskmodel">
                  <RiskModel />
                </PrivateRoute>
                <Route path="*">
                  <h1>404 Page not found</h1>
                </Route>
              </Switch>
            </div>
          </Content>
        </Layout>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          TradeCoin ©2022 by BlockLab
        </Footer>
        
      </Layout>

    </div>
  );
}

export default App;

