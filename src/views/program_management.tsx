import React, { useState } from 'react';
import { Layout, Typography, Button, message, Modal, Drawer, Input, Select, Space, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { programApi } from '../services/program_services/api';
import { schoolApi } from '../services/school_services/api';
import ProgramTable from '../components/program/program_table';
import ProgramForm from '../components/program/program_form';
import ProgramDetails from '../components/program/program_details';
import type { Program } from '../models/program';
import type { School } from '../models/school';

const { Content, Header } = Layout;
const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;

const DEGREE_LEVELS = [
    'certificate',
    'diploma',
    'bachelor',
    'master',
    'doctorate',
].map((level) => ({
    value: level,
    label: level.charAt(0).toUpperCase() + level.slice(1),
}));

const ProgramManagement: React.FC = () => {
    // State declarations
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [selectedSchool, setSelectedSchool] = useState<string>();
    const [selectedDegreeLevel, setSelectedDegreeLevel] = useState<string>();
    const queryClient = useQueryClient();

    // Queries
    const { data: programs = [], isLoading } = useQuery('programs', programApi.getAllPrograms);

    const { data: schools = [] } = useQuery('schools', schoolApi.getAllSchools);

    const filteredPrograms = programs.filter((program: Program) => {
        const matchesSearch = searchText
            ? program.program_name.toLowerCase().includes(searchText.toLowerCase()) ||
            program.program_code?.toLowerCase().includes(searchText.toLowerCase())
            : true;
        const matchesSchool = selectedSchool ? program.school_id === selectedSchool : true;
        const matchesDegreeLevel = selectedDegreeLevel ? program.degree_level === selectedDegreeLevel : true;
        return matchesSearch && matchesSchool && matchesDegreeLevel;
    });

    // Mutations
    const createMutation = useMutation(programApi.createProgram, {
        onSuccess: () => {
            queryClient.invalidateQueries('programs');
            message.success('Program created successfully');
            setIsDrawerOpen(false);
        },
        onError: () => {
            message.error('Failed to create program');
        },
    });

    const updateMutation = useMutation(
        ({ id, data }: { id: string; data: Partial<Program> }) =>
            programApi.updateProgram(id, data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('programs');
                message.success('Program updated successfully');
                setIsDrawerOpen(false);
            },
            onError: () => {
                message.error('Failed to update program');
            },
        }
    );

    const deleteMutation = useMutation(programApi.deleteProgram, {
        onSuccess: () => {
            queryClient.invalidateQueries('programs');
            message.success('Program deleted successfully');
        },
        onError: () => {
            message.error('Failed to delete program');
        },
    });

    // Handlers
    const handleSubmit = async (values: Partial<Program>) => {
        try {
            if (selectedProgram) {
                await updateMutation.mutateAsync({
                    id: selectedProgram.program_id,
                    data: values,
                });
            } else {
                const filteredValues = Object.fromEntries(
                    Object.entries(values).filter(([, v]) => v !== undefined)
                ) as Omit<Program, 'program'>;
                await createMutation.mutateAsync(filteredValues);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const showDrawer = (program?: Program) => {
        setSelectedProgram(program || null);
        setIsDrawerOpen(true);
    };

    const showViewModal = (program: Program) => {
        setSelectedProgram(program);
        setIsViewModalOpen(true);
    };

    return (
        <Layout className="min-h-screen bg-gray-50">
            <Header className="bg-white shadow-sm px-8 flex items-center justify-between">
                <Title level={3} className="!mb-0 text-blue-900">
                    Program Management System
                </Title>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => showDrawer()}
                    className="bg-blue-600 hover:bg-blue-700"
                >
                    Add Program
                </Button>
            </Header>

            <Content className="p-8">
                <Card className="mb-6 shadow-sm">
                    <Space size="large" className="w-full" wrap>
                        <Search
                            placeholder="Search by program name or code..."
                            allowClear
                            onChange={(e) => setSearchText(e.target.value)}
                            style={{ width: 300 }}
                            className="flex-grow"
                        />
                        <Select
                            placeholder="Select School"
                            style={{ width: 200 }}
                            onChange={(value) => setSelectedSchool(value)}
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
                            placeholder="Degree Level"
                            style={{ width: 200 }}
                            onChange={(value) => setSelectedDegreeLevel(value)}
                            value={selectedDegreeLevel}
                            allowClear
                        >
                            {DEGREE_LEVELS.map((level) => (
                                <Option key={level.value} value={level.value}>
                                    {level.label}
                                </Option>
                            ))}
                        </Select>
                    </Space>
                </Card>

                <Card className="shadow-sm">
                    <ProgramTable
                        data={filteredPrograms}
                        loading={isLoading}
                        onEdit={showDrawer}
                        onView={showViewModal}
                        onDelete={(id) => deleteMutation.mutate(id)}
                    />
                </Card>

                <Drawer
                    title={selectedProgram ? 'Edit Program' : 'Add New Program'}
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
                    <ProgramForm
                        initialValues={selectedProgram || undefined}
                        onSubmit={handleSubmit}
                    />
                </Drawer>

                <Drawer
                    title="Program Details"
                    open={isViewModalOpen}
                    onClick={() => setIsViewModalOpen(false)}
                    footer={null}
                    width={1200}
                >
                    {selectedProgram && (
                        <ProgramDetails
                            program={selectedProgram}
                            onEdit={() => {
                                setIsViewModalOpen(false);
                                showDrawer(selectedProgram);
                            }}
                        />
                    )}
                </Drawer>
            </Content>
        </Layout>
    );
};

export default ProgramManagement;