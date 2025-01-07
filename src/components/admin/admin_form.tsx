import React from 'react';
import { Form, Input, Button, Select, } from 'antd';
import { Admin } from '../../models/admin';

interface AdminFormProps {
    initialValues?: Partial<Admin>;
    onSubmit: (values: Partial<Admin>) => void;
}

const { Option } = Select;

const AdminForm: React.FC<AdminFormProps> = ({ initialValues, onSubmit }) => {
    const [form] = Form.useForm();

    const onFinish = (values: Partial<Admin>) => {
        onSubmit(values);
    };

    return (
        <Form
            form={form}
            initialValues={initialValues}
            layout="vertical"
            onFinish={onFinish}
            hideRequiredMark
        >
            <Form.Item
                name="first_name"
                label="First Name"
                rules={[{ required: true, message: 'Please enter the first name' }]}
            >
                <Input placeholder="Enter first name" />
            </Form.Item>

            <Form.Item
                name="last_name"
                label="Last Name"
                rules={[{ required: true, message: 'Please enter the last name' }]}
            >
                <Input placeholder="Enter last name" />
            </Form.Item>

            <Form.Item
                name="email"
                label="Email"
                rules={[
                    { required: true, message: 'Please enter the email' },
                    { type: 'email', message: 'Please enter a valid email' },
                ]}
            >
                <Input placeholder="Enter email" />
            </Form.Item>

            <Form.Item
                name="phone"
                label="Phone"
                rules={[{ pattern: /^[0-9]{10,15}$/, message: 'Enter a valid phone number' }]}
            >
                <Input placeholder="Enter phone number" />
            </Form.Item>

            <Form.Item
                name="role_id"
                label="Role ID"
                rules={[{ required: true, message: 'Please select a role' }]}
            >
                <Select placeholder="Select role">
                    <Option value="1">Admin</Option>
                    <Option value="2">Superadmin</Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true, message: 'Please select the status' }]}
            >
                <Select placeholder="Select status">
                    <Option value="active">Active</Option>
                    <Option value="inactive">Inactive</Option>
                    <Option value="suspended">Suspended</Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="failed_login_attempts"
                label="Failed Login Attempts"
                initialValue={0}
                rules={[{ type: 'number', min: 0, message: 'Must be a non-negative number' }]}
            >
                <Input type="number" placeholder="Enter failed login attempts" />
            </Form.Item>

            <Form.Item
                name="account_locked"
                label="Account Locked"
                rules={[{ required: true, message: 'Please select if the account is locked' }]}
            >
                <Select placeholder="Select account lock status">
                    <Option value={true}>Yes</Option>
                    <Option value={false}>No</Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="lock_timestamp"
                label="Lock Timestamp"
            >
                <Input placeholder="Enter lock timestamp (ISO 8601 format)" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    {initialValues ? 'Update Admin' : 'Create Admin'}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AdminForm;
