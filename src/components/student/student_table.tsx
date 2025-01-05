import React from 'react';
import { Table, Tag, Space, Button, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
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
    const columns = [
        {
            title: 'Student ID',
            dataIndex: 'student_id',
            key: 'student_id',
            sorter: (a: Student, b: Student) => a.student_id.localeCompare(b.student_id),
        },
        {
            title: 'Name',
            key: 'name',
            render: (_: unknown, record: Student) => `${record.title} ${record.first_name} ${record.surname}`,
            sorter: (a: Student, b: Student) => `${a.first_name} ${a.surname}`.localeCompare(`${b.first_name} ${b.surname}`),
        },
        {
            title: 'Email',
            dataIndex: 'email_address',
            key: 'email_address',
        },
        {
            title: 'Nationality',
            dataIndex: 'nationality',
            key: 'nationality',
            render: (nationality: string) => (
                <Tag color="blue">{nationality}</Tag>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: unknown, record: Student) => (
                <Space size="middle">
                    <Button
                        type="text"
                        icon={<EyeOutlined />}
                        onClick={() => onView(record)}
                    />
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => onEdit(record)}
                    />
                    <Popconfirm
                        title="Are you sure you want to delete this student?"
                        onConfirm={() => {
                            onDelete(record.student_id);
                            message.success('Student deleted successfully');
                        }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="text" danger icon={<DeleteOutlined />} />
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
            rowKey="student_id"
            pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total) => `Total ${total} students`,
            }}
        />
    );
};

export default StudentTable;