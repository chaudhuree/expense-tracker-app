import React, { useState } from "react";
import { DatePicker, Table } from "antd";
import { Button, Form, Input } from "antd";
import { Col, Row } from "antd";
import { useContextData } from "../context/ExpenseTrackerContext";

const IncomeDataForm = () => {
  const { data, addData, removeData } = useContextData();
  const [form] = Form.useForm();
  const [date, setDate] = useState(
    new Date(Date.now()).toISOString().slice(0, 10)
  );
  const columns = [
    {
      title: "Purpose",
      dataIndex: "purpose",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      sorter: {
        compare: (a, b) => a.amount - b.amount,
        multiple: 2,
      },
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const handleDateChange = (date, dateString) => {
    if (dateString) {
      setDate(dateString);
    }
  };
  const onFinish = (values) => {
    const { purpose, amount } = values;
    if (purpose.trim() !== "" && amount.trim() !== "") {
      addData(date, "income", purpose, parseFloat(amount));
      form.resetFields();
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleRemove = (index) => {
    removeData(date, "income", index);
  };
  const existingDataForSelectedDate = data.find((item) => item.date === date);
  // console.log("existingDataForSelectedDate", existingDataForSelectedDate);
  const incomeData = existingDataForSelectedDate?.income
    .filter(
      (incomeEntry) =>
        incomeEntry.purpose.trim() !== "" && incomeEntry.amount !== 0
    )
    .map((incomeEntry, index) => ({
      key: index,
      purpose: incomeEntry.purpose,
      amount: Number(incomeEntry.amount),
      action: <Button onClick={() => handleRemove(index)}>Remove</Button>,
    }));
  console.log("incomeData", incomeData);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="row text-center heading justify-content-center items-center mb-3">
            <div className="col">
              <h1 className="white-text"> Income Entry</h1>
            </div>
          </div>
          <div className="row">
            <Row>
              <Col
                span={12}
                offset={6}
                className="justify-content-center text-center"
              >
                <DatePicker size="large" onChange={handleDateChange} />
              </Col>
            </Row>
          </div>
          <div className="row py-5">
            <div className="col">
              <Row>
                <Col span={18} offset={3}>
                  <Form
                    form={form}
                    name="incomeDetails"
                    labelCol={{
                      span: 4,
                    }}
                    wrapperCol={{
                      span: 16,
                    }}
                    initialValues={{ autoComplete: "off" }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                  >
                    <Form.Item
                      label="Purpose"
                      name="purpose"
                      rules={[
                        {
                          required: true,
                          message: "Please insert the source of money",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Amount"
                      name="amount"
                      rules={[
                        {
                          required: true,
                          message: "How much money did you get!",
                        },
                      ]}
                    >
                      <Input type="number" />
                    </Form.Item>

                    <Form.Item
                      wrapperCol={{
                        offset: 5,
                        span: 14,
                      }}
                    >
                      <Button
                        className="w-100"
                        type="primary"
                        htmlType="submit"
                      >
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
            </div>
          </div>
          <div className="row">
            {existingDataForSelectedDate && (
              <div className="col">
                <h3 className="text-total">
                  Total Income: tk &nbsp;
                  {existingDataForSelectedDate?.income.reduce(
                    (acc, curr) => acc + curr.amount,
                    0
                  )}
                </h3>
                <Table
                  columns={columns}
                  dataSource={incomeData}
                  onChange={onChange}
                  pagination={false}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeDataForm;
