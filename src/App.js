import React, { Suspense } from "react";
import { withRouter } from "react-router-dom";
import _renderRoutes from "./utils/_renderRoutes"; // 生成所有路由
import navFilter from "./utils/navFilter"; //生成导航栏需要的路由
import routes from "./router/router";
import Nav from "./components/Nav";
import "./App.scss";
import "./assets/reset.scss";
import "./assets/index.scss";

function App() {
  return (
    <div className="App">
      <Nav
        slideDirection="left"
        navBgColor="rgb(37, 37, 37)"
        navTxtColor="white"
        navActiveBgColor="linear-gradient(
          to bottom,
          rgb(113, 241, 243),
          rgb(134, 255, 164)
        )"
        navActiveTxtColor="white"
        sideNavBgColor="rgb(37, 37, 37)"
        sideNavTxtColor="white"
        routes={navFilter(routes)}
      ></Nav>
      {/* routes */}
      <Suspense fallback={<div>loading</div>}>{_renderRoutes(routes)}</Suspense>
    </div>
  );
}

export default withRouter(App);
