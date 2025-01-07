import React, { useState } from 'react';
import { Layout, Typography, Button, message, Drawer, Input, Select, Space, Card, } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { courseApi } from '../services/course_services/api';
import { schoolApi } from '../services/school_services/api';
import { programApi } from '../services/program_services/api';
import CourseTable from '../components/course/course_table';
import CourseForm from '../components/course/course_form';
import CourseDetails from '../components/course/course_details';
import type { Course } from '../models/course';
import type { School } from '../models/school';
import type { Program } from '../models/program';

const { Content, Header } = Layout;
const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;

// Course level options (1.1 to 5.2)
const COURSE_LEVELS = Array.from({ length: 9 }, (_, i) => {
    const year = Math.floor(i / 2) + 1;
    const semester = (i % 2) + 1;
    return {
        value: Number(`${year}.${semester}`),
        label: `${year}.${semester}`
    };
});

// Phase options (1 to 4)
const PHASES = Array.from({ length: 4 }, (_, i) => ({
    value: i + 1,
    label: `Phase ${i + 1}`
}));

const CourseManagement: React.FC = () => {
    // State declarations
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [selectedSchool, setSelectedSchool] = useState<string>();
    const [selectedProgram, setSelectedProgram] = useState<string>();
    const [selectedLevel, setSelectedLevel] = useState<number>();
    const [selectedPhase, setSelectedPhase] = useState<number>();
    const queryClient = useQueryClient();

    // Queries
    const { data: courses = [], isLoading } = useQuery(
        'courses',
        courseApi.getAllCourses
    );

    const { data: schools = [] } = useQuery('schools', schoolApi.getAllSchools);

    const { data: programs = [] } = useQuery(
        ['programs', selectedSchool],
        () => selectedSchool ? programApi.getProgramsBySchool(selectedSchool) : [],
        { enabled: !!selectedSchool }
    );


    const filteredCourses = courses.filter((course: Course) => {
        const matchesSearch = searchText ?
            (course.course_name.toLowerCase().includes(searchText.toLowerCase()) ||
                course.course_code?.toLowerCase().includes(searchText.toLowerCase())) : true;
        const matchesProgram = selectedProgram ?
            course.program_id === selectedProgram : true;
        const matchesLevel = selectedLevel ?
            course.course_level === selectedLevel : true;
        const matchesPhase = selectedPhase ?
            course.phase === selectedPhase : true;
        return matchesSearch && matchesProgram && matchesLevel && matchesPhase;
    });

    // Mutations
    const createMutation = useMutation(courseApi.createCourse, {
        onSuccess: () => {
            queryClient.invalidateQueries('courses');
            message.success('Course created successfully');
            setIsDrawerOpen(false);
        },
        onError: () => {
            message.error('Failed to create course');
        },
    });

    const updateMutation = useMutation(
        ({ id, data }: { id: string; data: Partial<Course> }) =>
            courseApi.updateCourse(id, data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('courses');
                message.success('Course updated successfully');
                setIsDrawerOpen(false);
            },
            onError: () => {
                message.error('Failed to update course');
            },
        }
    );

    const deleteMutation = useMutation(courseApi.deleteCourse, {
        onSuccess: () => {
            queryClient.invalidateQueries('courses');
            message.success('Course deleted successfully');
        },
        onError: () => {
            message.error('Failed to delete course');
        },
    });

    // Handlers
    const handleSubmit = async (values: Partial<Course>) => {
        try {
            if (selectedCourse) {
                await updateMutation.mutateAsync({
                    id: selectedCourse.course_id,
                    data: values,
                });
            } else {
                const filteredValues = Object.fromEntries(
                    Object.entries(values).filter(([, v]) => v !== undefined)
                ) as Omit<Course, 'course'>;
                await createMutation.mutateAsync(filteredValues);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };


    const showDrawer = (course?: Course) => {
        setSelectedCourse(course || null);
        setIsDrawerOpen(true);
    };

    const showViewModal = (course: Course) => {
        setSelectedCourse(course);
        setIsViewModalOpen(true);
    };

    const handleSchoolChange = (value: string) => {
        setSelectedSchool(value);
        setSelectedProgram(undefined);
    };

    return (
        <Layout className="min-h-screen bg-gray-50">
            <Header className="bg-white shadow-sm px-8 flex items-center justify-between">
                <Title level={3} className="!mb-0 text-blue-900">Course Management System</Title>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => showDrawer()}
                    className="bg-blue-600 hover:bg-blue-700"
                >
                    Add Course
                </Button>
            </Header>

            <Content className="p-8">
                <Card className="mb-6 shadow-sm">
                    <Space size="large" className="w-full" wrap>
                        <Search
                            placeholder="Search by course name or code..."
                            allowClear
                            onChange={e => setSearchText(e.target.value)}
                            style={{ width: 300 }}
                            className="flex-grow"
                        />
                        <Select
                            placeholder="Select School"
                            style={{ width: 200 }}
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
                            style={{ width: 200 }}
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
                        <Select
                            placeholder="Course Level"
                            style={{ width: 120 }}
                            onChange={setSelectedLevel}
                            value={selectedLevel}
                            allowClear
                        >
                            {COURSE_LEVELS.map(level => (
                                <Option key={level.value} value={level.value}>
                                    {level.label}
                                </Option>
                            ))}
                        </Select>
                        <Select
                            placeholder="Phase"
                            style={{ width: 120 }}
                            onChange={setSelectedPhase}
                            value={selectedPhase}
                            allowClear
                        >
                            {PHASES.map(phase => (
                                <Option key={phase.value} value={phase.value}>
                                    {phase.label}
                                </Option>
                            ))}
                        </Select>
                    </Space>
                </Card>

                <Card className="shadow-sm">
                    <CourseTable
                        data={filteredCourses}
                        loading={isLoading}
                        onEdit={showDrawer}
                        onView={showViewModal}
                        onDelete={(id) => deleteMutation.mutate(id)}
                    />
                </Card>

                <Drawer
                    title={selectedCourse ? 'Edit Course' : 'Add New Course'}
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
                    <CourseForm
                        initialValues={selectedCourse || undefined}
                        onSubmit={handleSubmit}
                    />
                </Drawer>

                <Drawer
                    title="Course Details"
                    open={isViewModalOpen}
                    onClose={() => setIsViewModalOpen(false)}
                    footer={null}
                    width={1200}
                >
                    {selectedCourse && (
                        <CourseDetails
                            course={selectedCourse}
                            onEdit={() => {
                                setIsViewModalOpen(false);
                                showDrawer(selectedCourse);
                            }}
                        />
                    )}
                </Drawer>
            </Content>
        </Layout>
    );
};

export default CourseManagement;