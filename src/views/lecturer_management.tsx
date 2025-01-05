import React, { useState } from "react";
import { Tag, Button, Table, Drawer, Form, Input, Row, Col, Select, DatePicker, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const LecturerManagement: React.FC = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const showDrawer = () => {
        setIsDrawerOpen(true);
    };

    const closeDrawer = () => {
        setIsDrawerOpen(false);
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: string) => (
                <Tag color={status === "active" ? "green" : "red"}>{status}</Tag>
            ),
        },
        {
            title: "Actions",
            key: "actions",
            render: (_: unknown, record: { name: string }) => (
                <Button type="link" onClick={() => alert(`Editing ${record.name}`)}>
                    Edit
                </Button>
            ),
        },
    ];

    const data = [
        { name: "John Doe", email: "john@example.com", role: "Student", status: "active" },
        { name: "Jane Smith", email: "jane@example.com", role: "Lecturer", status: "inactive" },
    ];

    return (
        <div>
            <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
                Add User
            </Button>
            <Table className="mt-6" dataSource={data} columns={columns} rowKey="email" />
            <Drawer
                title="Create a new account"
                width={720}
                onClose={closeDrawer}
                open={isDrawerOpen}
                extra={
                    <Space>
                        <Button onClick={closeDrawer}>Cancel</Button>
                        <Button onClick={closeDrawer} type="primary">
                            Submit
                        </Button>
                    </Space>
                }
            >
                <Form layout="vertical" hideRequiredMark>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[{ required: true, message: "Please enter user name" }]}
                            >
                                <Input placeholder="Please enter user name" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="url"
                                label="Url"
                                rules={[{ required: true, message: "Please enter url" }]}
                            >
                                <Input
                                    style={{ width: "100%" }}
                                    addonBefore="http://"
                                    addonAfter=".com"
                                    placeholder="Please enter url"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="owner"
                                label="Owner"
                                rules={[{ required: true, message: "Please select an owner" }]}
                            >
                                <Select placeholder="Please select an owner">
                                    <Option value="xiao">Xiaoxiao Fu</Option>
                                    <Option value="mao">Maomao Zhou</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="type"
                                label="Type"
                                rules={[{ required: true, message: "Please choose the type" }]}
                            >
                                <Select placeholder="Please choose the type">
                                    <Option value="private">Private</Option>
                                    <Option value="public">Public</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="approver"
                                label="Approver"
                                rules={[{ required: true, message: "Please choose the approver" }]}
                            >
                                <Select placeholder="Please choose the approver">
                                    <Option value="jack">Jack Ma</Option>
                                    <Option value="tom">Tom Liu</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="dateTime"
                                label="DateTime"
                                rules={[{ required: true, message: "Please choose the dateTime" }]}
                            >
                                <DatePicker.RangePicker
                                    style={{ width: "100%" }}
                                    getPopupContainer={(trigger) => trigger.parentElement!}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="description"
                                label="Description"
                                rules={[
                                    {
                                        required: true,
                                        message: "please enter url description",
                                    },
                                ]}
                            >
                                <Input.TextArea rows={4} placeholder="please enter url description" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </div>
    );
};

export default LecturerManagement;
