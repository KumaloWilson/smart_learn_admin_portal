import React from 'react';
import { Table, Tag, Space, Button, Popconfirm, message, Avatar, Tooltip, Badge } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined, UserOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';
import type { Admin } from '../../models/admin';

interface AdminTableProps {
    data: Admin[];
    loading: boolean;
    onEdit: (admin: Admin) => void;
    onView: (admin: Admin) => void;
    onDelete: (adminId: string) => void;
    onToggleLock: (admin: Admin) => void;
}

const AdminTable: React.FC<AdminTableProps> = ({
    data,
    loading,
    onEdit,
    onView,
    onDelete,
    onToggleLock,
}) => {
    const getStatusColor = (status: Admin['status']): "success" | "default" | "error" | "processing" | "warning" | undefined => {
        const statusColors: { [key in Admin['status']]: "success" | "default" | "error" | "processing" | "warning" | undefined } = {
            active: 'success',
            inactive: 'default',
            suspended: 'error'
        };
        return statusColors[status];
    };

    const columns = [
        {
            title: 'Admin',
            key: 'admin',
            width: 300,
            fixed: 'left' as const,
            render: (record: Admin) => (
                <Space>
                    <Avatar icon={<UserOutlined />} />
                    <Space direction="vertical" size={0}>
                        <span className="font-semibold">
                            {record.first_name} {record.last_name}
                        </span>
                        <Badge
                            status={getStatusColor(record.status)}
                            text={record.status.toUpperCase()}
                        />
                    </Space>
                </Space>
            ),
            sorter: (a: Admin, b: Admin) =>
                `${a.first_name} ${a.last_name}`.localeCompare(`${b.first_name} ${b.last_name}`),
        },
        {
            title: 'Contact',
            key: 'contact',
            width: 250,
            render: (record: Admin) => (
                <Space direction="vertical" size={0}>
                    <a href={`mailto:${record.email}`}>{record.email}</a>
                    {record.phone && <span>{record.phone}</span>}

                </Space>
            ),
        },
        {
            title: 'System Info',
            key: 'system',
            width: 200,
            render: (record: Admin) => (
                <Space direction="vertical" size={0}>
                    <span>Employee ID: {record.employee_id}</span>
                    <span className="text-gray-500">
                        Last login: {record.last_login ? new Date(record.last_login).toLocaleString() : 'Never'}
                    </span>
                    {record.failed_login_attempts > 0 && (
                        <Tag color="orange">Failed attempts: {record.failed_login_attempts}</Tag>
                    )}
                </Space>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 200,
            fixed: 'right' as const,
            render: (record: Admin) => (
                <Space>
                    <Tooltip title="View Details">
                        <Button type="text" icon={<EyeOutlined />} onClick={() => onView(record)} />
                    </Tooltip>
                    <Tooltip title="Edit">
                        <Button type="text" icon={<EditOutlined />} onClick={() => onEdit(record)} />
                    </Tooltip>
                    <Tooltip title={record.account_locked ? "Unlock Account" : "Lock Account"}>
                        <Button
                            type="text"
                            icon={record.account_locked ? <UnlockOutlined /> : <LockOutlined />}
                            onClick={() => onToggleLock(record)}
                        />
                    </Tooltip>
                    <Popconfirm
                        title="Delete Admin"
                        description="Are you sure you want to delete this admin?"
                        onConfirm={() => {
                            onDelete(record.admin_id);
                            message.success('Admin deleted successfully');
                        }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Tooltip title="Delete">
                            <Button type="text" danger icon={<DeleteOutlined />} />
                        </Tooltip>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={data}
            loading={loading}
            rowKey="admin_id"
            pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total) => `Total ${total} admins`,
            }}
            scroll={{ x: 900 }}
            className="shadow-sm rounded-lg"
        />
    );
};

export default AdminTable;