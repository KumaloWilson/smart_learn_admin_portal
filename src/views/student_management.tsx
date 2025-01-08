import React, { useState } from 'react';
import { Layout, Typography, Button, message, Drawer, Input, Select, Space, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { studentApi } from '../services/student_services/api';
import { schoolApi } from '../services/school_services/api';
import { programApi } from '../services/program_services/api';
import StudentTable from '../components/student/student_table';
import StudentForm from '../components/student/student_form';
import StudentDetails from '../components/student/student_details';
import type { Student } from '../models/student';
import type { School } from '../models/school';
import type { Program } from '../models/program';

const { Content, Header } = Layout;
const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;

const StudentManagement: React.FC = () => {
    // State declarations
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [selectedSchool, setSelectedSchool] = useState<string>();
    const [selectedProgram, setSelectedProgram] = useState<string>();
    const queryClient = useQueryClient();

    // Queries
    const { data: students = [], isLoading } = useQuery('students', studentApi.getAllStudents);
    const { data: schools = [] } = useQuery('schools', schoolApi.getAllSchools);
    const { data: programs = [] } = useQuery(
        ['programs', selectedSchool],
        () => selectedSchool ? programApi.getProgramsBySchool(selectedSchool) : [],
        { enabled: !!selectedSchool }
    );

    // Filtered students based on search and filters
    const filteredStudents = students.filter((student: Student) => {
        const matchesSearch = searchText ? (student.first_name.toLowerCase().includes(searchText.toLowerCase()) || student.last_name.toLowerCase().includes(searchText.toLowerCase()) || student.student_id.toLowerCase().includes(searchText.toLowerCase())) : true;
        const matchesProgram = selectedProgram ? student.current_program_id === selectedProgram : true;
        return matchesSearch && matchesProgram;
    });

    // Mutations
    const createMutation = useMutation(studentApi.createStudent, {
        onSuccess: () => {
            queryClient.invalidateQueries('students');
            message.success('Student created successfully');
            setIsDrawerOpen(false);
        },
        onError: () => {
            message.error('Failed to create student');
        },
    });

    const updateMutation = useMutation(
        ({ id, data }: { id: string; data: Partial<Student> }) =>
            studentApi.updateStudent(id, data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('students');
                message.success('Student updated successfully');
                setIsDrawerOpen(false);
            },
            onError: () => {
                message.error('Failed to update student');
            },
        }
    );

    const deleteMutation = useMutation(studentApi.deleteStudent, {
        onSuccess: () => {
            queryClient.invalidateQueries('students');
            message.success('Student deleted successfully');
        },
        onError: () => {
            message.error('Failed to delete student');
        },
    });

    // Handlers
    const handleSubmit = async (values: Partial<Student>) => {
        try {
            if (selectedStudent) {
                await updateMutation.mutateAsync({
                    id: selectedStudent.student_id,
                    data: values,
                });
            } else {
                const filteredValues = Object.fromEntries(
                    Object.entries(values).filter(([, v]) => v !== undefined)
                ) as Omit<Student, 'student_id'>;
                await createMutation.mutateAsync(filteredValues);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const showDrawer = (student?: Student) => {
        setSelectedStudent(student || null);
        setIsDrawerOpen(true);
    };

    const showViewModal = (student: Student) => {
        setSelectedStudent(student);
        setIsViewModalOpen(true);
    };

    const handleSchoolChange = (value: string) => {
        setSelectedSchool(value);
        setSelectedProgram(undefined);
    };

    return (
        <Layout className="min-h-screen bg-gray-50">
            <Header className="bg-white shadow-sm px-8 flex items-center justify-between">
                <Title level={3} className="!mb-0 text-blue-900">Student Management System</Title>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => showDrawer()}
                    className="bg-blue-600 hover:bg-blue-700"
                >
                    Add Student
                </Button>
            </Header>

            <Content className="p-8">
                <Card className="mb-6 shadow-sm">
                    <Space size="large" className="w-full">
                        <Search
                            placeholder="Search students..."
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
                            placeholder="Select Program"
                            style={{ width: 250 }}
                            onChange={setSelectedProgram}
                            value={selectedProgram}
                            disabled={!selectedSchool}
                            allowClear
                        >
                            {programs.map((program: Program) => (
                                <Option key={program.program_id} value={program.program_id}>
                                    {program.program_name}
                                </Option>
                            ))}
                        </Select>
                    </Space>
                </Card>

                <Card className="shadow-sm">
                    <StudentTable
                        data={filteredStudents}
                        loading={isLoading}
                        onEdit={showDrawer}
                        onView={showViewModal}
                        onDelete={(id) => deleteMutation.mutate(id)}
                    />
                </Card>

                <Drawer
                    title={selectedStudent ? 'Edit Student' : 'Add New Student'}
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
                    <StudentForm
                        initialValues={selectedStudent || undefined}
                        onFinish={handleSubmit}
                    />
                </Drawer>

                <Drawer
                    title="Student Details"
                    open={isViewModalOpen}
                    onClose={() => setIsViewModalOpen(false)}
                    footer={null}
                    width={1200}
                >
                    {selectedStudent && <StudentDetails student={selectedStudent} onEdit={function (): void {
                        throw new Error('Function not implemented.');
                    }} />}
                </Drawer>
            </Content>
        </Layout>
    );
};

export default StudentManagement;