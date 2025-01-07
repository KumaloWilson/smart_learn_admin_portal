import {
    Card,
    Progress,
    Statistic,
    Tag,
    Button,
    Row,
    Col,
    Alert,
    List,
    Avatar,
    Space
} from 'antd';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import {
    UserOutlined,
    BookOutlined,
    BankOutlined,
    DollarOutlined,
    TeamOutlined,
    FileProtectOutlined,
    CheckCircleOutlined,
    BellOutlined
} from '@ant-design/icons';

const Dashboard = () => {
    // Enrollment Statistics
    const enrollmentTrends = [
        { month: 'Jan', undergraduate: 2500, postgraduate: 800, international: 400 },
        { month: 'Feb', undergraduate: 2600, postgraduate: 850, international: 450 },
        { month: 'Mar', undergraduate: 2750, postgraduate: 900, international: 500 },
        { month: 'Apr', undergraduate: 2800, postgraduate: 950, international: 550 }
    ];

    // Academic Performance
    const academicStats = [
        { program: 'Engineering', passing: 85, retention: 92, employment: 88 },
        { program: 'Business', passing: 88, retention: 90, employment: 85 },
        { program: 'Sciences', passing: 82, retention: 88, employment: 80 },
        { program: 'Arts', passing: 90, retention: 85, employment: 75 }
    ];

    // Financial Data
    const financialData = [
        { category: 'Tuition', value: 5000000 },
        { category: 'Research Grants', value: 2000000 },
        { category: 'Donations', value: 1000000 },
        { category: 'Other Income', value: 500000 }
    ];

    // Recent Activities
    const recentActivities = [
        {
            key: '1',
            type: 'academic',
            title: 'New Course Registration',
            description: 'Engineering Department added 3 new courses',
            timestamp: '2 hours ago',
            status: 'success'
        },
        {
            key: '2',
            type: 'financial',
            title: 'Grant Approval',
            description: 'Research grant of $500,000 approved',
            timestamp: '3 hours ago',
            status: 'success'
        },
        {
            key: '3',
            type: 'system',
            title: 'System Update',
            description: 'Database maintenance scheduled',
            timestamp: '5 hours ago',
            status: 'warning'
        }
    ];

    // Urgent Notifications
    type NotificationType = "success" | "warning" | "error" | "info";

    const urgentNotifications: { title: string; description: string; type: NotificationType }[] = [
        {
            title: 'Server Load Warning',
            description: 'Database server reaching 80% capacity',
            type: 'warning'
        },
        {
            title: 'Fee Payment Deadline',
            description: '150 students pending payment',
            type: 'error'
        }
    ];

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Urgent Notifications */}
            <div className="mb-6">
                {urgentNotifications.map((notification, index) => (
                    <Alert
                        key={index}
                        message={notification.title}
                        description={notification.description}
                        type={notification.type}
                        showIcon
                        className="mb-2"
                    />
                ))}
            </div>

            {/* Key Statistics */}
            <Row gutter={[16, 16]} className="mb-6">
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Total Students"
                            value={4250}
                            prefix={<UserOutlined />}
                            suffix={<Tag color="green">+5%</Tag>}
                        />
                        <Progress percent={85} status="active" size="small" />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Active Faculty"
                            value={320}
                            prefix={<TeamOutlined />}
                            suffix={<Tag color="blue">+2%</Tag>}
                        />
                        <Progress percent={92} status="active" size="small" />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Revenue (Million)"
                            value={8.5}
                            prefix={<DollarOutlined />}
                            suffix={<Tag color="purple">+12%</Tag>}
                        />
                        <Progress percent={78} status="active" size="small" />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Course Completion"
                            value={88}
                            suffix="%"
                            prefix={<CheckCircleOutlined />}
                            valueStyle={{ color: '#3f8600' }}
                        />
                        <Progress percent={88} status="active" size="small" />
                    </Card>
                </Col>
            </Row>

            {/* Charts Section */}
            <Row gutter={[16, 16]} className="mb-6">
                <Col xs={24} lg={12}>
                    <Card title="Enrollment Trends">
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={enrollmentTrends}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="undergraduate" stroke="#8884d8" />
                                <Line type="monotone" dataKey="postgraduate" stroke="#82ca9d" />
                                <Line type="monotone" dataKey="international" stroke="#ffc658" />
                            </LineChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>
                <Col xs={24} lg={12}>
                    <Card title="Academic Performance">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={academicStats}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="program" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="passing" fill="#8884d8" />
                                <Bar dataKey="retention" fill="#82ca9d" />
                                <Bar dataKey="employment" fill="#ffc658" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>
            </Row>

            {/* Financial Overview */}
            <Row gutter={[16, 16]} className="mb-6">
                <Col xs={24} lg={12}>
                    <Card title="Financial Distribution">
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={financialData}
                                    dataKey="value"
                                    nameKey="category"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    fill="#8884d8"
                                    label
                                >
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>
                <Col xs={24} lg={12}>
                    <Card title="System Health">
                        <Space direction="vertical" className="w-full">
                            <div>
                                <span>Server Status</span>
                                <Progress percent={95} status="active" />
                            </div>
                            <div>
                                <span>Database Performance</span>
                                <Progress percent={82} status="active" />
                            </div>
                            <div>
                                <span>Storage Usage</span>
                                <Progress percent={68} status="active" />
                            </div>
                            <div>
                                <span>Network Status</span>
                                <Progress percent={94} status="active" />
                            </div>
                        </Space>
                    </Card>
                </Col>
            </Row>

            {/* Recent Activities and Notifications */}
            <Row gutter={[16, 16]}>
                <Col xs={24} lg={16}>
                    <Card title="Recent Activities">
                        <List
                            itemLayout="horizontal"
                            dataSource={recentActivities}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar icon={
                                                item.type === 'academic' ? <BookOutlined /> :
                                                    item.type === 'financial' ? <DollarOutlined /> :
                                                        <BellOutlined />
                                            } />
                                        }
                                        title={item.title}
                                        description={
                                            <Space>
                                                {item.description}
                                                <Tag color={item.status === 'success' ? 'green' : 'orange'}>
                                                    {item.timestamp}
                                                </Tag>
                                            </Space>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
                <Col xs={24} lg={8}>
                    <Card title="Quick Actions">
                        <Space direction="vertical" className="w-full">
                            <Button type="primary" block icon={<UserOutlined />}>
                                Add New Student
                            </Button>
                            <Button type="default" block icon={<TeamOutlined />}>
                                Manage Faculty
                            </Button>
                            <Button type="default" block icon={<FileProtectOutlined />}>
                                View Reports
                            </Button>
                            <Button type="default" block icon={<BankOutlined />}>
                                Academic Calendar
                            </Button>
                        </Space>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;