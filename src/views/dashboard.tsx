import {
    Card,
    Progress,
    Statistic,
    Table,
    Tag,
    Button,
    Tabs,
} from 'antd';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import {
    BellOutlined,
    SettingOutlined,
    SearchOutlined,
    UserOutlined,
    BookOutlined,
    CalendarOutlined,
    PlusOutlined,
} from '@ant-design/icons';

const { TabPane } = Tabs;

const Dashboard = () => {
    // Mock Data
    const activityData = [
        { month: 'Jan', students: 850, engagement: 75 },
        { month: 'Feb', students: 940, engagement: 82 },
        { month: 'Mar', students: 1120, engagement: 88 },
        { month: 'Apr', students: 1200, engagement: 85 },
    ];

    const courseData = [
        { name: 'Computer Science', students: 420, completion: 78 },
        { name: 'Mathematics', students: 380, completion: 82 },
        { name: 'Physics', students: 220, completion: 75 },
        { name: 'Engineering', students: 180, completion: 80 },
    ];

    const recentActivities = [
        { key: '1', user: 'John Doe', action: 'Completed Assessment', course: 'Advanced AI', time: '2 hours ago' },
        { key: '2', user: 'Sarah Smith', action: 'Submitted Project', course: 'Web Development', time: '3 hours ago' },
        { key: '3', user: 'Mike Johnson', action: 'Started Course', course: 'Data Science', time: '5 hours ago' },
    ];

    const columns = [
        {
            title: 'User',
            dataIndex: 'user',
            key: 'user',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
        },
        {
            title: 'Course',
            dataIndex: 'course',
            key: 'course',
        },
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
        },
    ];

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">SmartLearn Admin Dashboard</h1>
                <div className="flex space-x-4">
                    <Button type="primary" icon={<SearchOutlined />}>Search</Button>
                    <Button type="default" icon={<BellOutlined />}>Notifications</Button>
                    <Button type="default" icon={<SettingOutlined />}>Settings</Button>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <Card>
                    <Statistic
                        title="Total Students"
                        value={1200}
                        prefix={<UserOutlined />}
                        valueStyle={{ color: '#3f8600' }}
                    />
                    <Tag color="green">+12% from last month</Tag>
                </Card>
                <Card>
                    <Statistic
                        title="Active Courses"
                        value={150}
                        prefix={<BookOutlined />}
                        valueStyle={{ color: '#108ee9' }}
                    />
                    <Tag color="blue">+8% from last month</Tag>
                </Card>
                <Card>
                    <Statistic
                        title="Completion Rate"
                        value={78.5}
                        suffix="%"
                        valueStyle={{ color: '#cf1322' }}
                    />
                    <Tag color="red">+5% from last month</Tag>
                </Card>
                <Card>
                    <Statistic
                        title="Active Sessions"
                        value={324}
                        prefix={<CalendarOutlined />}
                        valueStyle={{ color: '#faad14' }}
                    />
                    <Tag color="orange">Live now</Tag>
                </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <Card title="Student Engagement Trends">
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={activityData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="students" stroke="#8884d8" />
                            <Line type="monotone" dataKey="engagement" stroke="#82ca9d" />
                        </LineChart>
                    </ResponsiveContainer>
                </Card>
                <Card title="Course Performance">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={courseData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="students" fill="#8884d8" />
                            <Bar dataKey="completion" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>
            </div>

            {/* Tabs for Management */}
            <Card title="Admin Management" className="mb-6">
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Schools & Faculties" key="1">
                        <Button type="primary" icon={<PlusOutlined />}>Add School</Button>
                        {/* School Management Content */}
                    </TabPane>
                    <TabPane tab="Programs" key="2">
                        <Button type="primary" icon={<PlusOutlined />}>Add Program</Button>
                        {/* Program Management Content */}
                    </TabPane>
                    <TabPane tab="Courses" key="3">
                        <Button type="primary" icon={<PlusOutlined />}>Add Course</Button>
                        {/* Course Management Content */}
                    </TabPane>
                    <TabPane tab="Lecturers" key="4">
                        <Button type="primary" icon={<PlusOutlined />}>Add Lecturer</Button>
                        {/* Lecturer Management Content */}
                    </TabPane>
                    <TabPane tab="Students" key="5">
                        <Button type="primary" icon={<PlusOutlined />}>Add Student</Button>
                        {/* Student Management Content */}
                    </TabPane>
                </Tabs>
            </Card>

            {/* Recent Activity */}
            <Card title="Recent Activities">
                <Table columns={columns} dataSource={recentActivities} pagination={false} />
            </Card>

            {/* System Health */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <Card title="System Health">
                    <p>Server Status: <Tag color="green">Online</Tag></p>
                    <Progress percent={100} status="active" />

                    <p className="mt-4">Storage Usage: <Tag color="blue">75%</Tag></p>
                    <Progress percent={75} status="active" />

                    <p className="mt-4">Database Load: <Tag color="yellow">Medium</Tag></p>
                    <Progress percent={60} status="active" />

                    <p className="mt-4">API Response Time: <Tag color="green">Fast</Tag></p>
                    <Progress percent={90} status="active" />
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
