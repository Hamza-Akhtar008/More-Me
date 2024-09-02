// component
import SvgColor from "../../../components/svg-color";
import PolicyIcon from "@mui/icons-material/PolicyOutlined";
import CoPresentIcon from "@mui/icons-material/CoPresentOutlined";
import BusinessIcon from "@mui/icons-material/BusinessOutlined";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import ChatIcon from '@mui/icons-material/Chat';
import BadgeIcon from "@mui/icons-material/Badge";

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const userConfig = [
  {
    title: "dashboard",
    path: "/dashboard/app",
    icon: icon("ic_analytics"),
  },
  {
    title: "policy",
    path: "/dashboard/policy",
    icon: <PolicyIcon />,
  },
  {
    title: "Task Management",
    path: "/dashboard/task-management",
    icon: <BadgeIcon />,
  },
  {
    title: "Connects",
    path: "/dashboard/thread",
    icon: icon("ic_lock"),
  },
  // {
  //   title: 'company',
  //   path: '/dashboard/company',
  //   icon: <BusinessIcon />,
  // },
  {
    title: "articles",
    path: "/dashboard/articles",
    icon: icon("ic_blog"),
  },
  {
    title: "Marketplace",
    path: "/dashboard/products",
    icon: icon("ic_cart"),
  },
  {
    title: "Chat",
    path: "/chat",
    icon: <ChatIcon />,
  },
  {
    title: "questionnaire",
    path: "/dashboard/dynamicQuestionnaire",
    icon: <QuestionAnswerOutlinedIcon />,
  },
  {
    title: "gamification",
    path: "/gamification",
    icon: <QuestionAnswerOutlinedIcon />,
  },
  {
    title: "logout1",
    path: "/login",
    icon: icon("ic_lock"),
  },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default userConfig;
