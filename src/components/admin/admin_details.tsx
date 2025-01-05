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
                <Descriptions.Item label="UID">{admin.uid}</Descriptions.Item>
                <Descriptions.Item label="Name">{admin.name}</Descriptions.Item>
                <Descriptions.Item label="Email">{admin.email}</Descriptions.Item>
                <Descriptions.Item label="Phone Number">
                    {admin.phone_number ? admin.phone_number : 'Not Available'}
                </Descriptions.Item>
                <Descriptions.Item label="Address">
                    {admin.address ? admin.address : 'Not Available'}
                </Descriptions.Item>
                <Descriptions.Item label="Role">{admin.role}</Descriptions.Item>
                <Descriptions.Item label="Status">
                    {admin.is_active ? 'Active' : 'Inactive'}
                </Descriptions.Item>
                <Descriptions.Item label="Profile Picture">
                    {admin.profile_picture_url ? (
                        <img src={admin.profile_picture_url} alt="Profile" width={100} />
                    ) : (
                        'Not Available'
                    )}
                </Descriptions.Item>
                <Descriptions.Item label="Created At">
                    {admin.created_at ? admin.created_at.toString() : 'Not Available'}
                </Descriptions.Item>
                <Descriptions.Item label="Updated At">
                    {admin.updated_at ? admin.updated_at.toString() : 'Not Available'}
                </Descriptions.Item>
                <Descriptions.Item label="Last Login">
                    {admin.last_login ? admin.last_login.toString() : 'Not Available'}
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
