import React from 'react';
import { Descriptions, Button, Row, Col } from 'antd';
import { Admin } from '../../models/admin';
import { EditOutlined } from '@ant-design/icons';

interface AdminDetailsProps {
    admin: Admin;
    onEdit: () => void;
}

const AdminDetails: React.FC<AdminDetailsProps> = ({ admin, onEdit }) => {
    return (
        <div>
            <Descriptions title="Admin Details" bordered column={2}>
                <Descriptions.Item label="Admin ID">{admin.admin_id}</Descriptions.Item>
                <Descriptions.Item label="Role ID">{admin.role_id}</Descriptions.Item>
                <Descriptions.Item label="Employee ID">{admin.employee_id}</Descriptions.Item>
                <Descriptions.Item label="First Name">{admin.first_name}</Descriptions.Item>
                <Descriptions.Item label="Last Name">{admin.last_name}</Descriptions.Item>
                <Descriptions.Item label="Email">{admin.email}</Descriptions.Item>
                <Descriptions.Item label="Phone">
                    {admin.phone ?? 'Not Available'}
                </Descriptions.Item>
                <Descriptions.Item label="Status">
                    {admin.status.charAt(0).toUpperCase() + admin.status.slice(1)}
                </Descriptions.Item>
                <Descriptions.Item label="Last Login">
                    {admin.last_login ?? 'Not Available'}
                </Descriptions.Item>
                <Descriptions.Item label="Failed Login Attempts">
                    {admin.failed_login_attempts}
                </Descriptions.Item>
                <Descriptions.Item label="Account Locked">
                    {admin.account_locked ? 'Yes' : 'No'}
                </Descriptions.Item>
                <Descriptions.Item label="Lock Timestamp">
                    {admin.lock_timestamp ?? 'Not Available'}
                </Descriptions.Item>
                <Descriptions.Item label="Created At">
                    {admin.created_at ?? 'Not Available'}
                </Descriptions.Item>
                <Descriptions.Item label="Updated At">
                    {admin.updated_at ?? 'Not Available'}
                </Descriptions.Item>
            </Descriptions>

            <Row justify="end" style={{ marginTop: 20 }}>
                <Col>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={onEdit}
                    >
                        Edit Details
                    </Button>
                </Col>
            </Row>
        </div>
    );
};

export default AdminDetails;
