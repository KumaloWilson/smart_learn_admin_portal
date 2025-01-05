import React, { useState } from 'react';
import { Layout, Typography, Button, message, Modal, Drawer } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { studentApi } from '../services/student_services/api';
import StudentTable from '../components/student/student_table';
import StudentForm from '../components/student/student_form';
import StudentDetails from '../components/student/student_details';
import type { Student } from '../models/student';

const { Content, Header } = Layout;
const { Title } = Typography;

const StudentManagement: React.FC = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const queryClient = useQueryClient();

    const { data: students = [], isLoading } = useQuery('students', studentApi.getAllStudents);

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

    const handleSubmit = async (values: Partial<Student>) => {
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
    };

    const showDrawer = (student?: Student) => {
        setSelectedStudent(student || null);
        setIsDrawerOpen(true);
    };

    const showViewModal = (student: Student) => {
        setSelectedStudent(student);
        setIsViewModalOpen(true);
    };

    return (
        <Layout className="min-h-screen">
            <Header className="bg-white shadow-md px-8 flex items-center justify-between">
                <Title level={3} className="!mb-0">Student Management System</Title>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => showDrawer()}
                >
                    Add Student
                </Button>
            </Header>

            <Content className="p-8">
                <StudentTable
                    data={students}
                    loading={isLoading}
                    onEdit={showDrawer}
                    onView={showViewModal}
                    onDelete={(id) => deleteMutation.mutate(id)}
                />

                <Drawer
                    title={selectedStudent ? 'Edit Student' : 'Add New Student'}
                    width={720}
                    onClose={() => setIsDrawerOpen(false)}
                    open={isDrawerOpen}
                    extra={
                        <Button type="primary" onClick={() => handleSubmit}>
                            Submit
                        </Button>
                    }
                >
                    <StudentForm initialValues={selectedStudent || undefined} />
                </Drawer>

                <Modal
                    title="Student Details"
                    open={isViewModalOpen}
                    onCancel={() => setIsViewModalOpen(false)}
                    footer={null}
                    width={800}
                >
                    {selectedStudent && <StudentDetails student={selectedStudent} />}
                </Modal>
            </Content>
        </Layout>
    );
}


export default StudentManagement;