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
  BankOutlined,
  ScheduleOutlined,
  DollarOutlined,
  SafetyOutlined,
  FileProtectOutlined,
  AuditOutlined,
  BookFilled,
  BuildOutlined,
  CalendarOutlined,
  NotificationOutlined,
  MessageOutlined,
  ProjectOutlined,
  TrophyOutlined,
  ExperimentOutlined,
  ClockCircleOutlined
} from "@ant-design/icons";
import { Layout, Menu, Breadcrumb } from "antd";
import type { MenuProps } from "antd";
import { theme } from "antd";
import { QueryClient, QueryClientProvider } from "react-query";
import Dashboard from "./views/dashboard";
import AdminManagement from './views/user_management';
import LecturerManagement from "./views/lecturer_management";
import StudentManagement from "./views/student_management";
import logo from "./assets/logo.jpeg";
import CourseManagement from "./views/course_management";
import SchoolManagement from "./views/school_management";
import DepartmentManagement from "./views/department_management";
import ProgramManagement from "./views/program_management";

const queryClient = new QueryClient();
const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const items: MenuProps["items"] = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard"
    },
    {
      key: "academic",
      icon: <BankOutlined />,
      label: "Academic",
      children: [
        { key: "schools", label: "Schools/Faculties", icon: <BookFilled /> },
        { key: "departments", label: "Departments", icon: <BuildOutlined /> },
        { key: "programs", label: "Programs", icon: <ProjectOutlined /> },
        { key: "courses", label: "Courses", icon: <BookOutlined /> }
      ]
    },
    {
      key: "user-management",
      icon: <UserOutlined />,
      label: "User Management",
      children: [
        { key: "admin", label: "Administrators", icon: <IdcardOutlined /> },
        { key: "lecturer", label: "Lecturers", icon: <SolutionOutlined /> },
        { key: "student", label: "Students", icon: <TeamOutlined /> }
      ]
    },
    {
      key: "schedule",
      icon: <ScheduleOutlined />,
      label: "Scheduling",
      children: [
        { key: "timetable", label: "Timetables", icon: <CalendarOutlined /> },
        { key: "examinations", label: "Examinations", icon: <FileProtectOutlined /> },
        { key: "rooms", label: "Room Allocation", icon: <BuildOutlined /> }
      ]
    },
    {
      key: "finance",
      icon: <DollarOutlined />,
      label: "Finance",
      children: [
        { key: "fees", label: "Fee Management" },
        { key: "payments", label: "Payments" },
        { key: "scholarships", label: "Scholarships" },
        { key: "expenses", label: "Expenses" }
      ]
    },
    {
      key: "research",
      icon: <ExperimentOutlined />,
      label: "Research",
      children: [
        { key: "publications", label: "Publications" },
        { key: "projects", label: "Research Projects" },
        { key: "grants", label: "Grants" },
        { key: "labs", label: "Laboratories" }
      ]
    },
    {
      key: "student-affairs",
      icon: <TeamOutlined />,
      label: "Student Affairs",
      children: [
        { key: "attendance", label: "Attendance", icon: <ClockCircleOutlined /> },
        { key: "disciplinary", label: "Disciplinary" },
        { key: "clubs", label: "Clubs & Societies" },
        { key: "housing", label: "Housing" }
      ]
    },
    {
      key: "library",
      icon: <BookOutlined />,
      label: "Library",
      children: [
        { key: "books", label: "Books" },
        { key: "journals", label: "Journals" },
        { key: "e-resources", label: "E-Resources" },
        { key: "reservations", label: "Reservations" }
      ]
    },
    {
      key: "communication",
      icon: <MessageOutlined />,
      label: "Communication",
      children: [
        { key: "announcements", label: "Announcements", icon: <NotificationOutlined /> },
        { key: "emails", label: "Email Management" },
        { key: "sms", label: "SMS Management" }
      ]
    },
    {
      key: "examination",
      icon: <FileProtectOutlined />,
      label: "Examination",
      children: [
        { key: "results", label: "Results" },
        { key: "transcripts", label: "Transcripts" },
        { key: "certificates", label: "Certificates" }
      ]
    },
    {
      key: "quality",
      icon: <TrophyOutlined />,
      label: "Quality Assurance",
      children: [
        { key: "evaluations", label: "Evaluations" },
        { key: "feedback", label: "Feedback" },
        { key: "accreditation", label: "Accreditation" }
      ]
    },
    {
      key: "security",
      icon: <SafetyOutlined />,
      label: "Security",
      children: [
        { key: "access-control", label: "Access Control" },
        { key: "audit-logs", label: "Audit Logs", icon: <AuditOutlined /> },
        { key: "backups", label: "Backups" }
      ]
    },
    {
      key: "system-settings",
      icon: <SettingOutlined />,
      label: "System Settings"
    },
    {
      key: "reports",
      icon: <BarChartOutlined />,
      label: "Reports & Analytics"
    },
    {
      key: "help",
      icon: <QuestionCircleOutlined />,
      label: "Help & Support"
    }
  ];

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [selectedTab, setSelectedTab] = useState("dashboard");

  const contentMap: Record<string, React.ReactNode> = {
    dashboard: <Dashboard />,

    //Academic
    schools: <SchoolManagement />,
    departments: <DepartmentManagement />,
    programs: <ProgramManagement />,
    courses: <CourseManagement />,


    //User Management
    admin: <AdminManagement />,
    lecturer: <LecturerManagement />,
    student: <StudentManagement />,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="self-center justify-center items-center justify-self-center mt-8">
            <img
              src={logo}
              alt="Logo"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid white",
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
    </QueryClientProvider>
  );
};

export default App;