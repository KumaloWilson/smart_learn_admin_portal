import React from 'react';
import { Form, Input, Select, DatePicker, Row, Col } from 'antd';
import type { School } from '../../models/school';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Option } = Select;

interface SchoolFormProps {
    initialValues?: School;
    onSubmit: (values: Partial<School>) => void;
}

const SchoolForm: React.FC<SchoolFormProps> = ({ initialValues, onSubmit }) => {
    return (
        <Form layout="vertical" initialValues={initialValues ? {
            ...initialValues,
            establishment_date: initialValues?.establishment_date ?
                dayjs(initialValues.establishment_date) : undefined
        } : undefined} onFinish={onSubmit}>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item
                        name="school_name"
                        label="School Name"
                        rules={[{ required: true, message: 'Please enter school name' }]}
                    >
                        <Input placeholder="Enter school name" className="rounded-lg" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="school_code"
                        label="School Code"
                        rules={[{ required: true, message: 'Please enter school code' }]}
                    >
                        <Input placeholder="Enter school code" className="rounded-lg" />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item
                        name="dean_id"
                        label="Dean ID"
                    >
                        <Input placeholder="Enter dean ID" className="rounded-lg" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="establishment_date"
                        label="Establishment Date"
                    >
                        <DatePicker className="w-full rounded-lg" />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item
                        name="contact_email"
                        label="Contact Email"
                        rules={[{ type: 'email', message: 'Please enter valid email' }]}
                    >
                        <Input placeholder="Enter contact email" className="rounded-lg" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="contact_phone"
                        label="Contact Phone"
                    >
                        <Input placeholder="Enter contact phone" className="rounded-lg" />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item
                name="building_location"
                label="Building Location"
            >
                <Input placeholder="Enter building location" className="rounded-lg" />
            </Form.Item>

            <Form.Item
                name="description"
                label="Description"
            >
                <TextArea rows={4} placeholder="Enter school description" className="rounded-lg" />
            </Form.Item>

            <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true, message: 'Please select status' }]}
            >
                <Select placeholder="Select status" className="rounded-lg">
                    <Option value="active">Active</Option>
                    <Option value="inactive">Inactive</Option>
                </Select>
            </Form.Item>
        </Form>
    );
};

export default SchoolForm;