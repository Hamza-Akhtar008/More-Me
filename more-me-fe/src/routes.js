import { Navigate, useNavigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import SimpleLayout from "./layouts/simple";
//
import BlogPage from "./pages/BlogPage";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import Page404 from "./pages/Page404";
import ProductsPage from "./pages/ProductsPage";
import DashboardAppPage from "./pages/DashboardAppPage";
import InvitePage from "./pages/InvitePage";
import CompanyPage from "./pages/CompanyPage";
import CompanyEmployeeManagement from "./pages/CompanyEmployeeManagement";
import TaskManagement from "./pages/TaskManagement";
import PolicyPage from "./pages/PolicyPage";
import Questions from "./pages/Questions1";
import Contact from "./pages/ContactUs";
import ThreadPage from "./components/thread/ThreadPage";
import { useAuth } from "./context/AuthContext";
import UserPolicyPage from "./pages/UserPolicyPage";
import QuestionnairePage from "./pages/QuestionnairePage";
import AttemptQuestions from "./pages/Questions/AttemptQuestions";
import ChatPage from "./pages/Chat";
import ForgetPassword from "./pages/User/ForgetPassword";
import ProfilePage from "./pages/User/ProfilePage";
import EditPreferencePage from "./pages/User/EditPreferencePage";
import CompanyDetails from "./pages/CompanyDetails";
import GamificationPage from "./pages/GamificationPage";
import GamificationAttempt from "./pages/GamificationsAttempt";
import DynamicQuestionnaire from "./pages/DynamicQuestion/dynmicQuestionnaires";
import EditProfilePage from "./pages/EditProfilePage";

export default function Router() {
  const { isAuthenticated } = useAuth();
  const storedUserData = JSON.parse(localStorage.getItem("currentUser"));
  const role = storedUserData?.user?.role ? storedUserData?.user?.role : "";
  const isSuperAdmin = role == "super-admin" ? true : false;
  const isAdmin = role == "admin" ? true : false;
  const isDepartmentHead = storedUserData?.user?.is_department_head
  const navigate = useNavigate();

  const dashboardRoutes = [
    { element: <Navigate to="/dashboard/app" />, index: true },
    { path: "app", element: <DashboardAppPage /> },
    { path: "invite", element: <InvitePage /> },
    { path: "policy", element: <PolicyPage /> },
    {
      path: isSuperAdmin ? "company" : "*",
      element: isSuperAdmin ? <CompanyPage /> : <Navigate to="/404" />,
    },
    {
      path: isAdmin ? "company-employee-management" : undefined,
      element: isAdmin ? <CompanyEmployeeManagement /> : <Navigate to="/404" />,
    },
    // {
    //   path: isDepartmentHead ? "task-management" : undefined,
    //   element: isDepartmentHead ? <TaskManagement /> : <Navigate to="/404" />,
    // },
    {
      path: "task-management",
      element: <TaskManagement />
    },
    { path: "user", element: <UserPage /> },
    { path: "products", element: <ProductsPage /> },
    { path: "articles", element: <BlogPage /> },
    { path: "thread", element: <ThreadPage /> },
    {
      path: "questionnaire",
      element:
        isAuthenticated && !isSuperAdmin ? (
          <QuestionnairePage />
        ) : (
          <Navigate to="/login" />
        ),
    },
    {
      path: "company/:id",
      element:
        isAuthenticated && isSuperAdmin ? (
          <CompanyDetails />
        ) : (
          <Navigate to="/404" />
        ),
    },
    {
      path: "gamification",
      element:
        isAuthenticated && !isSuperAdmin ? (
          <GamificationPage />
        ) : (
          <Navigate to="/login" />
        ),
    },
  ];

  const userDashBoardRoutes = [
    { element: <Navigate to="/dashboard/app" />, index: true },
    { path: "app", element: <DashboardAppPage /> },
    { path: "invite", element: <InvitePage /> },
    { path: "policy", element: <UserPolicyPage /> },
    {
      path: isSuperAdmin ? "company" : "*",
      element: isSuperAdmin ? <CompanyPage /> : <Navigate to="/404" />,
    },
    { path: "user", element: <UserPage /> },
    { path: "products", element: <ProductsPage /> },
    { path: "articles", element: <BlogPage /> },
    { path: "thread", element: <ThreadPage /> },
    { path: "dynamicQuestionnaire", element: <DynamicQuestionnaire/> },
    { path: "editProfilePage", element: <EditProfilePage/> },

  ];

  const routes = useRoutes([
    {
      path: "/dashboard",
      element: isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />,
      children: role == "user" ? userDashBoardRoutes : dashboardRoutes,
    },
    {
      path: "login",
      element: isAuthenticated ? (
        <Navigate to="/dashboard/app" />
      ) : (
        <LoginPage />
      ),
    },
    {
      path: "questionnaire",
      element: role == "user" && <Questions />,
    },
    {
      path: "dynamicQuestionnaire",
      element: role == "user" && <DynamicQuestionnaire />,
    },
    {
      path: "editProfilePage",
      element:role == "user" && <EditProfilePage />
    },
    {
      path: "gamification",
      element: role == "user" && <GamificationAttempt />,
    },
    {
      path: "/chat",
      element: isAuthenticated ? <ChatPage /> : <Navigate to="/login" />,
    },
    {
      path: "/profile",
      element: isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />,
    },
    {
      path: "/EditPreferencePage",
      element: isAuthenticated ? <EditPreferencePage /> : <Navigate to="/login" />,
    },
    {
      element: isAuthenticated ? <SimpleLayout /> : <Navigate to="/login" />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    {
      path: "contact",
      element: <Contact />,
    },
    {
      path: "forgetPassword",
      element: <ForgetPassword />,
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
