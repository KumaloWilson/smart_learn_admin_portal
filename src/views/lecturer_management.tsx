import React, { useState } from 'react';
import { Layout, Typography, Button, message, Modal, Drawer, Input, Select, Space, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { lecturerApi } from '../services/lecturer_services/api';
import { schoolApi } from '../services/school_services/api';
import { departmentApi } from '../services/department_services/api';
import LecturerTable from '../components/lecturer/lecturer_table';
import LecturerForm from '../components/lecturer/lecturer_form';
import LecturerDetails from '../components/lecturer/lecturer_details';
import type { Lecturer } from '../models/lecturer';
import type { School } from '../models/school';
import type { Department } from '../models/department';

const { Content, Header } = Layout;
const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;

const LecturerManagement: React.FC = () => {
    // State declarations
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedLecturer, setSelectedLecturer] = useState<Lecturer | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [selectedSchool, setSelectedSchool] = useState<string>();
    const [selectedDepartment, setSelectedDepartment] = useState<string>();
    const queryClient = useQueryClient();

    // Queries
    const { data: lecturers = [], isLoading } = useQuery(
        'lecturers',
        lecturerApi.getAllLecturers
    );

    const { data: schools = [] } = useQuery('schools', schoolApi.getAllSchools);

    const { data: departments = [] } = useQuery(
        ['departments', selectedSchool],
        () => selectedSchool ? departmentApi.getDepartmentsBySchool(selectedSchool) : [],
        { enabled: !!selectedSchool }
    );

    // Filtered lecturers based on search and filters
    const filteredLecturers = lecturers.filter((lecturer: Lecturer) => {
        const matchesSearch = searchText ? (lecturer.first_name.toLowerCase().includes(searchText.toLowerCase()) || lecturer.last_name.toLowerCase().includes(searchText.toLowerCase())) : true;
        const matchesDepartment = selectedDepartment ? lecturer.primary_department_id === selectedDepartment : true;
        return matchesSearch && matchesDepartment;
    });

    // Mutations
    const createMutation = useMutation(lecturerApi.createLecturer, {
        onSuccess: () => {
            queryClient.invalidateQueries('lecturers');
            message.success('Lecturer created successfully');
            setIsDrawerOpen(false);
        },
        onError: () => {
            message.error('Failed to create lecturer');
        },
    });

    const updateMutation = useMutation(
        ({ id, data }: { id: string; data: Partial<Lecturer> }) =>
            lecturerApi.updateLecturer(id, data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('lecturers');
                message.success('Lecturer updated successfully');
                setIsDrawerOpen(false);
            },
            onError: () => {
                message.error('Failed to update lecturer');
            },
        }
    );

    const deleteMutation = useMutation(lecturerApi.deleteLecturer, {
        onSuccess: () => {
            queryClient.invalidateQueries('lecturers');
            message.success('Lecturer deleted successfully');
        },
        onError: () => {
            message.error('Failed to delete lecturer');
        },
    });

    // Handlers
    const handleSubmit = async (values: Partial<Lecturer>) => {
        try {
            if (selectedLecturer) {
                await updateMutation.mutateAsync({
                    id: selectedLecturer.lecturer_id,
                    data: values,
                });
            } else {
                const filteredValues = Object.fromEntries(
                    Object.entries(values).filter(([, v]) => v !== undefined)
                ) as Omit<Lecturer, 'lecturer'>;
                await createMutation.mutateAsync(filteredValues);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const showDrawer = (lecturer?: Lecturer) => {
        setSelectedLecturer(lecturer || null);
        setIsDrawerOpen(true);
    };

    const showViewModal = (lecturer: Lecturer) => {
        setSelectedLecturer(lecturer);
        setIsViewModalOpen(true);
    };

    const handleSchoolChange = (value: string) => {
        setSelectedSchool(value);
        setSelectedDepartment(undefined);
    };

    return (
        <Layout className="min-h-screen bg-gray-50">
            <Header className="bg-white shadow-sm px-8 flex items-center justify-between">
                <Title level={3} className="!mb-0 text-blue-900">Lecturer Management System</Title>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => showDrawer()}
                    className="bg-blue-600 hover:bg-blue-700"
                >
                    Add Lecturer
                </Button>
            </Header>

            <Content className="p-8">
                <Card className="mb-6 shadow-sm">
                    <Space size="large" className="w-full">
                        <Search
                            placeholder="Search lecturers..."
                            allowClear
                            onChange={e => setSearchText(e.target.value)}
                            style={{ width: 300 }}
                            className="flex-grow"
                        />
                        <Select
                            placeholder="Select School"
                            style={{ width: 250 }}
                            onChange={handleSchoolChange}
                            value={selectedSchool}
                            allowClear
                        >
                            {schools.map((school: School) => (
                                <Option key={school.school_id} value={school.school_id}>
                                    {school.school_name}
                                </Option>
                            ))}
                        </Select>
                        <Select
                            placeholder="Select Department"
                            style={{ width: 250 }}
                            onChange={setSelectedDepartment}
                            value={selectedDepartment}
                            disabled={!selectedSchool}
                            allowClear
                        >
                            {departments.map((department: Department) => (
                                <Option key={department.department_id} value={department.department_id}>
                                    {department.department_name}
                                </Option>
                            ))}
                        </Select>
                    </Space>
                </Card>

                <Card className="shadow-sm">
                    <LecturerTable
                        data={filteredLecturers}
                        loading={isLoading}
                        onEdit={showDrawer}
                        onView={showViewModal}
                        onDelete={(id) => deleteMutation.mutate(id)}
                    />
                </Card>

                <Drawer
                    title={selectedLecturer ? 'Edit Lecturer' : 'Add New Lecturer'}
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
                    <LecturerForm
                        initialValues={selectedLecturer || undefined}
                        onSubmit={handleSubmit}
                    />
                </Drawer>

                <Modal
                    title="Lecturer Details"
                    open={isViewModalOpen}
                    onCancel={() => setIsViewModalOpen(false)}
                    footer={null}
                    width={800}
                >
                    {selectedLecturer && (
                        <LecturerDetails
                            lecturer={selectedLecturer}
                            onEdit={() => {
                                setIsViewModalOpen(false);
                                showDrawer(selectedLecturer);
                            }}
                        />
                    )}
                </Modal>
            </Content>
        </Layout>
    );
};

export default LecturerManagement;