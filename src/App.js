import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import { matchRoutes, renderRoutes } from "react-router-config";
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
        routes={routes}
      ></Nav>
      {/* routes */}
      <Suspense fallback={<div>loading</div>}>{renderRoutes(routes)}</Suspense>
    </div>
  );
}

export default App;
