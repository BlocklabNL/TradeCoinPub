import React from "react";
import { ethers } from "ethers";
import {
    Form, Modal, Select, Tooltip
} from 'antd';
import { QuestionCircleOutlined } from "@ant-design/icons";
import DocumentModal from "../Utils/DocumentModal";
import { useGetCommodityQuery, useGetUnitQuery, useGetUnitsQuery } from "../../store/product/referenceapi";
const { Option } = Select;

const config = require("../../config");

const {
    YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS,
    YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS_ABI,
} = config.default;

async function unitConversion(tokenId, newAmount, previousUnit, newUnit) {
    console.log("unitConversion-------", tokenId, newAmount, previousUnit, newUnit);

    if (typeof window.ethereum !== "undefined") {
        await requestAccount();
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS, YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS_ABI, signer);
            const transaction = await contract.unitConversion(
                tokenId,
                (newAmount * 1e3),
                ethers.utils.formatBytes32String(previousUnit),
                ethers.utils.formatBytes32String(newUnit)
            );
            await transaction.wait();
        } catch (err) {
            console.log("Error: ", err);
            window.alert(err);
        }
    }
}

async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
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
            span: 40,
        },
        sm: {
            span: 15,
        },
    },
};

function UnitConversion({ visible, onCancel, editingRecord, setEditingData }) {
    const { data, isLoading } = useGetCommodityQuery(editingRecord?.commodity);
    const { data: unitData, isLoading: isLoadingUnitData } = useGetUnitsQuery();

    let specificWeight = 0;
    if (!isLoading){
        data?.transformations.forEach((transformation) => {
            // checks the latest transformation for specific weight
            if(transformation.code === editingRecord?.trans.at([-1])){
                specificWeight = transformation.spwt;
            }
        })
    }

    const unitList = [];
    const test = [];
    var unitId = 0;
    if (!isLoadingUnitData) {
        unitData?.forEach(element => {
            test.push({unit: element.unit, type: element.type, factor: element.factor});
            unitList.push(<Option key={element.unit}>{element.unit}</Option>)
            if(element.unit === editingRecord?.unit){
                unitId = element.ID
            }
        });
    }

    const { data: currentUnitData, isLoading: isLoadingCurrentUnitData } = useGetUnitQuery(unitId);

    let currentUnitType = null;

    if (!isLoadingCurrentUnitData) {
        currentUnitType = currentUnitData?.type;
    }

    const oldUnit = editingRecord?.unit;

    async function onCreate(values) {
        const tokenId = editingRecord.tokenid;
        const amount = editingRecord.amount;
        const previousUnit = editingRecord.unit;
        const newUnit = values.unit;
        var newUnitType = null;
        test.forEach(element => {
            if(element.unit === newUnit){
                newUnitType = element.type;
            }
        })

        if (!tokenId && !amount && !previousUnit && !newUnit) return;
        // calculate new Amount

        console.log(currentUnitType, newUnitType)
        if (currentUnitType !== newUnitType) {
            // Cross Unit Conversion
            if(currentUnitType === "Volume Unit"){
                console.log("Volume unit to weight Unit");

                console.log("newUnit,oldUnit",newUnit,oldUnit);


                const newUnitData = test.find(element => element.unit === newUnit);
                const oldUnitData = test.find(element => element.unit === oldUnit);

                // Calculate new Amount
                var m3value = 1 / oldUnitData.factor
                var kgvalue = amount * specificWeight * m3value

                const output = kgvalue * newUnitData.factor;
                const numberAmount = Number(output);
                const rounded = Math.floor(numberAmount * 1e3) / 1e3; // Limit amount to 8 decimals

                console.log("m3value,kgvalue,output,rounded",m3value,kgvalue,output,rounded);

                await unitConversion(tokenId, rounded, previousUnit, newUnit);
                //Update Product and Get Docs detail from Product
                setEditingData(null, false);
            } else {
                console.log("Weight Unit to Volume unit");
                const newUnitData = test.find(element => element.unit === newUnit);
                const oldUnitData = test.find(element => element.unit === oldUnit);
                // Calculate new Amount
                var kgvalue = 1 / oldUnitData.factor
                var m3value = amount * kgvalue / specificWeight

                const output = m3value * newUnitData.factor;
                const numberAmount = Number(output);
                const rounded = Math.floor(numberAmount * 1e3) / 1e3; // Limit amount to 8 decimals

                await unitConversion(tokenId, rounded, previousUnit, newUnit);
                setEditingData(null, false);
            }  
        } else {
            console.log("In unit Conversion")
            // In Unit Conversion
            // Calculate the new Amount
            if(newUnit === oldUnit){
                window.alert("Can not convert to the same unit");
                return
            }
            const newUnitData = test.find(element => element.unit === newUnit);
            const oldUnitData = test.find(element => element.unit === oldUnit);
            
            const oldFactor = oldUnitData.factor;
            const newFactor = newUnitData.factor;

            const newAmount = (amount / oldFactor) * newFactor
            const numberAmount = Number(newAmount);
            const rounded = Math.floor(numberAmount * 1e3) / 1e3; // Limit amount to 8 decimals

            await unitConversion(tokenId, rounded, previousUnit, newUnit);
                //Update Product and Get Docs detail from Product
                try {
                    console.log("-------edit", editingRecord)

                    editingRecord.unit = values.unit;
                    editingRecord.amount = rounded.toString();

                    // await updateProduct(editingRecord).unwrap().then(res => {
                    //     console.log("----res", res);
                    //     setEditingData(res, false);
                    // }).catch(err => {
                    //     console.log("-----err", err)
                    // })
                } catch {
                }
                setEditingData(null, false);
        }
    };

    const [form] = Form.useForm();
    return (
        <Modal
            width={500}
            title={<>Unit Conversion ({editingRecord?.commodity}, {editingRecord?.tokenid})</>}
            visible={visible}
            okText="Submit"
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
                    name="unit"
                    label={
                        <span>
                            New Unit Type <Tooltip placement="top" title="The NEW unit type you want the product TO BE in">
                                <QuestionCircleOutlined />
                            </Tooltip>
                        </span>
                    }
                    rules={[
                        {
                            required: true,
                            message: 'Please select a valid Unit',
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
                        {unitList}
                    </Select>

                </Form.Item>
                <DocumentModal editingRecord={editingRecord} form={form}/>
            </Form>
        </Modal>
    );
}

export default UnitConversion;
