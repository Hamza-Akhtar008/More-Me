// component
import SvgColor from "../../../components/svg-color";
import PolicyIcon from "@mui/icons-material/PolicyOutlined";
import CoPresentIcon from "@mui/icons-material/CoPresentOutlined";
import BadgeIcon from "@mui/icons-material/Badge";
import BusinessIcon from "@mui/icons-material/BusinessOutlined";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const adminConfig = [
  {
    title: "dashboard",
    path: "/dashboard/app",
    icon: icon("ic_analytics"),
  },
  {
    title: "Invite",
    path: "/dashboard/invite",
    icon: <CoPresentIcon />,
  },
  {
    title: "users",
    path: "/dashboard/user",
    icon: icon("ic_user"),
  },
  {
    title: "Employee Management",
    path: "/dashboard/company-employee-management",
    icon: <BadgeIcon />,
  },
  {
    title: "policy",
    path: "/dashboard/policy",
    icon: <PolicyIcon />,
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
    title: "questionnaire",
    path: "/dashboard/questionnaire",
    icon: <QuestionAnswerOutlinedIcon />,
  },
  {
    title: "gamification",
    path: "/dashboard/gamification",
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

export default adminConfig;
