import React, { lazy } from "react";

const Routes = [
  {
    path: "/home",
    exact: true,
    component: lazy(() => import("../pages/Home.jsx")),
    meta: { title: "Home", nav: true },
  },
  {
    path: "/about",
    component: lazy(() => import("../pages/About.jsx")),
    meta: { title: "About", nav: true },
  },
  {
    path: "/account",
    exact: true,
    component: lazy(() => import("../pages/Account.jsx")),
    meta: { title: "Account", nav: true },
    routes: [
      {
        path: "/account/forget-password",
        component: lazy(() => import("../pages/ForgetPassword.jsx")),
      },
    ],
  },
  {
    path: "/study",
    exact: true,
    component: lazy(() => import("../pages/Study.jsx")),
  },
];

export default Routes;
