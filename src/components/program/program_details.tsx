import React, { useEffect, useState } from 'react';
import { Descriptions, Table, Tag, Button, Typography, Card, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { courseApi } from '../../services/course_services/api';
import type { Program } from '../../models/program';
import type { Course } from '../../models/course';

const { Title } = Typography;

interface ProgramDetailsProps {
    program: Program;
    onEdit: () => void;
}

const ProgramDetails: React.FC<ProgramDetailsProps> = ({ program, onEdit }) => {
    const [courses, setCourses] = useState<{ [key: string]: Course[] }>({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            try {
                const data = await courseApi.getCoursesByProgram(program.program_id);
                const groupedCourses = data.reduce((acc: { [key: string]: Course[] }, course: Course) => {
                    const level = course.course_level ?? 'Unknown';
                    if (!acc[level]) acc[level] = [];
                    acc[level].push(course);
                    return acc;
                }, {});
                setCourses(groupedCourses);
            } catch (error) {
                console.error('Error fetching courses:', error);
                message.error('Failed to load courses. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        if (program.program_id) {
            fetchCourses();
        }
    }, [program.program_id]);

    const renderCoursesTable = (level: string, courses: Course[]) => (
        <div key={level} className="mt-6">
            <Title level={5}>{level} Level</Title>
            <Table
                columns={[
                    { title: 'Course Name', dataIndex: 'course_name', key: 'course_name' },
                    { title: 'Course Code', dataIndex: 'course_code', key: 'course_code' },
                    { title: 'Credit Hours', dataIndex: 'credit_hours', key: 'credit_hours' },
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
                ]}
                dataSource={courses}
                pagination={false}
                rowKey="course_id"
                className="mt-4"
            />
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <Title level={4} className="!mb-0">{program.program_name}</Title>
                <Button type="primary" icon={<EditOutlined />} onClick={onEdit}>
                    Edit Program
                </Button>
            </div>

            <Card className="shadow-sm">
                <Descriptions bordered column={2}>
                    <Descriptions.Item label="Program Code">{program.program_code || 'Not specified'}</Descriptions.Item>
                    <Descriptions.Item label="Degree Level">{program.degree_level || 'Not specified'}</Descriptions.Item>
                    <Descriptions.Item label="Duration (Years)">{program.duration_years || 'Not specified'}</Descriptions.Item>
                    <Descriptions.Item label="Credit Hours">{program.credit_hours || 'Not specified'}</Descriptions.Item>
                    <Descriptions.Item label="Coordinator">{program.coordinator_id || 'Not assigned'}</Descriptions.Item>
                    <Descriptions.Item label="Accreditation Status">{program.accreditation_status || 'Not specified'}</Descriptions.Item>
                    <Descriptions.Item label="Entry Requirements" span={2}>
                        {program.entry_requirements || 'Not specified'}
                    </Descriptions.Item>
                    <Descriptions.Item label="Description" span={2}>
                        {program.description || 'No description available'}
                    </Descriptions.Item>
                    <Descriptions.Item label="Status">
                        <Tag color={program.status === 'active' ? 'green' : 'red'}>
                            {program.status?.toUpperCase()}
                        </Tag>
                    </Descriptions.Item>
                </Descriptions>
            </Card>

            <Card className="shadow-sm mt-6">
                <Title level={5} className="!mb-4">Courses</Title>
                {Object.keys(courses).map((level) => renderCoursesTable(level, courses[level]))}
            </Card>
        </div>
    );
};

export default ProgramDetails;
