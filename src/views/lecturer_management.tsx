import React, { useState } from 'react';
import { Layout, Typography, Button, message, Modal, Drawer, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { lecturerApi } from '../services/lecturer_services/api';
import LecturerTable from '../components/lecturer/lecturer_table';
import LecturerForm from '../components/lecturer/lecturer_form';
import LecturerDetails from '../components/lecturer/lecturer_details';
import type { Lecturer } from '../models/lecturer';

const { Content, Header } = Layout;
const { Title } = Typography;

const LecturerManagement: React.FC = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedLecturer, setSelectedLecturer] = useState<Lecturer | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const queryClient = useQueryClient();

    const { data: lecturers = [], isLoading } = useQuery(
        ['lecturers', searchQuery],
        () => lecturerApi.getAllLecturers(),
        {
            enabled: !!searchQuery || searchQuery === '',
        }
    );

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

    const handleSubmit = async (values: Partial<Lecturer>) => {
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
    };

    const showDrawer = (lecturer?: Lecturer) => {
        setSelectedLecturer(lecturer || null);
        setIsDrawerOpen(true);
    };

    const showViewModal = (lecturer: Lecturer) => {
        setSelectedLecturer(lecturer);
        setIsViewModalOpen(true);
    };

    return (
        <Layout className="min-h-screen">
            <Header className="bg-white shadow-md px-8 flex items-center justify-between">
                <Title level={3} className="!mb-0">Lecturer Management</Title>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => showDrawer()}
                >
                    Add Lecturer
                </Button>
            </Header>

            <Content className="p-8">
                <Input.Search
                    placeholder="Search by name or department"
                    onSearch={setSearchQuery}
                    style={{ width: 300, marginBottom: 20 }}
                />

                <LecturerTable
                    data={lecturers}
                    loading={isLoading}
                    onEdit={showDrawer}
                    onView={showViewModal}
                    onDelete={(id) => deleteMutation.mutate(id)}
                />

                <Drawer
                    title={selectedLecturer ? 'Edit Lecturer' : 'Add New Lecturer'}
                    width={720}
                    onClose={() => setIsDrawerOpen(false)}
                    open={isDrawerOpen}
                    extra={
                        <Button type="primary" onClick={() => handleSubmit}>
                            Submit
                        </Button>
                    }
                >
                    <LecturerForm initialValues={selectedLecturer || undefined} />
                </Drawer>

                <Modal
                    title="Lecturer Details"
                    open={isViewModalOpen}
                    onCancel={() => setIsViewModalOpen(false)}
                    footer={null}
                    width={800}
                >
                    {selectedLecturer && <LecturerDetails lecturer={selectedLecturer} onEdit={function (): void {
                        throw new Error('Function not implemented.');
                    }} />}
                </Modal>
            </Content>
        </Layout>
    );
};

export default LecturerManagement;
