import React, { useState } from 'react';
import { Table, Tag, Space, Button, Popconfirm, message, Tooltip, Badge } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined, BookOutlined } from '@ant-design/icons';
import type { Course } from '../../models/course';
import { ColumnGroupType, ColumnType } from 'antd/es/table';

interface CourseTableProps {
    data: Course[];
    loading: boolean;
    onEdit: (course: Course) => void;
    onView: (course: Course) => void;
    onDelete: (courseId: string) => void;
}

const CourseTable: React.FC<CourseTableProps> = ({
    data,
    loading,
    onEdit,
    onView,
    onDelete,
}) => {
    const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);

    const getStatusColor = (status?: Course['status']): "success" | "warning" | "default" => {
        const colors: Record<string, "success" | "warning" | "default"> = {
            active: 'success',
            inactive: 'warning'
        };
        return status ? colors[status] : 'default';
    };

    const getSemesterColor = (semester?: Course['semester_offered']) => {
        const colors: Record<string, string> = {
            fall: 'orange',
            spring: 'green',
            summer: 'blue',
            all: 'purple'
        };
        return semester ? colors[semester] : 'default';
    };

    const columns: (ColumnGroupType<Course> | ColumnType<Course>)[] = [
        {
            title: 'Course Info',
            key: 'courseInfo',
            width: 300,
            fixed: 'left' as const,
            render: (record: Course) => (
                <Space>
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
                        <BookOutlined className="text-xl text-blue-600" />
                    </div>
                    <Space direction="vertical" size={0}>
                        <Space>
                            <span className="font-semibold">{record.course_code}</span>
                            <Badge
                                status={getStatusColor(record.status)}
                                text={record.status?.toUpperCase() || 'N/A'}
                            />
                        </Space>
                        <span className="text-base">{record.course_name}</span>
                        <Space>
                            <Tag color="blue">Level {record.course_level}</Tag>
                            {record.is_elective && <Tag color="purple">Elective</Tag>}
                        </Space>
                    </Space>
                </Space>
            ),
            sorter: (a: Course, b: Course) => a.course_name.localeCompare(b.course_name),
        },
        {
            title: 'Course Details',
            key: 'courseDetails',
            width: 200,
            render: (record: Course) => (
                <Space direction="vertical" size={0}>
                    <Tag color={getSemesterColor(record.semester_offered)}>
                        {record.semester_offered?.toUpperCase() || 'Not Specified'}
                    </Tag>
                    <span>Credits: {record.credit_hours || 'N/A'}</span>
                    <span>Phase: {record.phase || 'N/A'}</span>
                </Space>
            ),
            filters: [
                { text: 'Fall', value: 'fall' },
                { text: 'Spring', value: 'spring' },
                { text: 'Summer', value: 'summer' },
                { text: 'All', value: 'all' }
            ],
        },
        {
            title: 'Academic Info',
            key: 'academicInfo',
            width: 200,
            render: (record: Course) => (
                <Space direction="vertical" size={0}>
                    <Tooltip title="Prerequisites">
                        <span className="text-gray-600">
                            {record.prerequisites || 'No prerequisites'}
                        </span>
                    </Tooltip>
                    {record.program_id && (
                        <span className="text-gray-500">Program ID: {record.program_id}</span>
                    )}
                </Space>
            ),
        },
        {
            title: 'Status',
            key: 'status',
            width: 150,
            render: (record: Course) => (
                <Space direction="vertical" size={0}>
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
            render: (record: Course) => (
                <Space>
                    <Tooltip title="View Details">
                        <Button type="text" icon={<EyeOutlined />} onClick={() => onView(record)} />
                    </Tooltip>
                    <Tooltip title="Edit">
                        <Button type="text" icon={<EditOutlined />} onClick={() => onEdit(record)} />
                    </Tooltip>
                    <Popconfirm
                        title="Delete Course"
                        description="Are you sure you want to delete this course?"
                        onConfirm={() => {
                            onDelete(record.course_id);
                            message.success('Course deleted successfully');
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

    const expandedRowRender = (record: Course) => (
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
                        <h4 className="font-semibold mb-2">Course Details</h4>
                        <ul className="space-y-2">
                            <li>Course Code: {record.course_code}</li>
                            <li>Credit Hours: {record.credit_hours}</li>
                            <li>Level: {record.course_level}</li>
                            <li>Phase: {record.phase}</li>
                            <li>Type: {record.is_elective ? 'Elective' : 'Core'}</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">Additional Information</h4>
                        <ul className="space-y-2">
                            <li>Prerequisites: {record.prerequisites || 'None'}</li>
                            <li>Semester: {record.semester_offered?.toUpperCase() || 'Not specified'}</li>
                            <li>Status: {record.status?.toUpperCase() || 'Not specified'}</li>
                            {record.syllabus_path && (
                                <li>
                                    <a href={record.syllabus_path} target="_blank" rel="noopener noreferrer">
                                        View Syllabus
                                    </a>
                                </li>
                            )}
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
            rowKey="course_id"
            expandable={{
                expandedRowRender,
                expandedRowKeys,
                onExpand: (expanded, record) => {
                    setExpandedRowKeys(
                        expanded
                            ? [...expandedRowKeys, record.course_id]
                            : expandedRowKeys.filter(key => key !== record.course_id)
                    );
                }
            }}
            pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total) => `Total ${total} courses`,
            }}
            scroll={{ x: 900 }}
            className="shadow-sm rounded-lg"
        />
    );
};

export default CourseTable;