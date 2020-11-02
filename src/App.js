import React, { Suspense, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { updateUserInfo, clearUserInfo } from "./redux/actions";
import { message } from "antd";
// import _axios from "./utils/_axios";
import _renderRoutes from "./utils/_renderRoutes"; // 生成所有路由
import navFilter from "./utils/navFilter"; //生成导航栏需要的路由
import routes from "./router/router";
import Nav from "./components/Nav";
import "./App.scss";
import "./assets/reset.scss";
import "./assets/index.scss";

function App(props) {
  const loginToken = async () => {
    const res = await props.user.getUserInfo();
    console.log(process.env);
    if (res.code === 1) {
      props.updateUserInfo(res.data);
    } else if (res.code === -1) {
      props.clearUserInfo();
      message.error("验证信息已过期，请重新登陆！");
      props.history.push("/account");
    }
  };

  useEffect(() => {
    loginToken();
  }, []);

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
        fontFamily="couture-bld"
        routes={navFilter(routes)}
        logo={require("./assets/img/Notion_app_logo.png")}
      ></Nav>
      {/* routes */}
      <Suspense fallback={<div>loading</div>}>{_renderRoutes(routes)}</Suspense>
    </div>
  );
}
// connect两个参数，第一个函数用于合并东西, 第二个json包装action
export default connect((state, props) => Object.assign({}, props, state), {
  updateUserInfo,
  clearUserInfo,
})(withRouter(App));
