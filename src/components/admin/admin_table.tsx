import React from 'react';
import { Table, Button, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { Admin } from '../../models/admin';

interface AdminTableProps {
    data: Admin[];
    loading: boolean;
    onEdit: (admin: Admin) => void;
    onDelete: (uid: string) => void;
    onView: (admin: Admin) => void;
}

const AdminTable: React.FC<AdminTableProps> = ({ data, loading, onEdit, onDelete, onView }) => {
    const columns = [
        {
            title: 'Admin ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'UID',
            dataIndex: 'uid',
            key: 'uid',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Status',
            dataIndex: 'is_active',
            key: 'is_active',
            render: (isActive: boolean) => (isActive ? 'Active' : 'Inactive'),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: unknown, record: Admin) => (
                <div>
                    <Button
                        icon={<EyeOutlined />}
                        onClick={() => onView(record)}
                        style={{ marginRight: 8 }}
                    />
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => onEdit(record)}
                        style={{ marginRight: 8 }}
                    />
                    <Popconfirm
                        title="Are you sure you want to delete this admin?"
                        onConfirm={() => onDelete(record.uid!)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button icon={<DeleteOutlined />} danger />
                    </Popconfirm>
                </div>
            ),
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={data}
            loading={loading}
            rowKey="id"
            pagination={{ pageSize: 10 }}
        />
    );
};

export default AdminTable;
