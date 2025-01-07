import React, { useState } from 'react';
import { Table, Tag, Space, Button, Popconfirm, message, Tooltip, Badge } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined, BankOutlined } from '@ant-design/icons';
import type { School } from '../../models/school';
import { ColumnGroupType, ColumnType } from 'antd/es/table';

interface SchoolTableProps {
    data: School[];
    loading: boolean;
    onEdit: (school: School) => void;
    onView: (school: School) => void;
    onDelete: (schoolId: string) => void;
}

const SchoolTable: React.FC<SchoolTableProps> = ({
    data,
    loading,
    onEdit,
    onView,
    onDelete,
}) => {
    const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);

    const getStatusColor = (status?: School['status']): "success" | "warning" | "default" => {
        const colors: Record<string, "success" | "warning" | "default"> = {
            active: 'success',
            inactive: 'warning'
        };
        return status ? colors[status] : 'default';
    };

    const columns: (ColumnGroupType<School> | ColumnType<School>)[] = [
        {
            title: 'School Info',
            key: 'schoolInfo',
            width: 300,
            fixed: 'left' as const,
            render: (record: School) => (
                <Space>
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
                        <BankOutlined className="text-xl text-blue-600" />
                    </div>
                    <Space direction="vertical" size={0}>
                        <Space>
                            <span className="font-semibold">{record.school_code}</span>
                            <Badge
                                status={getStatusColor(record.status)}
                                text={record.status?.toUpperCase() || 'N/A'}
                            />
                        </Space>
                        <span className="text-base">{record.school_name}</span>
                        <span className="text-gray-500">{record.building_location || 'Location N/A'}</span>
                    </Space>
                </Space>
            ),
            sorter: (a: School, b: School) => a.school_name.localeCompare(b.school_name),
        },
        {
            title: 'Contact Details',
            key: 'contactDetails',
            width: 250,
            render: (record: School) => (
                <Space direction="vertical" size={0}>
                    <span>{record.contact_email || 'Email N/A'}</span>
                    <span>{record.contact_phone || 'Phone N/A'}</span>
                    {record.dean_id && <Tag color="blue">Dean ID: {record.dean_id}</Tag>}
                </Space>
            ),
        },
        {
            title: 'Dates',
            key: 'dates',
            width: 200,
            render: (record: School) => (
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
                    {record.updated_at && (
                        <span className="text-gray-500 text-sm">
                            Updated: {new Date(record.updated_at).toLocaleDateString()}
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
            render: (record: School) => (
                <Space>
                    <Tooltip title="View Details">
                        <Button type="text" icon={<EyeOutlined />} onClick={() => onView(record)} />
                    </Tooltip>
                    <Tooltip title="Edit">
                        <Button type="text" icon={<EditOutlined />} onClick={() => onEdit(record)} />
                    </Tooltip>
                    <Popconfirm
                        title="Delete School"
                        description="Are you sure you want to delete this school?"
                        onConfirm={() => {
                            onDelete(record.school_id);
                            message.success('School deleted successfully');
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

    const expandedRowRender = (record: School) => (
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
                        <h4 className="font-semibold mb-2">School Details</h4>
                        <ul className="space-y-2">
                            <li>School Code: {record.school_code}</li>
                            <li>Location: {record.building_location || 'N/A'}</li>
                            <li>Status: {record.status?.toUpperCase() || 'Not specified'}</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">Contact Information</h4>
                        <ul className="space-y-2">
                            <li>Email: {record.contact_email || 'N/A'}</li>
                            <li>Phone: {record.contact_phone || 'N/A'}</li>
                            <li>Dean ID: {record.dean_id || 'N/A'}</li>
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
            rowKey="school_id"
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

export default SchoolTable;