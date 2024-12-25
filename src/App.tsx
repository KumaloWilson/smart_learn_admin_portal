import React, { useState } from "react";
import {
  DashboardOutlined,
  UserOutlined,
  BookOutlined,
  SettingOutlined,
  BarChartOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Breadcrumb, } from "antd";
import type { MenuProps } from "antd";
import { theme } from "antd";
import Dashboard from "./views/dashboard";
import UserManagement from "./views/user_management";

const { Header, Content, Footer, Sider } = Layout;



const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const items: MenuProps["items"] = [
    { key: "dashboard", icon: <DashboardOutlined />, label: "Dashboard" },
    { key: "user-management", icon: <UserOutlined />, label: "User Management" },
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
    "user-management": <UserManagement />,
    "course-management": <div>Course Management Page</div>, // Placeholder
    "system-settings": <div>System Settings Page</div>, // Placeholder
    reports: <div>Reports Page</div>, // Placeholder
    help: <div>Help Page</div>, // Placeholder
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
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
