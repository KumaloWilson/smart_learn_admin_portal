import React, { useEffect, useState } from 'react';
import { Tabs, Descriptions, Table, Tag, Button, Space, Typography, Card, message, Statistic, Row, Col } from 'antd';
import {
    EditOutlined,
    BookOutlined,
    HistoryOutlined,
    DollarOutlined,
    TeamOutlined,
    TrophyOutlined,
    ScheduleOutlined,
    FileTextOutlined
} from '@ant-design/icons';
import type { Student } from '../../models/student';

const { TabPane } = Tabs;
const { Title } = Typography;

interface StudentDetailsProps {
    student: Student;
    onEdit: () => void;
}

const StudentDetails: React.FC<StudentDetailsProps> = ({ student, onEdit }) => {
    // State for different data types
    const [academicRecords, setAcademicRecords] = useState([]);
    const [enrollmentHistory, setEnrollmentHistory] = useState([]);
    const [financialRecords, setFinancialRecords] = useState([]);
    const [currentCourses, setCurrentCourses] = useState([]);
    const [achievements, setAchievements] = useState([]);
    const [attendance, setAttendance] = useState([]);
    const [disciplinaryRecords, setDisciplinaryRecords] = useState([]);

    // Loading states
    const [loadingAcademicRecords, setLoadingAcademicRecords] = useState(false);
    const [loadingEnrollmentHistory, setLoadingEnrollmentHistory] = useState(false);
    const [loadingFinancialRecords, setLoadingFinancialRecords] = useState(false);
    const [loadingCurrentCourses, setLoadingCurrentCourses] = useState(false);
    const [loadingAchievements, setLoadingAchievements] = useState(false);
    const [loadingAttendance, setLoadingAttendance] = useState(false);
    const [loadingDisciplinary, setLoadingDisciplinary] = useState(false);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                // Fetch academic records
                setLoadingAcademicRecords(true);
                const academicData = await studentApi.getAcademicRecords(student.student_id);
                setAcademicRecords(academicData);
                setLoadingAcademicRecords(false);

                // Fetch enrollment history
                setLoadingEnrollmentHistory(true);
                const enrollmentData = await studentApi.getEnrollmentHistory(student.student_id);
                setEnrollmentHistory(enrollmentData);
                setLoadingEnrollmentHistory(false);

                // Fetch financial records
                setLoadingFinancialRecords(true);
                const financialData = await studentApi.getFinancialRecords(student.student_id);
                setFinancialRecords(financialData);
                setLoadingFinancialRecords(false);

                // Fetch current courses
                setLoadingCurrentCourses(true);
                const coursesData = await studentApi.getCurrentCourses(student.student_id);
                setCurrentCourses(coursesData);
                setLoadingCurrentCourses(false);

                // Fetch achievements
                setLoadingAchievements(true);
                const achievementsData = await studentApi.getAchievements(student.student_id);
                setAchievements(achievementsData);
                setLoadingAchievements(false);

                // Fetch attendance
                setLoadingAttendance(true);
                const attendanceData = await studentApi.getAttendance(student.student_id);
                setAttendance(attendanceData);
                setLoadingAttendance(false);

                // Fetch disciplinary records
                setLoadingDisciplinary(true);
                const disciplinaryData = await studentApi.getDisciplinaryRecords(student.student_id);
                setDisciplinaryRecords(disciplinaryData);
                setLoadingDisciplinary(false);

            } catch (error) {
                console.error('Error fetching student data:', error);
                message.error('Failed to load student information. Please try again later.');
            }
        };

        fetchAllData();
    }, [student.student_id]);

    // Table Columns Definitions
    const academicRecordsColumns = [
        { title: 'Semester', dataIndex: 'semester', key: 'semester' },
        { title: 'Course Code', dataIndex: 'course_code', key: 'course_code' },
        { title: 'Course Name', dataIndex: 'course_name', key: 'course_name' },
        { title: 'Credits', dataIndex: 'credits', key: 'credits' },
        { title: 'Grade', dataIndex: 'grade', key: 'grade' },
        { title: 'GPA', dataIndex: 'gpa', key: 'gpa' },
    ];

    const enrollmentHistoryColumns = [
        { title: 'Program', dataIndex: 'program_name', key: 'program_name' },
        { title: 'Start Date', dataIndex: 'start_date', key: 'start_date' },
        { title: 'End Date', dataIndex: 'end_date', key: 'end_date' },
        { title: 'Status', dataIndex: 'status', key: 'status' },
    ];

    const financialRecordsColumns = [
        { title: 'Date', dataIndex: 'date', key: 'date' },
        { title: 'Description', dataIndex: 'description', key: 'description' },
        { title: 'Type', dataIndex: 'type', key: 'type' },
        { title: 'Amount', dataIndex: 'amount', key: 'amount' },
        { title: 'Balance', dataIndex: 'balance', key: 'balance' },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <Tag color={status === 'paid' ? 'green' : status === 'pending' ? 'orange' : 'red'}>
                    {status.toUpperCase()}
                </Tag>
            ),
        },
    ];

    const currentCoursesColumns = [
        { title: 'Course Code', dataIndex: 'course_code', key: 'course_code' },
        { title: 'Course Name', dataIndex: 'course_name', key: 'course_name' },
        { title: 'Lecturer', dataIndex: 'lecturer_name', key: 'lecturer_name' },
        { title: 'Schedule', dataIndex: 'schedule', key: 'schedule' },
        { title: 'Room', dataIndex: 'room', key: 'room' },
    ];

    const achievementsColumns = [
        { title: 'Date', dataIndex: 'date', key: 'date' },
        { title: 'Achievement', dataIndex: 'achievement', key: 'achievement' },
        { title: 'Description', dataIndex: 'description', key: 'description' },
        { title: 'Awarded By', dataIndex: 'awarded_by', key: 'awarded_by' },
    ];

    const attendanceColumns = [
        { title: 'Date', dataIndex: 'date', key: 'date' },
        { title: 'Course', dataIndex: 'course_name', key: 'course_name' },
        { title: 'Status', dataIndex: 'status', key: 'status' },
        { title: 'Notes', dataIndex: 'notes', key: 'notes' },
    ];

    const disciplinaryColumns = [
        { title: 'Date', dataIndex: 'date', key: 'date' },
        { title: 'Incident', dataIndex: 'incident', key: 'incident' },
        { title: 'Action Taken', dataIndex: 'action_taken', key: 'action_taken' },
        { title: 'Status', dataIndex: 'status', key: 'status' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <Title level={4} className="!mb-0">
                    {`${student.first_name} ${student.middle_name ? student.middle_name + ' ' : ''}${student.last_name}`}
                </Title>
                <Button type="primary" icon={<EditOutlined />} onClick={onEdit}>
                    Edit Student
                </Button>
            </div>

            <Card className="shadow-sm">
                <Descriptions bordered column={2}>
                    <Descriptions.Item label="Registration Number">{student.registration_number}</Descriptions.Item>
                    <Descriptions.Item label="Email">{student.email}</Descriptions.Item>
                    <Descriptions.Item label="Personal Email">{student.personal_email || 'Not Available'}</Descriptions.Item>
                    <Descriptions.Item label="Phone">{student.phone || 'Not Available'}</Descriptions.Item>
                    <Descriptions.Item label="Gender">{student.gender}</Descriptions.Item>
                    <Descriptions.Item label="Date of Birth">
                        {new Date(student.date_of_birth).toLocaleDateString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="Nationality">{student.nationality || 'Not Available'}</Descriptions.Item>
                    <Descriptions.Item label="National ID">{student.national_id || 'Not Available'}</Descriptions.Item>
                    <Descriptions.Item label="Passport Number">{student.passport_number || 'Not Available'}</Descriptions.Item>
                    <Descriptions.Item label="Address">{student.address || 'Not Available'}</Descriptions.Item>
                    <Descriptions.Item label="Emergency Contact">
                        {student.emergency_contact_name ? (
                            <>
                                {student.emergency_contact_name} ({student.emergency_contact_relationship})<br />
                                {student.emergency_contact_phone}
                            </>
                        ) : (
                            'Not Available'
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="Admission Date">
                        {new Date(student.admission_date).toLocaleDateString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="Status">
                        <Tag color={
                            student.enrollment_status === 'active'
                                ? 'green'
                                : student.enrollment_status === 'suspended'
                                    ? 'red'
                                    : student.enrollment_status === 'graduated'
                                        ? 'blue'
                                        : 'orange'
                        }>
                            {student.enrollment_status.toUpperCase()}
                        </Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Photo">
                        {student.photo_url ? (
                            <img
                                src={student.photo_url}
                                alt="Student"
                                width={100}
                                style={{ borderRadius: '50%' }}
                            />
                        ) : (
                            'Not Available'
                        )}
                    </Descriptions.Item>
                </Descriptions>
            </Card>

            <Tabs defaultActiveKey="1" className="bg-white rounded-lg shadow-sm p-6">
                <TabPane
                    tab={
                        <Space>
                            <BookOutlined />
                            Academic Records
                        </Space>
                    }
                    key="1"
                >
                    <Table
                        columns={academicRecordsColumns}
                        dataSource={academicRecords}
                        loading={loadingAcademicRecords}
                        pagination={false}
                        rowKey="record_id"
                        className="mt-4"
                    />
                </TabPane>

                <TabPane
                    tab={
                        <Space>
                            <HistoryOutlined />
                            Enrollment History
                        </Space>
                    }
                    key="2"
                >
                    <Table
                        columns={enrollmentHistoryColumns}
                        dataSource={enrollmentHistory}
                        loading={loadingEnrollmentHistory}
                        pagination={false}
                        rowKey="enrollment_id"
                        className="mt-4"
                    />
                </TabPane>

                <TabPane
                    tab={
                        <Space>
                            <DollarOutlined />
                            Financial Records
                        </Space>
                    }
                    key="3"
                >
                    <Row gutter={16} className="mb-4">
                        <Col span={6}>
                            <Card>
                                <Statistic
                                    title="Total Fees"
                                    value={financialRecords.reduce((acc, curr) => acc + curr.amount, 0)}
                                    prefix="$"
                                />
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card>
                                <Statistic
                                    title="Amount Paid"
                                    value={financialRecords
                                        .filter(record => record.status === 'paid')
                                        .reduce((acc, curr) => acc + curr.amount, 0)}
                                    prefix="$"
                                />
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card>
                                <Statistic
                                    title="Outstanding Balance"
                                    value={financialRecords
                                        .filter(record => record.status === 'pending')
                                        .reduce((acc, curr) => acc + curr.amount, 0)}
                                    prefix="$"
                                />
                            </Card>
                        </Col>
                    </Row>
                    <Table
                        columns={financialRecordsColumns}
                        dataSource={financialRecords}
                        loading={loadingFinancialRecords}
                        pagination={false}
                        rowKey="transaction_id"
                        className="mt-4"
                    />
                </TabPane>

                <TabPane
                    tab={
                        <Space>
                            <TeamOutlined />
                            Current Courses
                        </Space>
                    }
                    key="4"
                >
                    <Table
                        columns={currentCoursesColumns}
                        dataSource={currentCourses}
                        loading={loadingCurrentCourses}
                        pagination={false}
                        rowKey="course_id"
                        className="mt-4"
                    />
                </TabPane>

                <TabPane
                    tab={
                        <Space>
                            <TrophyOutlined />
                            Achievements
                        </Space>
                    }
                    key="5"
                >
                    <Table
                        columns={achievementsColumns}
                        dataSource={achievements}
                        loading={loadingAchievements}
                        pagination={false}
                        rowKey="achievement_id"
                        className="mt-4"
                    />
                </TabPane>

                <TabPane
                    tab={
                        <Space>
                            <ScheduleOutlined />
                            Attendance
                        </Space>
                    }
                    key="6"
                >
                    <Table
                        columns={attendanceColumns}
                        dataSource={attendance}
                        loading={loadingAttendance}
                        pagination={false}
                        rowKey="attendance_id"
                        className="mt-4"
                    />
                </TabPane>

                <TabPane
                    tab={
                        <Space>
                            <FileTextOutlined />
                            Disciplinary Records
                        </Space>
                    }
                    key="7"
                >
                    <Table
                        columns={disciplinaryColumns}
                        dataSource={disciplinaryRecords}
                        loading={loadingDisciplinary}
                        pagination={false}
                        rowKey="record_id"
                        className="mt-4"
                    />
                </TabPane>
            </Tabs>

            {/* Additional Statistics Section */}
            <Card className="shadow-sm mt-6">
                <Title level={5}>Academic Summary</Title>
                <Row gutter={16} className="mt-4">
                    <Col span={6}>
                        <Statistic
                            title="Current GPA"
                            value={academicRecords.length > 0
                                ? (academicRecords.reduce((acc, curr) => acc + curr.gpa, 0) / academicRecords.length).toFixed(2)
                                : 'N/A'
                            }
                        />
                    </Col>
                    <Col span={6}>
                        <Statistic
                            title="Credits Completed"
                            value={academicRecords.reduce((acc, curr) => acc + curr.credits, 0)}
                        />
                    </Col>
                    <Col span={6}>
                        <Statistic
                            title="Attendance Rate"
                            value={attendance.length > 0
                                ? (attendance.filter(a => a.status === 'present').length / attendance.length * 100).toFixed(1)
                                : 0
                            }
                            suffix="%"
                        />
                    </Col>
                    <Col span={6}>
                        <Statistic
                            title="Active Courses"
                            value={currentCourses.length}
                        />
                    </Col>
                </Row>
            </Card>

            {/* Document Section */}
            <Card className="shadow-sm mt-6">
                <Title level={5}>Important Documents</Title>
                <Row gutter={[16, 16]} className="mt-4">
                    <Col span={8}>
                        <Button block icon={<FileTextOutlined />}>
                            Download Transcript
                        </Button>
                    </Col>
                    <Col span={8}>
                        <Button block icon={<FileTextOutlined />}>
                            Download Fee Statement
                        </Button>
                    </Col>
                    <Col span={8}>
                        <Button block icon={<FileTextOutlined />}>
                            Download Student ID Card
                        </Button>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default StudentDetails;