import React from 'react';
import { Form, Input, Select, DatePicker, Row, Col, Button } from 'antd';
import type { Lecturer } from '../../models/lecturer';
import dayjs from 'dayjs';

const { Option } = Select;

interface LecturerFormProps {
    initialValues?: Partial<Lecturer>;
    onSubmit: (values: Partial<Lecturer>) => void;
    onCancel?: () => void;
}

const LecturerForm: React.FC<LecturerFormProps> = ({ initialValues, onSubmit, onCancel }) => {
    return (
        <Form
            layout="vertical"
            initialValues={initialValues ? {
                ...initialValues,
                date_of_birth: initialValues.date_of_birth ? dayjs(initialValues.date_of_birth) : undefined,
                date_joined: initialValues.date_joined ? dayjs(initialValues.date_joined) : undefined,
                contract_end_date: initialValues.contract_end_date ? dayjs(initialValues.contract_end_date) : undefined,
            } : undefined}
            onFinish={onSubmit}
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

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="middle_name"
                        label="Middle Name"
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ type: 'email', message: 'Please enter a valid email address' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[{ required: true, message: 'Please select a title' }]}
                    >
                        <Select>
                            <Option value="Dr.">Dr.</Option>
                            <Option value="Prof.">Prof.</Option>
                            <Option value="Mr.">Mr.</Option>
                            <Option value="Mrs.">Mrs.</Option>
                            <Option value="Ms.">Ms.</Option>
                            <Option value="Mx.">Mx.</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="gender"
                        label="Gender"
                        rules={[{ required: true, message: 'Please select a gender' }]}
                    >
                        <Select>
                            <Option value="Male">Male</Option>
                            <Option value="Female">Female</Option>
                            <Option value="Other">Other</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item name="date_of_birth" label="Date of Birth">
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="date_joined" label="Date Joined">
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item name="contract_end_date" label="Contract End Date">
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="phone" label="Phone Number">
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item name="office_location" label="Office Location">
                <Input />
            </Form.Item>

            <Form.Item name="research_interests" label="Research Interests">
                <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item name="bio" label="Biography">
                <Input.TextArea rows={4} />
            </Form.Item>

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="employment_status"
                        label="Employment Status"
                        rules={[{ required: true, message: 'Please select an employment status' }]}
                    >
                        <Select>
                            <Option value="full-time">Full-time</Option>
                            <Option value="part-time">Part-time</Option>
                            <Option value="visiting">Visiting</Option>
                            <Option value="emeritus">Emeritus</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="status"
                        label="Status"
                        rules={[{ required: true, message: 'Please select a status' }]}
                    >
                        <Select>
                            <Option value="active">Active</Option>
                            <Option value="on_leave">On Leave</Option>
                            <Option value="sabbatical">Sabbatical</Option>
                            <Option value="retired">Retired</Option>
                            <Option value="resigned">Resigned</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item>
                <div className="flex justify-end gap-4">
                    <Button onClick={onCancel} style={{ marginRight: '8px' }}>
                        Cancel
                    </Button>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </div>
            </Form.Item>
        </Form>
    );
};

export default LecturerForm;
