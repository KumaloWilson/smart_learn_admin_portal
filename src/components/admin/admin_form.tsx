import React from 'react';
import { Form, Input, Button, Select, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Admin } from '../../models/admin';

interface AdminFormProps {
    initialValues?: Admin;
    onSubmit: (values: Partial<Admin>) => void;
}

const { Option } = Select;

const AdminForm: React.FC<AdminFormProps> = ({ initialValues, onSubmit }) => {
    const [form] = Form.useForm();

    // Handle file upload
    const handleFileUpload = (file: unknown) => {
        // Simulate a file upload process
        console.log('Uploading file...', file);
        message.success('File uploaded successfully');
        return false; // Prevents automatic upload
    };

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
                name="name"
                label="Full Name"
                rules={[{ required: true, message: 'Please enter the admin\'s full name' }]}
            >
                <Input placeholder="Enter full name" />
            </Form.Item>

            <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: 'Please enter the admin\'s email' }, { type: 'email', message: 'Please enter a valid email' }]}
            >
                <Input placeholder="Enter email" />
            </Form.Item>

            <Form.Item
                name="phone_number"
                label="Phone Number"
            >
                <Input placeholder="Enter phone number" />
            </Form.Item>

            <Form.Item
                name="address"
                label="Address"
            >
                <Input.TextArea placeholder="Enter address" />
            </Form.Item>

            <Form.Item
                name="role"
                label="Role"
                rules={[{ required: true, message: 'Please select the admin\'s role' }]}
            >
                <Select placeholder="Select role">
                    <Option value="admin">Admin</Option>
                    <Option value="superadmin">Superadmin</Option>
                </Select>
            </Form.Item>

            <Form.Item name="profile_picture_url" label="Profile Picture">
                <Upload
                    name="profile_picture"
                    beforeUpload={handleFileUpload}
                    maxCount={1}
                    showUploadList={false}
                >
                    <Button icon={<UploadOutlined />}>Upload Profile Picture</Button>
                </Upload>
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
