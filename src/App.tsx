import React, { useState } from "react";
import {
  DashboardOutlined,
  UserOutlined,
  BookOutlined,
  SettingOutlined,
  BarChartOutlined,
  QuestionCircleOutlined,
  IdcardOutlined,
  SolutionOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Breadcrumb, } from "antd";
import type { MenuProps } from "antd";
import { theme } from "antd";
import Dashboard from "./views/dashboard";
import AdminManagement from './views/user_management';
import LecturerManagement from "./views/lecturer_management";
import StudentManagement from "./views/student_management";
import logo from "./assets/logo.jpeg";

const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const items: MenuProps["items"] = [
    { key: "dashboard", icon: <DashboardOutlined />, label: "Dashboard" },
    {
      key: "user-management",
      icon: <UserOutlined />,
      label: "User Management",
      children: [
        { key: "admin", label: "Admin", icon: <IdcardOutlined /> },
        { key: "lecturer", label: "Lecturer", icon: <SolutionOutlined /> },
        { key: "student", label: "Student", icon: <TeamOutlined /> },
      ],
    },
    { key: "course-management", icon: <BookOutlined />, label: "Course Management" },
    { key: "system-settings", icon: <SettingOutlined />, label: "System Settings" },
    { key: "reports", icon: <BarChartOutlined />, label: "Reports & Analytics" },
    { key: "help", icon: <QuestionCircleOutlined />, label: "Help & Support" },
  ];

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [selectedTab, setSelectedTab] = useState("dashboard");

  const contentMap: Record<string, React.ReactNode> = {
    dashboard: <Dashboard />,
    admin: <AdminManagement />, // Placeholder for Admin page
    lecturer: <LecturerManagement />, // Placeholder for Lecturer page
    student: <StudentManagement />, // Placeholder for Student page
    "course-management": <div>Course Management Page</div>, // Placeholder
    "system-settings": <div>System Settings Page</div>, // Placeholder
    reports: <div>Reports Page</div>, // Placeholder
    help: <div>Help Page</div>, // Placeholder
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="self-center justify-center items-center justify-self-center mt-8">
          <img
            src={logo}
            alt="Logo"
            style={{
              width: "100px",
              height: "100px", // Maintain a square aspect ratio
              borderRadius: "50%", // Makes it circular
              objectFit: "cover", // Ensures the image fits well
              border: "2px solid white", // Optional: Adds a white border
            }}
          />
        </div>
        <div className="text-white text-center py-4 font-bold">LearnSmart Admin</div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["dashboard"]}
          mode="inline"
          items={items}
          onClick={({ key }) => setSelectedTab(key)}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Breadcrumb style={{ margin: "16px" }}>
            <Breadcrumb.Item>{selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)}</Breadcrumb.Item>
          </Breadcrumb>
        </Header>
        <Content style={{ margin: "16px" }}>
          {contentMap[selectedTab]}
        </Content>
        <Footer style={{ textAlign: "center" }}>LearnSmart ©{new Date().getFullYear()}</Footer>
      </Layout>
    </Layout>
  );
};

export default App;
