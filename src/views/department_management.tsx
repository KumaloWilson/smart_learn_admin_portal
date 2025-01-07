import React, { useState } from 'react';
import { Layout, Typography, Button, message, Drawer, Input, Select, Space, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { departmentApi } from '../services/department_services/api';
import { schoolApi } from '../services/school_services/api';
import DepartmentTable from '../components/department/department_table';
import DepartmentForm from '../components/department/department_form';
import DepartmentDetails from '../components/department/department_details';
import type { Department } from '../models/department';
import type { School } from '../models/school';

const { Content, Header } = Layout;
const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;

const DepartmentManagement: React.FC = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [selectedSchool, setSelectedSchool] = useState<string>();
    const queryClient = useQueryClient();

    const { data: departments = [], isLoading } = useQuery(
        ['departments', selectedSchool],
        () => selectedSchool ?
            departmentApi.getDepartmentsBySchool(selectedSchool) :
            departmentApi.getAllDepartments()
    );

    const { data: schools = [] } = useQuery('schools', schoolApi.getAllSchools);

    const filteredDepartments = departments.filter((dept: Department) =>
        searchText ? (
            dept.department_name.toLowerCase().includes(searchText.toLowerCase()) ||
            dept.department_code?.toLowerCase().includes(searchText.toLowerCase())
        ) : true
    );

    const createMutation = useMutation(departmentApi.createDepartment, {
        onSuccess: () => {
            queryClient.invalidateQueries('departments');
            message.success('Department created successfully');
            setIsDrawerOpen(false);
        },
        onError: () => {
            message.error('Failed to create department');
        }
    });

    const updateMutation = useMutation(
        ({ id, data }: { id: string; data: Partial<Department> }) =>
            departmentApi.updateDepartment(id, data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('departments');
                message.success('Department updated successfully');
                setIsDrawerOpen(false);
            },
            onError: () => { message.error('Failed to update department'); }
        }
    );

    const deleteMutation = useMutation(departmentApi.deleteDepartment, {
        onSuccess: () => {
            queryClient.invalidateQueries('departments');
            message.success('Department deleted successfully');
        },
        onError: () => {
            message.error('Failed to delete department');
        }
    });

    const handleSubmit = async (values: Omit<Department, 'department_id'>) => {
        try {
            if (selectedDepartment) {
                await updateMutation.mutateAsync({
                    id: selectedDepartment.department_id,
                    data: values
                });
            } else {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { department_id, ...filteredValues } = values as Department;
                await createMutation.mutateAsync({
                    ...filteredValues,
                    school_id: selectedSchool as string,
                    department_id: ''
                });
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <Layout className="min-h-screen bg-gray-50">
            <Header className="bg-white shadow-sm px-8 flex items-center justify-between">
                <Title level={3} className="!mb-0 text-blue-900">Department Management</Title>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setIsDrawerOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700"
                    disabled={!selectedSchool}
                >
                    Add Department
                </Button>
            </Header>

            <Content className="p-8">
                <Card className="mb-6 shadow-sm">
                    <Space size="large" className="w-full">
                        <Search
                            placeholder="Search departments..."
                            allowClear
                            onChange={e => setSearchText(e.target.value)}
                            style={{ width: 300 }}
                        />
                        <Select
                            placeholder="Select School"
                            style={{ width: 200 }}
                            onChange={setSelectedSchool}
                            value={selectedSchool}
                            allowClear
                        >
                            {schools.map((school: School) => (
                                <Option key={school.school_id} value={school.school_id}>
                                    {school.school_name}
                                </Option>
                            ))}
                        </Select>
                    </Space>
                </Card>

                <Card className="shadow-sm">
                    <DepartmentTable
                        data={filteredDepartments}
                        loading={isLoading}
                        onEdit={setSelectedDepartment}
                        onView={(dept) => {
                            setSelectedDepartment(dept);
                            setIsViewModalOpen(true);
                        }}
                        onDelete={(id) => deleteMutation.mutate(id)}
                    />
                </Card>

                <Drawer
                    title={selectedDepartment ? 'Edit Department' : 'Add New Department'}
                    width={720}
                    onClose={() => {
                        setIsDrawerOpen(false);
                        setSelectedDepartment(null);
                    }}
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
                    <DepartmentForm
                        initialValues={selectedDepartment || undefined}
                        onSubmit={handleSubmit}
                        selectedSchool={selectedSchool}
                    />
                </Drawer>

                <Drawer
                    title="Department Details"
                    open={isViewModalOpen}
                    onClose={() => {
                        setIsViewModalOpen(false);
                        setSelectedDepartment(null);
                    }}
                    footer={null}
                    width={800}
                >
                    {selectedDepartment && (
                        <DepartmentDetails
                            department={selectedDepartment}
                            onEdit={() => {
                                setIsViewModalOpen(false);
                                setIsDrawerOpen(true);
                            }}
                        />
                    )}
                </Drawer>
            </Content>
        </Layout>
    );
};

export default DepartmentManagement;