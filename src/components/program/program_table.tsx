import React, { useState } from 'react';
import { Table, Tag, Space, Button, Popconfirm, message, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import type { Program } from '../../models/program';

interface ProgramTableProps {
    data: Program[];
    loading: boolean;
    onEdit: (program: Program) => void;
    onView: (program: Program) => void;
    onDelete: (programId: string) => void;
}

const ProgramTable: React.FC<ProgramTableProps> = ({
    data,
    loading,
    onEdit,
    onView,
    onDelete,
}) => {
    const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);

    const getDegreeLevelColor = (level: Program['degree_level']) => {
        const colors: Record<Required<Program>['degree_level'], string> = {
            certificate: 'blue',
            diploma: 'cyan',
            bachelor: 'green',
            master: 'purple',
            doctorate: 'magenta'
        };
        return level ? colors[level] : 'defaultColor';
    };

    const getStatusColor = (status: Program['status']) => {
        return status === 'active' ? 'success' : 'error';
    };

    const columns = [
        {
            title: 'Program Details',
            key: 'details',
            width: 300,
            fixed: 'left' as const,
            render: (record: Program) => (
                <Space direction="vertical" size={0}>
                    <span className="font-semibold">{record.program_name}</span>
                    <span className="text-gray-500">#{record.program_code}</span>
                    <Space>
                        {record.degree_level && (
                            <Tag color={getDegreeLevelColor(record.degree_level)}>
                                {record.degree_level.toUpperCase()}
                            </Tag>
                        )}
                        <Tag color={getStatusColor(record.status)}>
                            {record.status?.toUpperCase()}
                        </Tag>
                    </Space>
                </Space>
            ),
            sorter: (a: Program, b: Program) =>
                a.program_name.localeCompare(b.program_name),
        },
        {
            title: 'Duration & Credits',
            key: 'duration',
            width: 200,
            render: (record: Program) => (
                <Space direction="vertical" size={0}>
                    {record.duration_years && (
                        <span>Duration: {record.duration_years} years</span>
                    )}
                    {record.credit_hours && (
                        <span>Credits: {record.credit_hours} hours</span>
                    )}
                </Space>
            ),
        },
        {
            title: 'Accreditation',
            key: 'accreditation',
            width: 200,
            render: (record: Program) => (
                <Space direction="vertical" size={0}>
                    {record.accreditation_status && (
                        <Tag color="green">{record.accreditation_status}</Tag>
                    )}
                </Space>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 150,
            fixed: 'right' as const,
            render: (record: Program) => (
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
                        title="Delete Program"
                        description="Are you sure you want to delete this program?"
                        onConfirm={() => {
                            onDelete(record.program_id);
                            message.success('Program deleted successfully');
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

    const expandedRowRender = (record: Program) => (
        <div className="p-4 bg-gray-50">
            <Space direction="vertical" size="middle" className="w-full">
                <div>
                    <h4 className="font-semibold mb-2">Program Description</h4>
                    <p>{record.description || 'No description available'}</p>
                </div>
                <div>
                    <h4 className="font-semibold mb-2">Entry Requirements</h4>
                    <p>{record.entry_requirements || 'No entry requirements specified'}</p>
                </div>
            </Space>
        </div>
    );

    return (
        <Table
            columns={columns}
            dataSource={data}
            loading={loading}
            rowKey="program_id"
            expandable={{
                expandedRowRender,
                expandedRowKeys,
                onExpand: (expanded, record) => {
                    setExpandedRowKeys(
                        expanded
                            ? [...expandedRowKeys, record.program_id]
                            : expandedRowKeys.filter(key => key !== record.program_id)
                    );
                }
            }}
            pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total) => `Total ${total} programs`,
            }}
            scroll={{ x: 900 }}
            className="shadow-sm rounded-lg"
        />
    );
};

export default ProgramTable;