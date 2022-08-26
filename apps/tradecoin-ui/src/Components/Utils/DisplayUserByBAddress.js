import React from "react";
import { Avatar, Col, Row, Typography } from 'antd';
import { UserOutlined } from "@ant-design/icons";
import { DisplayHash } from '../Utils/DisplayHash';


import { useGetUsersQuery } from '../../store/auth/userapi'

export const DisplayUserByBAddress = ({ baddress }) => {

    console.log("DisplayUserByBAddress", baddress);

    const { data, isLoading, isFetching, isError } = useGetUsersQuery();
    if (!isLoading) {
        console.log("DisplayUser----data", data);
    }

    var matchingUser
    if (data) {
        data.userList.forEach(user => {
            if (user.baddress == baddress) {
                matchingUser = user
            }
        });
    }

    return (
        <div>
            {matchingUser ? <Row align="middle" gutter={[8, 0]}>
                <Col><Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} /></Col>
                <Col>
                    <Row>
                        <Col><Typography.Text>{matchingUser?.fname} {matchingUser?.lname}</Typography.Text></Col>
                    </Row>
                    <Row>
                        <Col><Typography.Text type="secondary">{matchingUser?.email}</Typography.Text></Col>
                    </Row>
                </Col>
            </Row> : <DisplayHash hash={baddress}></DisplayHash>}
        </div>);
}