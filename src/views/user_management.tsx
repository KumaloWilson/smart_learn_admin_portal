import React, { useState } from 'react';
import { Layout, Typography, Button, Modal, message, Drawer } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { adminApi } from '../services/admin_services/api';
import AdminTable from '../components/admin/admin_table';
import AdminForm from '../components/admin/admin_form';
import AdminDetails from '../components/admin/admin_details';
import type { Admin } from '../models/admin';

const { Content, Header } = Layout;
const { Title } = Typography;

const AdminManagement: React.FC = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const queryClient = useQueryClient();

    const { data: admins = [], isLoading } = useQuery('admins', adminApi.getAllAdmins);

    const createMutation = useMutation(adminApi.createAdmin, {
        onSuccess: () => {
            queryClient.invalidateQueries('admins');
            message.success('Admin created successfully');
            setIsDrawerOpen(false);
        },
        onError: () => {
            message.error('Failed to create admin');
        },
    });

    const updateMutation = useMutation(
        ({ id, data }: { id: string; data: Partial<Admin> }) =>
            adminApi.updateAdmin(id, data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('admins');
                message.success('Admin updated successfully');
                setIsDrawerOpen(false);
            },
            onError: () => {
                message.error('Failed to update admin');
            },
        }
    );

    const deleteMutation = useMutation(adminApi.deleteAdmin, {
        onSuccess: () => {
            queryClient.invalidateQueries('admins');
            message.success('Admin deleted successfully');
        },
        onError: () => {
            message.error('Failed to delete admin');
        },
    });

    const handleSubmit = async (values: Partial<Admin>) => {
        if (selectedAdmin) {
            await updateMutation.mutateAsync({
                id: selectedAdmin.admin_id,
                data: values,
            });
        } else {
            const filteredValues = Object.fromEntries(
                Object.entries(values).filter(([, v]) => v !== undefined)
            ) as Omit<Admin, 'id'>;
            await createMutation.mutateAsync(filteredValues);
        }
    };

    const showDrawer = (admin: Admin | null = null) => {
        setSelectedAdmin(admin || null);
        setIsDrawerOpen(true);
    };

    const showViewModal = (admin: Admin) => {
        setSelectedAdmin(admin);
        setIsViewModalOpen(true);
    };

    const handleEdit = () => {
        setIsViewModalOpen(false);
        showDrawer(selectedAdmin || null);
    };

    return (
        <Layout className="min-h-screen">
            <Header className="bg-white shadow-md px-8 flex items-center justify-between">
                <Title level={3} className="!mb-0">Admin Management</Title>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => showDrawer()}
                >
                    Add Admin
                </Button>
            </Header>

            <Content className="p-8">
                <AdminTable
                    data={admins}
                    loading={isLoading}
                    onEdit={showDrawer}
                    onView={showViewModal}
                    onDelete={(id) => deleteMutation.mutate(id)}
                />

                <Drawer
                    title={selectedAdmin ? 'Edit Admin' : 'Add New Admin'}
                    width={720}
                    onClose={() => setIsDrawerOpen(false)}
                    open={isDrawerOpen}
                    extra={
                        <Button type="primary" onClick={() => handleSubmit(selectedAdmin || {})}>
                            Submit
                        </Button>
                    }
                >
                    <AdminForm initialValues={selectedAdmin || undefined} onSubmit={function (): void {
                        throw new Error('Function not implemented.');
                    }} />
                </Drawer>

                <Modal
                    title="Admin Details"
                    open={isViewModalOpen}
                    onCancel={() => setIsViewModalOpen(false)}
                    footer={null}
                    width={800}
                >
                    {selectedAdmin && <AdminDetails admin={selectedAdmin} onEdit={handleEdit} />}
                </Modal>
            </Content>
        </Layout>
    );
};

export default AdminManagement;
