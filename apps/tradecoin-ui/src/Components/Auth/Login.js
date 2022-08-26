import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { useLoginUserMutation } from '../../store/auth/authapi'
import { setAuth } from '../../store/auth/authSlice'

import { useHistory, useLocation } from "react-router-dom";

import jwt_decode from "jwt-decode";

import {
    Form,
    Input, Row, Col, Divider,
    Button,
    message, PageHeader
} from 'antd';

const formItemLayout = {
    labelCol: {
        xs: {
            span: 8,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 8,
        },
        sm: {
            span: 8,
        },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 16,
            offset: 8,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

function Registration() {
    const token = useSelector((state) => state.auth.token)


    const history = useHistory();
    let location = useLocation();

    const [loginUser, { issLoading }] = useLoginUserMutation()
    const dispatch = useDispatch();

    const key = 'updatable';

    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log('Received values of form: ', values);

        message.loading({
            content: 'Loading...',
            key,
        });

        handleAddUser(values);

    };

    const handleAddUser = async (user) => {
        try {
            await loginUser(user).unwrap().then(res => {

                console.log(res.jwt);

                //decode jwt
                var token = res.jwt;
                token = token.replace('Bearer ', '');
                const decoded = jwt_decode(token);

                console.log(decoded.userId);
                console.log(decoded.roles);

                const authObj = {
                    token: token,
                    userid: decoded.userId,
                    userbaddress: decoded.baddress,
                    roles: decoded.roles,
                }

                dispatch(setAuth(authObj));
                localStorage.setItem("jwt", res.jwt);

                message.success({
                    content: 'Logged In!',
                    key,
                    duration: 2,
                });

                history.push("/product");
            }).catch(err => {
                console.error(err)
                message.error({
                    content: 'Logged Failed!',
                    key,
                    duration: 2,
                });
            });

        } catch {
        }
    }

    return (
        <div>

            <Row>
                <Col span={4} ></Col>
                <Col span={16} ><PageHeader
                    className="site-page-header"
                    title="Login"
                ></PageHeader>
                    <Divider />
                    <PageHeader
                        className="site-page-header"
                    >
                        <Form
                            {...formItemLayout}
                            form={form}
                            name="login"
                            onFinish={onFinish}
                            scrollToFirstError>
                            <Form.Item
                                name="email"
                                label="E-mail"
                                rules={[
                                    {
                                        type: 'email',
                                        message: 'The input is not a valid E-mail!',
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
                                name="password"
                                label="Password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit">
                                    Login
                                </Button>
                            </Form.Item>
                        </Form>
                    </PageHeader>
                </Col>
                <Col span={4} ></Col>
            </Row>

        </div>
    )
}

export default Registration;