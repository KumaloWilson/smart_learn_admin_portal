import React from 'react';
import { Form, Input, Select, DatePicker, Row, Col } from 'antd';
import type { Student } from '../../models/student';
import dayjs from 'dayjs';

const { Option } = Select;

interface StudentFormProps {
    initialValues?: Partial<Student>;
}

const StudentForm: React.FC<StudentFormProps> = ({ initialValues }) => {
    return (
        <Form layout="vertical" initialValues={initialValues ? {
            ...initialValues,
            date_of_birth: initialValues.date_of_birth ? dayjs(initialValues.date_of_birth) : undefined,
        } : undefined}>
            <Row gutter={16}>
                <Col span={8}>
                    <Form.Item
                        name="first_name"
                        label="First Name"
                        rules={[{ required: true, message: 'Please enter first name' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        name="surname"
                        label="Surname"
                        rules={[{ required: true, message: 'Please enter surname' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[{ required: true }]}
                    >
                        <Select>
                            <Option value="Mr">Mr</Option>
                            <Option value="Mrs">Mrs</Option>
                            <Option value="Miss">Miss</Option>
                            <Option value="Dr">Dr</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="email_address"
                        label="Email"
                        rules={[
                            { required: true, message: 'Please enter email' },
                            { type: 'email', message: 'Please enter a valid email' }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="phone_numbers"
                        label="Phone Number"
                        rules={[{ required: true, message: 'Please enter phone number' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={8}>
                    <Form.Item
                        name="nationality"
                        label="Nationality"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        name="national_id"
                        label="National ID"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        name="citizenship"
                        label="Citizenship"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="date_of_birth"
                        label="Date of Birth"
                        rules={[{ required: true }]}
                    >
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="place_of_birth"
                        label="Place of Birth"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="sex"
                        label="Sex"
                        rules={[{ required: true }]}
                    >
                        <Select>
                            <Option value="male">Male</Option>
                            <Option value="female">Female</Option>
                            <Option value="other">Other</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="marital_status"
                        label="Marital Status"
                        rules={[{ required: true }]}
                    >
                        <Select>
                            <Option value="single">Single</Option>
                            <Option value="married">Married</Option>
                            <Option value="divorced">Divorced</Option>
                            <Option value="widowed">Widowed</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item
                name="permanent_address"
                label="Permanent Address"
                rules={[{ required: true }]}
            >
                <Input.TextArea rows={3} />
            </Form.Item>

            <Form.Item
                name="contact_address"
                label="Contact Address"
                rules={[{ required: true }]}
            >
                <Input.TextArea rows={3} />
            </Form.Item>
        </Form>
    );
};

export default StudentForm;