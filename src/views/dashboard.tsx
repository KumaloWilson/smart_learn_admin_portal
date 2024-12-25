import { Button, Card, Statistic, Tag } from "antd";

const Dashboard: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
                <Statistic title="Total Students" value={1200} />
            </Card>
            <Card>
                <Statistic title="Total Lecturers" value={300} />
            </Card>
            <Card>
                <Statistic title="Total Courses" value={150} />
            </Card>
            <Card>
                <Statistic title="Active Users" value={950} />
            </Card>
            <Card>
                <h3 className="text-xl font-bold mb-4">System Health</h3>
                <div className="space-y-2">
                    <p>Server Status: <Tag color="green">Online</Tag></p>
                    <p>Storage Usage: <Tag color="blue">75%</Tag></p>
                    <p>Uptime: <Tag color="gold">99.9%</Tag></p>
                </div>
            </Card>
            <Card>
                <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                <div className="space-y-2">
                    <Button type="primary" block>Add User</Button>
                    <Button type="primary" block>Approve Content</Button>
                    <Button type="primary" block>Generate Report</Button>
                </div>
            </Card>
        </div>
    );
};

export default Dashboard