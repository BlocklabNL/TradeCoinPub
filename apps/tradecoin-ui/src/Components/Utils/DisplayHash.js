import React from "react";
import { Button, Popover, Typography } from 'antd';
export const DisplayHash = ({ hash }) => {
    var buttonVal = "";
    if (hash){
        buttonVal = hash?.slice(0, 5) + "..." + hash?.slice(hash?.length - 4, hash?.length)
    }
    return (
        <div>
            <Popover content={hash} trigger="click" >
            <Typography.Link copyable>{buttonVal}</Typography.Link>
            </Popover>
        </div>);
}