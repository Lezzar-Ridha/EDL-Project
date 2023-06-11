import { createRouter, createWebHashHistory } from "vue-router";
import Style from "@/views/StyleView.vue";
import Home from "@/views/HomeView.vue";

const routes = [
  {
    meta: {
      title: "Select style",
    },
    path: "/style",
    name: "style",
    component: Style,
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: "Dashboard",
    },
    path: "/",
    name: "dashboard",
    component: Home,
  },
  {
    meta: {
      title: "Tables",
    },
    path: "/tables",
    name: "tables",
    component: () => import("@/views/TablesView.vue"),
  },
  {
    meta: {
      title: "Forms",
    },
    path: "/forms",
    name: "forms",
    component: () => import("@/views/FormsView.vue"),
  },
  {
    meta: {
      title: "Profile",
    },
    path: "/profile",
    name: "profile",
    component: () => import("@/views/ProfileView.vue"),
  },
  {
    meta: {
      title: "Ui",
    },
    path: "/ui",
    name: "ui",
    component: () => import("@/views/UiView.vue"),
  },
  {
    meta: {
      title: "Responsive layout",
    },
    path: "/responsive",
    name: "responsive",
    component: () => import("@/views/ResponsiveView.vue"),
  },
  {
    meta: {
      title: "Login",
    },
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginView.vue"),
  },
  {
    meta: {
      title: "Error",
    },
    path: "/error",
    name: "error",
    component: () => import("@/views/ErrorView.vue"),
  },
  {
    meta: {
      title: "Condidates List",
    },
    path: "/condidateslist",
    name: "condidateslist",
    component: () => import("@/views/CondidatesList.vue"),
  },
  {
    meta: {
      title: "Users List",
    },
    path: "/userslist",
    name: "UsersList",
    component: () => import("@/views/UsersList.vue"),
  },
  {
    meta: {
      title: "News",
    },
    path: "/news",
    name: "News",
    component: () => import("@/views/News.vue"),
  },
  {
    meta: {
      title: "ShareNews",
    },
    path: "/sharenews",
    name: "ShareNews",
    component: () => import("@/views/ShareNews.vue"),
  },
  {
    meta: {
      title: "Message",
    },
    path: "/message",
    name: "Message",
    component: () => import("@/views/Message.vue"),
  },
  {
    meta: {
      title: "TeachersList",
    },
    path: "/teacherslist",
    name: "TeachersList",
    component: () => import("@/views/TeachersList.vue"),
  },
  {
    meta: {
      title: "ReceiveClaim",
    },
    path: "/receiveclaim",
    name: "ReceiveClaim",
    component: () => import("@/views/ReceiveClaim.vue"),
  },
  {
    meta: {
      title: "Note",
    },
    path: "/note",
    name: "Note",
    component: () => import("@/views/Note.vue"),
  },
  {
    meta: {
      title: "Claim",
    },
    path: "/claim",
    name: "Claim",
    component: () => import("@/views/Claim.vue"),
  },
  {
    meta: {
      title: "ReceiveMessage",
    },
    path: "/receivemessage",
    name: "ReceiveMessage",
    component: () => import("@/views/ReceiveMessage.vue"),
  },
  {
    meta: {
      title: "Create Code",
    },
    path: "/createCode",
    name: "CreateCode",
    component: () => import("@/views/CreateCode.vue"),
  },
  {
    meta: {
      title: "TCondidatesList",
    },
    path: "/tcondidateslist",
    name: "TCondidatesList",
    component: () => import("@/views/TCondidatesList.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = sessionStorage.getItem("isAuth");
  if (to.name === "login") {
    next();
  }// login route is always  okay (we could use the requires authModule flag below). prevent a redirect loop
   else if (isLoggedIn === "true") {
    next(); // i'm logged in. carry on
  } else if (to.meta && to.meta.requiresAuth === "false") {
    next(); // requires authModule is explicitly set to false
  } else {
    // always put your redirect as the default case
    next({ name: "login" }); // redirect to login
  }
});
export default router;
