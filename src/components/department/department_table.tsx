import React, { useState } from 'react';
import { Table, Tag, Space, Button, Popconfirm, message, Tooltip, Badge } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined, TeamOutlined } from '@ant-design/icons';
import type { Department } from '../../models/department';
import { ColumnGroupType, ColumnType } from 'antd/es/table';

interface DepartmentTableProps {
    data: Department[];
    loading: boolean;
    onEdit: (department: Department) => void;
    onView: (department: Department) => void;
    onDelete: (departmentId: string) => void;
}

const DepartmentTable: React.FC<DepartmentTableProps> = ({
    data,
    loading,
    onEdit,
    onView,
    onDelete,
}) => {
    const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);

    const getStatusColor = (status?: Department['status']): "success" | "warning" | "default" => {
        const colors: Record<string, "success" | "warning" | "default"> = {
            active: 'success',
            inactive: 'warning'
        };
        return status ? colors[status] : 'default';
    };

    const columns: (ColumnGroupType<Department> | ColumnType<Department>)[] = [
        {
            title: 'Department Info',
            key: 'departmentInfo',
            width: 300,
            fixed: 'left' as const,
            render: (record: Department) => (
                <Space>
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
                        <TeamOutlined className="text-xl text-blue-600" />
                    </div>
                    <Space direction="vertical" size={0}>
                        <Space>
                            <span className="font-semibold">{record.department_code}</span>
                            <Badge
                                status={getStatusColor(record.status)}
                                text={record.status?.toUpperCase() || 'N/A'}
                            />
                        </Space>
                        <span className="text-base">{record.department_name}</span>
                        <span className="text-gray-500">{record.office_location || 'Location N/A'}</span>
                    </Space>
                </Space>
            ),
            sorter: (a: Department, b: Department) =>
                a.department_name.localeCompare(b.department_name),
        },
        {
            title: 'Contact Details',
            key: 'contactDetails',
            width: 250,
            render: (record: Department) => (
                <Space direction="vertical" size={0}>
                    <span>{record.contact_email || 'Email N/A'}</span>
                    <span>{record.contact_phone || 'Phone N/A'}</span>
                    {record.head_of_department_id && (
                        <Tag color="blue">HOD ID: {record.head_of_department_id}</Tag>
                    )}
                </Space>
            ),
        },
        {
            title: 'Dates',
            key: 'dates',
            width: 200,
            render: (record: Department) => (
                <Space direction="vertical" size={0}>
                    {record.establishment_date && (
                        <span className="text-gray-600">
                            Est: {new Date(record.establishment_date).toLocaleDateString()}
                        </span>
                    )}
                    {record.created_at && (
                        <span className="text-gray-500 text-sm">
                            Created: {new Date(record.created_at).toLocaleDateString()}
                        </span>
                    )}
                </Space>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 150,
            fixed: 'right' as const,
            render: (record: Department) => (
                <Space>
                    <Tooltip title="View Details">
                        <Button
                            type="text"
                            icon={<EyeOutlined />}
                            onClick={() => onView(record)}
                        />
                    </Tooltip>
                    <Tooltip title="Edit">
                        <Button
                            type="text"
                            icon={<EditOutlined />}
                            onClick={() => onEdit(record)}
                        />
                    </Tooltip>
                    <Popconfirm
                        title="Delete School"
                        description="Are you sure you want to delete this Department?"
                        onConfirm={() => {
                            onDelete(record.department_id);
                            message.success('Department deleted successfully');
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

    const expandedRowRender = (record: Department) => (
        <div className="p-4 bg-gray-50">
            <Space direction="vertical" size="middle" className="w-full">
                {record.description && (
                    <div>
                        <h4 className="font-semibold mb-2">Description</h4>
                        <p>{record.description}</p>
                    </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h4 className="font-semibold mb-2">Department Details</h4>
                        <ul className="space-y-2">
                            <li>School Code: {record.school_id}</li>
                            <li>Location: {record.office_location || 'N/A'}</li>
                            <li>Status: {record.status?.toUpperCase() || 'Not specified'}</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">Contact Information</h4>
                        <ul className="space-y-2">
                            <li>Email: {record.contact_email || 'N/A'}</li>
                            <li>Phone: {record.contact_phone || 'N/A'}</li>
                            <li>Dean ID: {record.head_of_department_id || 'N/A'}</li>
                        </ul>
                    </div>
                </div>
            </Space>
        </div>
    );

    return (
        <Table
            columns={columns}
            dataSource={data}
            loading={loading}
            rowKey="department_id"
            expandable={{
                expandedRowRender,
                expandedRowKeys,
                onExpand: (expanded, record) => {
                    setExpandedRowKeys(
                        expanded
                            ? [...expandedRowKeys, record.school_id]
                            : expandedRowKeys.filter(key => key !== record.school_id)
                    );
                }
            }}
            pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total) => `Total ${total} schools`,
            }}
            scroll={{ x: 900 }}
            className="shadow-sm rounded-lg"
        />
    );
};

export default DepartmentTable;