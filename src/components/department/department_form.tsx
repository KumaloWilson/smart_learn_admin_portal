import React from 'react';
import { Form, Input, Select, DatePicker, Row, Col } from 'antd';
import type { Department } from '../../models/department';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Option } = Select;


interface DepartmentFormProps {

    initialValues?: Department;

    onSubmit: (values: Omit<Department, 'department_id'>) => Promise<void>;

    selectedSchool?: string;

}

const DepartmentForm: React.FC<DepartmentFormProps> = ({ initialValues, onSubmit, selectedSchool }) => {
    return (
        <Form layout="vertical" initialValues={initialValues ? {
            ...initialValues,
            establishment_date: initialValues?.establishment_date ?
                dayjs(initialValues.establishment_date) : undefined,
            school_id: selectedSchool ?? initialValues?.school_id
        } : undefined} onFinish={onSubmit}>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item
                        name="department_name"
                        label="Department Name"
                        rules={[{ required: true, message: 'Please enter department name' }]}
                    >
                        <Input placeholder="Enter department name" className="rounded-lg" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="department_code"
                        label="Department Code"
                        rules={[{ required: true, message: 'Please enter department code' }]}
                    >
                        <Input placeholder="Enter department code" className="rounded-lg" />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item
                        name="head_of_department_id"
                        label="Head of Department ID"
                    >
                        <Input placeholder="Enter HOD ID" className="rounded-lg" />
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
                name="office_location"
                label="Office Location"
            >
                <Input placeholder="Enter office location" className="rounded-lg" />
            </Form.Item>

            <Form.Item
                name="description"
                label="Description"
            >
                <TextArea rows={4} placeholder="Enter department description" className="rounded-lg" />
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

            <Form.Item name="school_id" hidden>
                <Input />
            </Form.Item>
        </Form>
    );
};

export default DepartmentForm;