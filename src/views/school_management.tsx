import React, { useState } from 'react';
import { Layout, Typography, Button, message, Drawer, Input, Space, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { schoolApi } from '../services/school_services/api';
import SchoolTable from '../components/school/school_table';
import SchoolForm from '../components/school/school_form';
import SchoolDetails from '../components/school/school_details';
import type { School } from '../models/school';

const { Content, Header } = Layout;
const { Title } = Typography;
const { Search } = Input;

const SchoolManagement: React.FC = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const queryClient = useQueryClient();

    const { data: schools = [], isLoading } = useQuery(
        'schools',
        schoolApi.getAllSchools,
    );

    const filteredSchools = schools.filter((school: School) =>
        searchText ? (
            school.school_name.toLowerCase().includes(searchText.toLowerCase()) ||
            school.school_code?.toLowerCase().includes(searchText.toLowerCase())
        ) : true
    );

    const createMutation = useMutation(schoolApi.createSchool, {
        onSuccess: () => {
            queryClient.invalidateQueries('schools');
            message.success('School created successfully');
            setIsDrawerOpen(false);
        },
        onError: (error) => {
            console.error(error);
            message.error('Failed to create school');
        }
    });

    const updateMutation = useMutation(
        ({ id, data }: { id: string; data: Partial<School> }) =>
            schoolApi.updateSchool(id, data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('schools');
                message.success('School updated successfully');
                setIsDrawerOpen(false);
            },
            onError: () => {
                message.error('Failed to update school');
            }
        }
    );

    const deleteMutation = useMutation(schoolApi.deleteSchool, {
        onSuccess: () => {
            queryClient.invalidateQueries('schools');
            message.success('School deleted successfully');
        },
        onError: () => {
            message.error('Failed to update school');
        }
    });

    const handleSubmit = async (values: Partial<School>) => {
        try {
            if (selectedSchool) {
                await updateMutation.mutateAsync({
                    id: selectedSchool.school_id,
                    data: values,
                });
            } else {
                const filteredValues = Object.fromEntries(
                    Object.entries(values).filter(([, v]) => v !== undefined)
                ) as Omit<School, 'school'>;
                await createMutation.mutateAsync(filteredValues);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };


    const showDrawer = (school?: School) => {
        setSelectedSchool(school || null);
        setIsDrawerOpen(true);
    };

    const showViewModal = (school: School) => {
        setSelectedSchool(school);
        setIsViewModalOpen(true);
    };

    return (
        <Layout className="min-h-screen bg-gray-50">
            <Header className="bg-white shadow-sm px-8 flex items-center justify-between">
                <Title level={3} className="!mb-0 text-blue-900">School Management System</Title>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => showDrawer()}
                    className="bg-blue-600 hover:bg-blue-700"
                >
                    Add School
                </Button>
            </Header>

            <Content className="p-8">
                <Card className="mb-6 shadow-sm">
                    <Space size="large" className="w-full">
                        <Search
                            placeholder="Search by school name or code..."
                            allowClear
                            onChange={e => setSearchText(e.target.value)}
                            style={{ width: 300 }}
                            className="flex-grow"
                        />
                    </Space>
                </Card>

                <Card className="shadow-sm">
                    <SchoolTable
                        data={filteredSchools}
                        loading={isLoading}
                        onEdit={showDrawer}
                        onView={showViewModal}
                        onDelete={(id) => deleteMutation.mutate(id)}
                    />
                </Card>

                <Drawer
                    title={selectedSchool ? 'Edit School' : 'Add New School'}
                    width={720}
                    onClose={() => setIsDrawerOpen(false)}
                    open={isDrawerOpen}
                    extra={
                        <Button
                            type="primary"
                            onClick={() => {
                                const form = document.querySelector('form');
                                if (form) form.requestSubmit();
                            }}
                        >
                            Submit
                        </Button>
                    }
                >
                    <SchoolForm
                        initialValues={selectedSchool || undefined}
                        onSubmit={handleSubmit}
                    />
                </Drawer>

                <Drawer
                    title="School Details"
                    open={isViewModalOpen}
                    onClose={() => setIsViewModalOpen(false)}
                    footer={null}
                    width={1200}
                >
                    {selectedSchool && (
                        <SchoolDetails
                            school={selectedSchool}
                            onEdit={() => {
                                setIsViewModalOpen(false);
                                showDrawer(selectedSchool);
                            }}
                        />
                    )}
                </Drawer>
            </Content>
        </Layout>
    );
};

export default SchoolManagement;