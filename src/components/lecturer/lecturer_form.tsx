import React from 'react';
import { Form, Input, Select, DatePicker, Row, Col } from 'antd';
import type { Lecturer } from '../../models/lecturer';
import dayjs from 'dayjs';

const { Option } = Select;

interface LecturerFormProps {
    initialValues?: Partial<Lecturer>;
}

const LecturerForm: React.FC<LecturerFormProps> = ({ initialValues }) => {
    return (
        <Form
            layout="vertical"
            initialValues={initialValues ? {
                ...initialValues,
                date_of_birth: initialValues.date_of_birth ? dayjs(initialValues.date_of_birth) : undefined,
                joined_date: initialValues.joined_date ? dayjs(initialValues.joined_date) : undefined,
            } : undefined}
        >
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="first_name"
                        label="First Name"
                        rules={[{ required: true, message: 'Please enter first name' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="last_name"
                        label="Last Name"
                        rules={[{ required: true, message: 'Please enter last name' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item
                name="email_address"
                label="Email"
                rules={[{ type: 'email', message: 'Please enter a valid email address' }]}
            >
                <Input />
            </Form.Item>

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item name="nationality" label="Nationality">
                        <Select>
                            <Option value="South African">South African</Option>
                            <Option value="Other">Other</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="department" label="Department">
                        <Select>
                            <Option value="Computer Science">Computer Science</Option>
                            <Option value="Mathematics">Mathematics</Option>
                            <Option value="Physics">Physics</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item name="date_of_birth" label="Date of Birth">
                <DatePicker style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item name="joined_date" label="Joined Date">
                <DatePicker style={{ width: '100%' }} />
            </Form.Item>
        </Form>
    );
};

export default LecturerForm;
