import React, { useEffect, useState } from 'react';
import { Tabs, Descriptions, Table, Tag, Button, Space, Typography, Card, message } from 'antd';
import { EditOutlined, BookOutlined, TeamOutlined, ProfileOutlined } from '@ant-design/icons';
import { lecturerCourseAssignmentApi } from '../../services/lecturer_course_assignment_service/api';
import type { Lecturer } from '../../models/lecturer';

const { TabPane } = Tabs;
const { Title } = Typography;

interface LecturerDetailsProps {
    lecturer: Lecturer;
    onEdit: () => void;
}

const LecturerDetails: React.FC<LecturerDetailsProps> = ({ lecturer, onEdit }) => {
    const [courses, setCourses] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [qualifications, setQualifications] = useState([]);
    const [loadingCourses, setLoadingCourses] = useState(false);
    const [loadingDepartments, setLoadingDepartments] = useState(false);
    const [loadingQualifications, setLoadingQualifications] = useState(false);

    useEffect(() => {
        const fetchCourses = async () => {
            setLoadingCourses(true);
            try {
                const data = await lecturerCourseAssignmentApi.getAssignmentsByLecturerId(lecturer.lecturer_id);
                setCourses(data);
            } catch (error) {
                console.error('Error fetching courses:', error);
                message.error('Failed to load assigned courses. Please try again later.');
            } finally {
                setLoadingCourses(false);
            }
        };

        const fetchDepartments = async () => {
            setLoadingDepartments(true);
            try {
                const data = await lecturerApi.getDepartmentAffiliations(lecturer.lecturer_id);
                setDepartments(data);
            } catch (error) {
                console.error('Error fetching departments:', error);
                message.error('Failed to load department affiliations. Please try again later.');
            } finally {
                setLoadingDepartments(false);
            }
        };

        const fetchQualifications = async () => {
            setLoadingQualifications(true);
            try {
                const data = await lecturerApi.getQualifications(lecturer.lecturer_id);
                setQualifications(data);
            } catch (error) {
                console.error('Error fetching qualifications:', error);
                message.error('Failed to load qualifications. Please try again later.');
            } finally {
                setLoadingQualifications(false);
            }
        };

        fetchCourses();
        fetchDepartments();
        fetchQualifications();
    }, [lecturer.lecturer_id]);

    const courseColumns = [
        { title: 'Course Code', dataIndex: 'course_code', key: 'course_code' },
        { title: 'Course Name', dataIndex: 'course_name', key: 'course_name' },
        { title: 'Credits', dataIndex: 'credits', key: 'credits' },
        { title: 'Semester', dataIndex: 'semester', key: 'semester' },
    ];

    const departmentColumns = [
        { title: 'Department Name', dataIndex: 'department_name', key: 'department_name' },
        { title: 'Role', dataIndex: 'role', key: 'role' },
    ];

    const qualificationColumns = [
        { title: 'Degree', dataIndex: 'degree', key: 'degree' },
        { title: 'Institution', dataIndex: 'institution', key: 'institution' },
        { title: 'Year Completed', dataIndex: 'year_completed', key: 'year_completed' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <Title level={4} className="!mb-0">
                    {`${lecturer.title} ${lecturer.first_name} ${lecturer.last_name}`}
                </Title>
                <Button type="primary" icon={<EditOutlined />} onClick={onEdit}>
                    Edit Lecturer
                </Button>
            </div>

            <Card className="shadow-sm">
                <Descriptions bordered column={2}>
                    <Descriptions.Item label="Staff Number">{lecturer.staff_number}</Descriptions.Item>
                    <Descriptions.Item label="Email">{lecturer.email}</Descriptions.Item>
                    <Descriptions.Item label="Phone">{lecturer.phone || 'Not Available'}</Descriptions.Item>
                    <Descriptions.Item label="Gender">{lecturer.gender}</Descriptions.Item>
                    <Descriptions.Item label="Date of Birth">
                        {lecturer.date_of_birth
                            ? new Date(lecturer.date_of_birth).toLocaleDateString()
                            : 'Not Available'}
                    </Descriptions.Item>
                    <Descriptions.Item label="Employment Status">
                        {lecturer.employment_status.charAt(0).toUpperCase() +
                            lecturer.employment_status.slice(1)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Position Title">{lecturer.position_title || 'Not Available'}</Descriptions.Item>
                    <Descriptions.Item label="Office Location">{lecturer.office_location || 'Not Available'}</Descriptions.Item>
                    <Descriptions.Item label="Research Interests">{lecturer.research_interests || 'Not Specified'}</Descriptions.Item>
                    <Descriptions.Item label="Bio">{lecturer.bio || 'No bio available'}</Descriptions.Item>
                    <Descriptions.Item label="Profile Picture">
                        {lecturer.profile_picture_url ? (
                            <img
                                src={lecturer.profile_picture_url}
                                alt="Profile"
                                width={100}
                                style={{ borderRadius: '50%' }}
                            />
                        ) : (
                            'Not Available'
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="Date Joined">
                        {new Date(lecturer.date_joined).toLocaleDateString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="Contract End Date">
                        {lecturer.contract_end_date
                            ? new Date(lecturer.contract_end_date).toLocaleDateString()
                            : 'Not Specified'}
                    </Descriptions.Item>
                    <Descriptions.Item label="Status">
                        <Tag color={
                            lecturer.status === 'active'
                                ? 'green'
                                : lecturer.status === 'on_leave'
                                    ? 'orange'
                                    : 'red'
                        }>
                            {lecturer.status.toUpperCase()}
                        </Tag>
                    </Descriptions.Item>
                </Descriptions>
            </Card>

            <Tabs defaultActiveKey="1" className="bg-white rounded-lg shadow-sm p-6">
                <TabPane
                    tab={
                        <Space>
                            <BookOutlined />
                            Assigned Courses
                        </Space>
                    }
                    key="1"
                >
                    <Table
                        columns={courseColumns}
                        dataSource={courses}
                        loading={loadingCourses}
                        pagination={false}
                        rowKey="course_id"
                        className="mt-4"
                    />
                </TabPane>

                <TabPane
                    tab={
                        <Space>
                            <TeamOutlined />
                            Department Affiliations
                        </Space>
                    }
                    key="2"
                >
                    <Table
                        columns={departmentColumns}
                        dataSource={departments}
                        loading={loadingDepartments}
                        pagination={false}
                        rowKey="department_id"
                        className="mt-4"
                    />
                </TabPane>

                <TabPane
                    tab={
                        <Space>
                            <ProfileOutlined />
                            Qualifications
                        </Space>
                    }
                    key="3"
                >
                    <Table
                        columns={qualificationColumns}
                        dataSource={qualifications}
                        loading={loadingQualifications}
                        pagination={false}
                        rowKey="qualification_id"
                        className="mt-4"
                    />
                </TabPane>
            </Tabs>
        </div>
    );
};

export default LecturerDetails;
