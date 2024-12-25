import { Tag, Button, Table, Modal } from "antd";
import { useState } from "react";

const UserManagement: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: string) => (
                <Tag color={status === "active" ? "green" : "red"}>{status}</Tag>
            ),
        },
        {
            title: "Actions",
            key: "actions",
            render: (_: unknown, record: { name: string }) => (
                <Button type="link" onClick={() => alert(`Editing ${record.name}`)}>
                    Edit
                </Button>
            ),
        },
    ];

    const data = [
        { name: "John Doe", email: "john@example.com", role: "Student", status: "active" },
        { name: "Jane Smith", email: "jane@example.com", role: "Lecturer", status: "inactive" },
    ];

    return (
        <div>
            <Button type="primary" onClick={() => setIsModalOpen(true)}>Add User</Button>
            <Table className="mt-6" dataSource={data} columns={columns} rowKey="email" />
            <Modal title="Add User" open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null}>
                <form className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Name</label>
                        <input type="text" className="w-full border p-2 rounded-md" />
                    </div>
                    <div>
                        <label className="block text-gray-700">Email</label>
                        <input type="email" className="w-full border p-2 rounded-md" />
                    </div>
                    <div>
                        <label className="block text-gray-700">Role</label>
                        <select className="w-full border p-2 rounded-md">
                            <option>Student</option>
                            <option>Lecturer</option>
                            <option>Admin</option>
                        </select>
                    </div>
                    <Button type="primary" block>Add User</Button>
                </form>
            </Modal>
        </div>
    );
};

export default UserManagement;