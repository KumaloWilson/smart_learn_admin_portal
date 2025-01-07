import React, { useState } from 'react';
import { Table, Tag, Space, Button, Popconfirm, message, Avatar, Tooltip, Badge } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined, UserOutlined } from '@ant-design/icons';
import type { Lecturer } from '../../models/lecturer';
import { ColumnGroupType, ColumnType } from 'antd/es/table';

interface LecturerTableProps {
    data: Lecturer[];
    loading: boolean;
    onEdit: (lecturer: Lecturer) => void;
    onView: (lecturer: Lecturer) => void;
    onDelete: (lecturerId: string) => void;
}

const LecturerTable: React.FC<LecturerTableProps> = ({
    data,
    loading,
    onEdit,
    onView,
    onDelete,
}) => {
    const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);

    const getStatusColor = (status: Lecturer['status']): "success" | "warning" | "processing" | "default" | "error" => {
        const colors: Record<Lecturer['status'], "success" | "warning" | "processing" | "default" | "error"> = {
            active: 'success',
            on_leave: 'warning',
            sabbatical: 'processing',
            retired: 'default',
            resigned: 'error'
        };
        return colors[status];
    };

    const getEmploymentStatusColor = (status: Lecturer['employment_status']) => {
        const colors = {
            'full-time': 'green',
            'part-time': 'orange',
            'visiting': 'purple',
            'emeritus': 'blue'
        };
        return colors[status];
    };

    const columns: (ColumnGroupType<Lecturer> | ColumnType<Lecturer>)[] = [
        {
            title: 'Profile',
            key: 'profile',
            width: 300,
            fixed: 'left' as const,
            render: (record: Lecturer) => (
                <Space>
                    <Avatar
                        size={64}
                        src={record.profile_picture_url}
                        icon={!record.profile_picture_url && <UserOutlined />}
                    />
                    <Space direction="vertical" size={0}>
                        <Space>
                            <span className="font-semibold">{record.title}</span>
                            <span>{record.first_name} {record.middle_name} {record.last_name}</span>
                        </Space>
                        <span className="text-gray-500">{record.position_title || 'Lecturer'}</span>
                        <Space>
                            <Badge
                                status={getStatusColor(record.status)}
                                text={record.status.replace('_', ' ').toUpperCase()}
                            />
                        </Space>
                    </Space>
                </Space>
            ),
            sorter: (a: Lecturer, b: Lecturer) =>
                `${a.first_name} ${a.last_name}`.localeCompare(`${b.first_name} ${b.last_name}`),
        },
        {
            title: 'Contact',
            key: 'contact',
            width: 250,
            render: (record: Lecturer) => (
                <Space direction="vertical" size={0}>
                    <a href={`mailto:${record.email}`}>{record.email}</a>
                    {record.phone && <span>{record.phone}</span>}
                    {record.office_location && (
                        <Tooltip title="Office Location">
                            <span className="text-gray-500">{record.office_location}</span>
                        </Tooltip>
                    )}
                </Space>
            ),
        },
        {
            title: 'Employment',
            key: 'employment',
            width: 200,
            render: (record: Lecturer) => (
                <Space direction="vertical" size={0}>
                    <Tag color={getEmploymentStatusColor(record.employment_status)}>
                        {record.employment_status.replace('_', ' ').toUpperCase()}
                    </Tag>
                    <span className="text-gray-500">Joined: {new Date(record.date_joined).toLocaleDateString()}</span>
                    {record.contract_end_date && (
                        <span className="text-gray-500">
                            Contract ends: {new Date(record.contract_end_date).toLocaleDateString()}
                        </span>
                    )}
                </Space>
            ),
            filters: [
                { text: 'Full-time', value: 'full-time' },
                { text: 'Part-time', value: 'part-time' },
                { text: 'Visiting', value: 'visiting' },
                { text: 'Emeritus', value: 'emeritus' }
            ],
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 150,
            fixed: 'right' as const,
            render: (record: Lecturer) => (
                <Space>
                    <Tooltip title="View Details">
                        <Button type="text" icon={<EyeOutlined />} onClick={() => onView(record)} />
                    </Tooltip>
                    <Tooltip title="Edit">
                        <Button type="text" icon={<EditOutlined />} onClick={() => onEdit(record)} />
                    </Tooltip>
                    <Popconfirm
                        title="Delete Lecturer"
                        description="Are you sure you want to delete this lecturer?"
                        onConfirm={() => {
                            onDelete(record.lecturer_id);
                            message.success('Lecturer deleted successfully');
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

    const expandedRowRender = (record: Lecturer) => (
        <div className="p-4 bg-gray-50">
            <Space direction="vertical" size="middle" className="w-full">
                {record.research_interests && (
                    <div>
                        <h4 className="font-semibold mb-2">Research Interests</h4>
                        <p>{record.research_interests}</p>
                    </div>
                )}
                {record.bio && (
                    <div>
                        <h4 className="font-semibold mb-2">Biography</h4>
                        <p>{record.bio}</p>
                    </div>
                )}
                <div className="text-gray-500 text-sm">
                    Staff Number: {record.staff_number} | Department ID: {record.primary_department_id || 'N/A'}
                </div>
            </Space>
        </div>
    );

    return (
        <Table
            columns={columns}
            dataSource={data}
            loading={loading}
            rowKey="lecturer_id"
            expandable={{
                expandedRowRender,
                expandedRowKeys,
                onExpand: (expanded, record) => {
                    setExpandedRowKeys(
                        expanded
                            ? [...expandedRowKeys, record.lecturer_id]
                            : expandedRowKeys.filter(key => key !== record.lecturer_id)
                    );
                }
            }}
            pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total) => `Total ${total} lecturers`,
            }}
            scroll={{ x: 900 }}
            className="shadow-sm rounded-lg"
        />
    );
};

export default LecturerTable;