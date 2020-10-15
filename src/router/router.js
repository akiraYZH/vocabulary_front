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
    routes: [
      {
        path: "/about/1",
        component: lazy(() => import("../pages/Account.jsx")),
        meta: { title: "1", nav: true },
      },
    ],
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
];

export default Routes;
