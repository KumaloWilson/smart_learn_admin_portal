import React, { useState } from 'react';
import { Table, Tag, Space, Button, Popconfirm, message, Avatar, Tooltip, Badge } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined, UserOutlined } from '@ant-design/icons';
import type { Student } from '../../models/student';

interface StudentTableProps {
    data: Student[];
    loading: boolean;
    onEdit: (student: Student) => void;
    onView: (student: Student) => void;
    onDelete: (studentId: string) => void;
}

const StudentTable: React.FC<StudentTableProps> = ({
    data,
    loading,
    onEdit,
    onView,
    onDelete,
}) => {
    const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);

    const getStatusColor = (status: Student['enrollment_status']) => {
        const colors: Record<Student['enrollment_status'], "default" | "success" | "error" | "warning"> = {
            active: 'success',
            suspended: 'error',
            graduated: 'default',
            withdrawn: 'default',
            deferred: 'warning'
        };
        return colors[status];
    };

    const columns = [
        {
            title: 'Profile',
            key: 'profile',
            width: 300,
            fixed: 'left' as const,
            render: (record: Student) => (
                <Space>
                    <Avatar
                        size={64}
                        src={record.photo_url}
                        icon={!record.photo_url && <UserOutlined />}
                    />
                    <Space direction="vertical" size={0}>
                        <span className="font-semibold">
                            {record.first_name} {record.middle_name} {record.last_name}
                        </span>
                        <span className="text-gray-500">#{record.registration_number}</span>
                        <Space>
                            <Badge
                                status={getStatusColor(record.enrollment_status)}
                                text={record.enrollment_status.toUpperCase()}
                            />
                        </Space>
                    </Space>
                </Space>
            ),
            sorter: (a: Student, b: Student) =>
                `${a.first_name} ${a.last_name}`.localeCompare(`${b.first_name} ${b.last_name}`),
        },
        {
            title: 'Contact',
            key: 'contact',
            width: 250,
            render: (record: Student) => (
                <Space direction="vertical" size={0}>
                    <a href={`mailto:${record.email}`}>{record.email}</a>
                    {record.phone && <span>{record.phone}</span>}
                    {record.address && (
                        <Tooltip title="Address">
                            <span className="text-gray-500">{record.address}</span>
                        </Tooltip>
                    )}
                </Space>
            ),
        },
        {
            title: 'Program Details',
            key: 'program',
            width: 200,
            render: (record: Student) => (
                <Space direction="vertical" size={0}>
                    <span className="text-gray-500">
                        Admitted: {new Date(record.admission_date).toLocaleDateString()}
                    </span>
                    {record.nationality && <Tag color="blue">{record.nationality}</Tag>}
                </Space>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 150,
            fixed: 'right' as const,
            render: (record: Student) => (
                <Space>
                    <Tooltip title="View Details">
                        <Button type="text" icon={<EyeOutlined />} onClick={() => onView(record)} />
                    </Tooltip>
                    <Tooltip title="Edit">
                        <Button type="text" icon={<EditOutlined />} onClick={() => onEdit(record)} />
                    </Tooltip>
                    <Popconfirm
                        title="Delete Student"
                        description="Are you sure you want to delete this student?"
                        onConfirm={() => {
                            onDelete(record.student_id);
                            message.success('Student deleted successfully');
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

    const expandedRowRender = (record: Student) => (
        <div className="p-4 bg-gray-50">
            <Space direction="vertical" size="middle" className="w-full">
                <div>
                    <h4 className="font-semibold mb-2">Emergency Contact</h4>
                    {record.emergency_contact_name && (
                        <Space direction="vertical" size={0}>
                            <span>{record.emergency_contact_name} ({record.emergency_contact_relationship})</span>
                            <span>{record.emergency_contact_phone}</span>
                        </Space>
                    )}
                </div>
                <div>
                    <h4 className="font-semibold mb-2">Identification</h4>
                    <Space direction="vertical" size={0}>
                        {record.national_id && <span>National ID: {record.national_id}</span>}
                        {record.passport_number && <span>Passport: {record.passport_number}</span>}
                    </Space>
                </div>
            </Space>
        </div>
    );

    return (
        <Table
            columns={columns}
            dataSource={data}
            loading={loading}
            rowKey="student_id"
            expandable={{
                expandedRowRender,
                expandedRowKeys,
                onExpand: (expanded, record) => {
                    setExpandedRowKeys(
                        expanded
                            ? [...expandedRowKeys, record.student_id]
                            : expandedRowKeys.filter(key => key !== record.student_id)
                    );
                }
            }}
            pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total) => `Total ${total} students`,
            }}
            scroll={{ x: 900 }}
            className="shadow-sm rounded-lg"
        />
    );
};

export default StudentTable;