import React, { useEffect, useState } from 'react';
import { Tabs, Descriptions, Table, Tag, Button, Space, Typography, Card, message } from 'antd';
import { EditOutlined, TeamOutlined } from '@ant-design/icons';
import { departmentApi } from '../../services/department_services/api';
import type { School } from '../../models/school';
import type { Department } from '../../models/department';

const { TabPane } = Tabs;
const { Title } = Typography;

interface SchoolDetailsProps {
    school: School;
    onEdit: () => void;
}

const SchoolDetails: React.FC<SchoolDetailsProps> = ({ school, onEdit }) => {
    const [departments, setDepartments] = useState<Department[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchDepartments = async () => {
            setLoading(true);
            try {
                const data = await departmentApi.getDepartmentsBySchool(school.school_id);
                setDepartments(data);
            } catch (error) {
                console.error('Error fetching departments:', error);
                message.error('Failed to load departments. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        if (school.school_id) {
            fetchDepartments();
        }
    }, [school.school_id]);

    const departmentColumns = [
        { title: 'Name', dataIndex: 'department_name', key: 'department_name' },
        { title: 'Office Location', dataIndex: 'office_location', key: 'office_location' },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <Tag color={status === 'active' ? 'green' : 'red'}>
                    {status?.toUpperCase() || 'UNKNOWN'}
                </Tag>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <Title level={4} className="!mb-0">{school.school_name}</Title>
                <Button type="primary" icon={<EditOutlined />} onClick={onEdit}>
                    Edit School
                </Button>
            </div>

            <Card className="shadow-sm">
                <Descriptions bordered column={2}>
                    <Descriptions.Item label="School Code">{school.school_code}</Descriptions.Item>
                    <Descriptions.Item label="Dean ID">{school.dean_id || 'Not assigned'}</Descriptions.Item>
                    <Descriptions.Item label="Establishment Date">
                        {school.establishment_date ?
                            new Date(school.establishment_date).toLocaleDateString() :
                            'Not specified'
                        }
                    </Descriptions.Item>
                    <Descriptions.Item label="Status">
                        <Tag color={school.status === 'active' ? 'green' : 'red'}>
                            {school.status?.toUpperCase()}
                        </Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Contact Email">{school.contact_email || 'Not specified'}</Descriptions.Item>
                    <Descriptions.Item label="Contact Phone">{school.contact_phone || 'Not specified'}</Descriptions.Item>
                    <Descriptions.Item label="Location" span={2}>
                        {school.building_location || 'Not specified'}
                    </Descriptions.Item>
                    <Descriptions.Item label="Description" span={2}>
                        {school.description || 'No description available'}
                    </Descriptions.Item>
                </Descriptions>
            </Card>

            <Tabs defaultActiveKey="1" className="bg-white rounded-lg shadow-sm p-6">
                <TabPane
                    tab={
                        <Space>
                            <TeamOutlined />
                            Departments
                        </Space>
                    }
                    key="1"
                >
                    <Table
                        columns={departmentColumns}
                        dataSource={departments}
                        loading={loading}
                        pagination={false}
                        rowKey="department_id"
                        className="mt-4"
                    />
                </TabPane>
            </Tabs>
        </div>
    );
};

export default SchoolDetails;
