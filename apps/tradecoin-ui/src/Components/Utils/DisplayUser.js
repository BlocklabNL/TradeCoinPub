import React from "react";
import { Avatar, Col, Row, Typography } from 'antd';
import { UserOutlined } from "@ant-design/icons";

import {
    useGetUserQuery
} from '../../store/auth/userapi'

export const DisplayUser = ({ userid }) => {

    const { data, isLoading, isFetching, isError } = useGetUserQuery(userid);
    if (!isLoading) {
        console.log("DisplayUser----data", data);
    }

    return (
        <div>
            <Row align="middle" gutter={[8, 0]}>
                <Col><Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} /></Col>
                <Col>
                    <Row>
                        <Col><Typography.Text>{data?.fname} {data?.lname}</Typography.Text></Col>
                    </Row>
                    <Row>
                        <Col><Typography.Text type="secondary">{data?.email}</Typography.Text></Col>
                    </Row>
                </Col>
            </Row>
        </div>);
}