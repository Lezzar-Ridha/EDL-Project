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
    role: 'admin'
  },
  {
    to: "/userslist",
    label: "Users List",
    icon: mdiTable,
    role: 'admin'
  },
  {
    to: "/teacherslist",
    label: "Teachers List",
    icon: mdiTable,
    role: 'cfd'
  },
  {
    to: "/news",
    label: "News",
    icon: mdiTable,
    role: 'participant'
  },
  {
    to: "/createCode",
    label: "Create Code",
    icon: mdiTable,
    role: 'viceDean'
  },
  {
    to: "/sharenews",
    label: "ShareNews",
    icon: mdiTable,
    role: 'viceDean'
  },
  {
    to: "/message",
    label: "Message",
    icon: mdiTable,
    role: 'cfd'
  },
  {
    to: "/receivemessage",
    label: "Receive Message",
    icon: mdiTable,
    role: 'teacher'
  },
  {
    to: "/tcondidateslist",
    label: "CondidatesList",
    icon: mdiTable,
    role: 'teacher'
  },
  {
    to: "/receiveclaim",
    label: "ReceiveClaim",
    icon: mdiTable,
    role: 'cfd'
  },
  {
    to: "/claim",
    label: "Claim",
    icon: mdiTable,
    role: 'participant'
  },
  // {
  //   to: "/note",
  //   label: "Note",
  //   icon: mdiTable,
  //   role: 'TEACHER'
  // },
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
