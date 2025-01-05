import React from 'react';
import { Table, Tag, Space, Button, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import type { Lecturer } from '../../models/lecturer';

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
    const columns = [
        {
            title: 'Lecturer ID',
            dataIndex: 'lecturer_id',
            key: 'lecturer_id',
            sorter: (a: Lecturer, b: Lecturer) => a.lecturer_id.localeCompare(b.lecturer_id),
        },
        {
            title: 'Name',
            key: 'name',
            render: (_: unknown, record: Lecturer) => `${record.first_name} ${record.last_name}`,
            sorter: (a: Lecturer, b: Lecturer) => `${a.first_name} ${a.last_name}`.localeCompare(`${b.first_name} ${b.last_name}`),
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
            render: (nationality: string) => <Tag color="blue">{nationality}</Tag>,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: unknown, record: Lecturer) => (
                <Space size="middle">
                    <Button type="text" icon={<EyeOutlined />} onClick={() => onView(record)} />
                    <Button type="text" icon={<EditOutlined />} onClick={() => onEdit(record)} />
                    <Popconfirm
                        title="Are you sure you want to delete this lecturer?"
                        onConfirm={() => {
                            onDelete(record.lecturer_id);
                            message.success('Lecturer deleted successfully');
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
            rowKey="lecturer_id"
            pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total) => `Total ${total} lecturers`,
            }}
        />
    );
};

export default LecturerTable;
