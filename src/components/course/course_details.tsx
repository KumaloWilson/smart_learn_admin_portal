import React from 'react';
import { Tabs, Descriptions, Table, Tag, Button, Space, Typography, Card } from 'antd';
import { EditOutlined, UserOutlined, BookOutlined, } from '@ant-design/icons';
import type { Course } from '../../models/course';

const { TabPane } = Tabs;
const { Title } = Typography;

interface CourseDetailsProps {
    course: Course;
    onEdit: () => void;
}

const CourseDetails: React.FC<CourseDetailsProps> = ({ course, onEdit }) => {
    // Sample data for enrolled classes and students
    const enrolledClasses = [
        { key: '1', class_id: 'CLS001', schedule: 'Mon/Wed 10:00-11:30', instructor: 'Dr. Smith', room: 'Room 101', status: 'active' },
        { key: '2', class_id: 'CLS002', schedule: 'Tue/Thu 14:00-15:30', instructor: 'Dr. Johnson', room: 'Room 203', status: 'active' },
    ];

    const enrolledStudents = [
        { key: '1', student_id: 'STD001', name: 'John Doe', enrollment_date: '2024-01-15', status: 'enrolled' },
        { key: '2', student_id: 'STD002', name: 'Jane Smith', enrollment_date: '2024-01-15', status: 'enrolled' },
    ];

    const classColumns = [
        { title: 'Class ID', dataIndex: 'class_id', key: 'class_id' },
        { title: 'Schedule', dataIndex: 'schedule', key: 'schedule' },
        { title: 'Instructor', dataIndex: 'instructor', key: 'instructor' },
        { title: 'Room', dataIndex: 'room', key: 'room' },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <Tag color={status === 'active' ? 'green' : 'red'}>
                    {status.toUpperCase()}
                </Tag>
            ),
        },
    ];

    const studentColumns = [
        { title: 'Student ID', dataIndex: 'student_id', key: 'student_id' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Enrollment Date', dataIndex: 'enrollment_date', key: 'enrollment_date' },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <Tag color={status === 'enrolled' ? 'blue' : 'orange'}>
                    {status.toUpperCase()}
                </Tag>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <Title level={4} className="!mb-0">{course.course_name}</Title>
                <Button type="primary" icon={<EditOutlined />} onClick={onEdit}>
                    Edit Course
                </Button>
            </div>

            <Card className="shadow-sm">
                <Descriptions bordered column={2}>
                    <Descriptions.Item label="Course Code">{course.course_code}</Descriptions.Item>
                    <Descriptions.Item label="Credit Hours">{course.credit_hours}</Descriptions.Item>
                    <Descriptions.Item label="Course Level">{course.course_level}</Descriptions.Item>
                    <Descriptions.Item label="Phase">{course.phase}</Descriptions.Item>
                    <Descriptions.Item label="Status">
                        <Tag color={course.status === 'active' ? 'green' : 'red'}>
                            {course.status?.toUpperCase()}
                        </Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Elective">
                        <Tag color={course.is_elective ? 'blue' : 'default'}>
                            {course.is_elective ? 'Yes' : 'No'}
                        </Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Semester Offered" span={2}>
                        {course.semester_offered}
                    </Descriptions.Item>
                    <Descriptions.Item label="Description" span={2}>
                        {course.description}
                    </Descriptions.Item>
                    <Descriptions.Item label="Prerequisites" span={2}>
                        {course.prerequisites || 'None'}
                    </Descriptions.Item>
                </Descriptions>
            </Card>

            <Tabs defaultActiveKey="1" className="bg-white rounded-lg shadow-sm p-6">
                <TabPane
                    tab={
                        <Space>
                            <BookOutlined />
                            Enrolled Classes
                        </Space>
                    }
                    key="1"
                >
                    <Table
                        columns={classColumns}
                        dataSource={enrolledClasses}
                        pagination={false}
                        className="mt-4"
                    />
                </TabPane>
                <TabPane
                    tab={
                        <Space>
                            <UserOutlined />
                            Enrolled Students
                        </Space>
                    }
                    key="2"
                >
                    <Table
                        columns={studentColumns}
                        dataSource={enrolledStudents}
                        pagination={false}
                        className="mt-4"
                    />
                </TabPane>
            </Tabs>
        </div>
    );
};

export default CourseDetails;