import {
  mdiAccountCircle,
  mdiMonitor,
  mdiGithub,
  mdiLock,
  mdiAlertCircle,
  mdiSquareEditOutline,
  mdiTable,
  mdiViewList,
  mdiTelevisionGuide,
  mdiResponsive,
  mdiPalette,
  mdiReact,
} from "@mdi/js";

export default [
  {
    to: "/",
    icon: mdiMonitor,
    label: "Dashboard",
  },
  {
    to: "/condidateslist",
    label: "Condidates List",
    icon: mdiTable,
    role: 'ADMIN'
  },
  {
    to: "/userslist",
    label: "Users List",
    icon: mdiTable,
    role: 'ADMIN'
  },
  {
    to: "/teacherslist",
    label: "Teachers List",
    icon: mdiTable,
    role: 'CFD'
  },
  {
    to: "/news",
    label: "News",
    icon: mdiTable,
    role: 'STUDENT'
  },
  {
    to: "/createCode",
    label: "Create Code",
    icon: mdiTable,
    role: 'VD'
  },
  {
    to: "/sharenews",
    label: "ShareNews",
    icon: mdiTable,
    role: 'VD'
  },
  {
    to: "/message",
    label: "Message",
    icon: mdiTable,
    role: 'CFD'
  },
  {
    to: "/receivemessage",
    label: "Receive Message",
    icon: mdiTable,
    role: 'TEACHER'
  },
  {
    to: "/tcondidateslist",
    label: "TCondidatesList",
    icon: mdiTable,
    role: 'TEACHER'
  },
  // {
  //   to: "/news",
  //   label: "News",
  //   icon: mdiTable,
  //   role: 'STUDENT'
  // },
  // {
  //   to: "/tables",
  //   label: "Tables",
  //   icon: mdiTable,
  // },
  {
    to: "/forms",
    label: "Forms",
    icon: mdiSquareEditOutline,
  },
  // {
  //   to: "/ui",
  //   label: "UI",
  //   icon: mdiTelevisionGuide,
  // },
  // {
  //   to: "/responsive",
  //   label: "Responsive",
  //   icon: mdiResponsive,
  // },
  // {
  //   to: "/",
  //   label: "Styles",
  //   icon: mdiPalette,
  // },
  // {
  //   to: "/profile",
  //   label: "Profile",
  //   icon: mdiAccountCircle,
  // },
  // {
  //   to: "/login",
  //   label: "Login",
  //   icon: mdiLock,
  // },
];
