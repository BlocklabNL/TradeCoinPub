import React from 'react'
import { useAddUserMutation } from '../../store/auth/authapi'

import {
    Form,
    Input, Row, Col, Divider,
    Button,
    message, PageHeader
} from 'antd';

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

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

function Registration() {

    const [addUser, { issLoading }] = useAddUserMutation()

    const key = 'updatable';

    const [form] = Form.useForm();
    const onFinish = (values) => {

        message.loading({
            content: 'Logging in.....',
            key,
        });

        handleAddUser(values);
    };

    const handleAddUser = async (user) => {
        try {
            await addUser(user).unwrap().then(res => {
                message.success({
                    content: 'User Registered successfully!',
                    key,
                    duration: 2,
                });
                console.log(res)
            }).catch(err => {
                message.error({
                    content: 'User Registration Failed!',
                    key,
                    duration: 2,
                });
                console.log(err)
            })
        } catch {
        }
    }

    return (
        <div>

            <Row>
                <Col span={4} ></Col>
                <Col span={16} ><PageHeader
                    className="site-page-header"
                    title="Registration"
                ></PageHeader>
                    <Divider />
                    <PageHeader
                        className="site-page-header"
                    >
                        <Form
                            {...formItemLayout}
                            form={form}
                            name="register"
                            onFinish={onFinish}
                            initialValues={{
                                residence: ['zhejiang', 'hangzhou', 'xihu'],
                                prefix: '86',
                            }}
                            scrollToFirstError
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

                            <Form.Item
                                name="confirmPassword"
                                label="Confirm Password"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please confirm your password!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }

                                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                name="baddress"
                                label="Blockchain Address"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input Blockchain Address!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit">
                                    Register
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