import React, { useState, useEffect } from "react";
import { Button, Table, Drawer, Form, Input, Row, Col, Select, DatePicker, Space, message, Popconfirm } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { Student } from "../types/student";
import dayjs from 'dayjs';
import { baseUrl } from "../configs/config";

const { Option } = Select;

const StudentManagement: React.FC = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState<Student | null>(null);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${baseUrl}/student`);
            const data = await response.json();

            console.log(data);
            setStudents(data);
        } catch (error) {
            console.log(error);
            message.error(`Failed to fetch students ${error}`);
        } finally {
            setLoading(false);
        }
    };

    const showDrawer = (student?: Student) => {
        if (student) {
            setEditingStudent(student);
            form.setFieldsValue({
                ...student,
                date_of_birth: student.date_of_birth ? dayjs(student.date_of_birth) : undefined
            });
        } else {
            setEditingStudent(null);
            form.resetFields();
        }
        setIsDrawerOpen(true);
    };

    const closeDrawer = () => {
        setIsDrawerOpen(false);
        setEditingStudent(null);
        form.resetFields();
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            const url = editingStudent
                ? `${baseUrl}/student/${editingStudent.student_id}`
                : `${baseUrl}/student`;

            const method = editingStudent ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) throw new Error('Failed to save student');

            message.success(`Student ${editingStudent ? 'updated' : 'created'} successfully`);
            closeDrawer();
            fetchStudents();
        } catch (error) {
            message.error(`Failed to save student ${error}`);
        }
    };

    const handleDelete = async (studentId: string) => {
        try {
            const response = await fetch(`${baseUrl}/student/${studentId}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete student');

            message.success('Student deleted successfully');
            fetchStudents();
        } catch (error) {
            message.error(`Failed to save delete ${error}`);
        }
    };

    const columns = [
        {
            title: 'Student ID',
            dataIndex: 'student_id',
            key: 'student_id',
        },
        {
            title: 'Name',
            key: 'name',
            render: (_: unknown, record: Student) => `${record.title} ${record.first_name} ${record.surname}`,
        },
        {
            title: 'Email',
            dataIndex: 'email_address',
            key: 'email_address',
        },
        {
            title: 'Phone',
            dataIndex: 'phone_numbers',
            key: 'phone_numbers',
        },
        {
            title: 'Nationality',
            dataIndex: 'nationality',
            key: 'nationality',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: unknown, record: Student) => (
                <Space>
                    <Button
                        icon={<EditOutlined className="w-4 h-4" />}
                        onClick={() => showDrawer(record)}
                    />
                    <Popconfirm
                        title="Delete student"
                        description="Are you sure you want to delete this student?"
                        onConfirm={() => handleDelete(record.student_id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            icon={<DeleteOutlined className="w-4 h-4" />}
                            danger
                        />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Student Management</h1>
                <Button type="primary" onClick={() => showDrawer()} icon={<PlusOutlined className="w-4 h-4" />}>
                    Add Student
                </Button>
            </div>

            <Table
                loading={loading}
                columns={columns}
                dataSource={students}
                rowKey="student_id"
            />

            <Drawer
                title={`${editingStudent ? 'Edit' : 'Create'} Student`}
                width={720}
                onClose={closeDrawer}
                open={isDrawerOpen}
                extra={
                    <Space>
                        <Button onClick={closeDrawer}>Cancel</Button>
                        <Button onClick={handleSubmit} type="primary">
                            Submit
                        </Button>
                    </Space>
                }
            >
                <Form
                    form={form}
                    layout="vertical"
                    hideRequiredMark
                >
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item
                                name="student_id"
                                label="Student ID"
                                rules={[{ required: true, message: "Please enter student ID" }]}
                            >
                                <Input placeholder="Enter student ID" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="title"
                                label="Title"
                                rules={[{ required: true }]}
                            >
                                <Select placeholder="Select title">
                                    <Option value="Mr">Mr</Option>
                                    <Option value="Mrs">Mrs</Option>
                                    <Option value="Miss">Miss</Option>
                                    <Option value="Dr">Dr</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="sex"
                                label="Gender"
                                rules={[{ required: true }]}
                            >
                                <Select placeholder="Select gender">
                                    <Option value="Male">Male</Option>
                                    <Option value="Female">Female</Option>
                                    <Option value="Other">Other</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="first_name"
                                label="First Name"
                                rules={[{ required: true }]}
                            >
                                <Input placeholder="Enter first name" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="surname"
                                label="Surname"
                                rules={[{ required: true }]}
                            >
                                <Input placeholder="Enter surname" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="email_address"
                                label="Email"
                                rules={[
                                    { required: true },
                                    { type: 'email', message: 'Please enter a valid email' }
                                ]}
                            >
                                <Input placeholder="Enter email address" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="phone_numbers"
                                label="Phone Numbers"
                                rules={[{ required: true }]}
                            >
                                <Input placeholder="Enter phone numbers" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="nationality"
                                label="Nationality"
                                rules={[{ required: true }]}
                            >
                                <Input placeholder="Enter nationality" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="citizenship"
                                label="Citizenship"
                                rules={[{ required: true }]}
                            >
                                <Input placeholder="Enter citizenship" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="national_id"
                                label="National ID"
                                rules={[{ required: true }]}
                            >
                                <Input placeholder="Enter national ID" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="date_of_birth"
                                label="Date of Birth"
                                rules={[{ required: true }]}
                            >
                                <DatePicker style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="place_of_birth"
                                label="Place of Birth"
                                rules={[{ required: true }]}
                            >
                                <Input placeholder="Enter place of birth" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="marital_status"
                                label="Marital Status"
                                rules={[{ required: true }]}
                            >
                                <Select placeholder="Select marital status">
                                    <Option value="Single">Single</Option>
                                    <Option value="Married">Married</Option>
                                    <Option value="Divorced">Divorced</Option>
                                    <Option value="Widowed">Widowed</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="religion"
                                label="Religion"
                            >
                                <Input placeholder="Enter religion" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="radio_frequency_id"
                                label="RFID"
                            >
                                <Input placeholder="Enter RFID" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        name="permanent_address"
                        label="Permanent Address"
                        rules={[{ required: true }]}
                    >
                        <Input.TextArea rows={3} placeholder="Enter permanent address" />
                    </Form.Item>

                    <Form.Item
                        name="contact_address"
                        label="Contact Address"
                        rules={[{ required: true }]}
                    >
                        <Input.TextArea rows={3} placeholder="Enter contact address" />
                    </Form.Item>

                    <Form.Item
                        name="permanent_home_address"
                        label="Permanent Home Address"
                        rules={[{ required: true }]}
                    >
                        <Input.TextArea rows={3} placeholder="Enter permanent home address" />
                    </Form.Item>
                </Form>
            </Drawer>
        </div>
    );
};

export default StudentManagement;