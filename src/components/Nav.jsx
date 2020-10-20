import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
// antd
import { Menu, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
const SubMenu = Menu.SubMenu;

const $bgColor = "rgb(37, 37, 37)";
const $bgColorActive = "rgb(113, 241, 243)";
const $txtColor = "#fff";
const $fontFamily = "";

// style for body
const body = document.querySelector("body");

body.style = `padding-top: 100px;`;

// css *************************************************************************************
// css for nav
const StyledBox = styled.div`
  background-color: ${$bgColor};
  box-shadow: 0 2px 10px grey;
  position: fixed;
  top: 0px;
  width: 100%;
  font-family: ${$fontFamily};
  z-index: 9;

  .nav {
    position: relative;
    margin: 0 auto;
    max-width: 1000px;
    background-color: ${$bgColor};
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    color: ${$txtColor};
    padding: 0;
    box-sizing: border-box;

    .logo {
      height: 100%;
      max-width: 100px;
      width: 100px;
      margin-right: 10vw;
      line-height: 50px;
      .logoImg {
        object-fit: contain;
        width: 100%;
        height: 100%;
        padding: 10px;
        box-sizing: border-box;
      }
    }
    .navBox {
      display: flex;
      margin: 0;
      padding: 0;
      background: none;
      text-align: center;
      border: none;
    }
    .ant-menu-submenu {
      top: 0;
    }
    .item {
      display: block;
      width: 160px;
      line-height: 50px;
      transition: 0.6s;
      color: ${$txtColor};
      text-decoration: none;
      margin: 0;

      &:hover {
        background: rgba(0, 0, 0, 0.6);
        color: ${$txtColor};
        text-decoration: none;
        margin: 0;
      }
    }
    .itemActive {
      display: block;
      line-height: 50px;
      width: 160px;
      transition: 0.3s;
      text-decoration: none;
      background-image: linear-gradient(
        to bottom,
        ${$bgColorActive},
        rgb(134, 255, 164)
      );
      color: ${$txtColor};
      margin: 0;
    }

    .sideNav {
      display: none;
      height: 100%;
      align-items: center;
      background-color: ${$bgColor};
      .menuBtn {
        display: flex;
        height: 100%;
        align-items: center;
        margin-right: 20px;
      }
    }
  }
  @media only screen and (max-width: 600px) {
    .nav {
      justify-content: space-between;
      .navBox {
        display: none;
      }

      .sideNav {
        display: flex;
      }
    }
  }
`;

// css for sideNav
const StyledSideNav = styled.div`
  background-color: ${$bgColor};
  min-height: 100vh;

  .navBox {
    margin: 0;
    padding: 0;
    background: none;
    text-align: center;
    border: none;
    overflow: hidden;
  }
  .ant-menu-sub.ant-menu-inline {
    background: transparent;
  }
  .ant-menu-sub.ant-menu-inline > .ant-menu-item,
  .ant-menu-sub.ant-menu-inline > .ant-menu-submenu > .ant-menu-submenu-title {
    background: transparent;
    &:hover {
      background: rgba(0, 0, 0, 0.6);
    }
  }

  .ant-menu-item-active {
    background: rgba(0, 0, 0, 0.6);
  }
  .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
    background: rgba(0, 0, 0, 0.6);
  }

  .ant-menu-sub.ant-menu-inline {
    background: rgba(0, 0, 0, 0.1);
  }
  .item {
    display: block;
    line-height: 50px;
    transition: 0.6s;
    color: ${$txtColor};
    text-decoration: none;
    margin: 0;
    background: transparent;
  }

  .list {
    width: 250px;
  }
  .fullList {
    width: "auto";
  }
  .link {
    color: ${$txtColor};
  }
`;

// the class body *************************************************************************************
class Nav extends React.Component {
  constructor(...props) {
    super(...props);

    this.props.history.listen((link) => {
      this.setState({
        current: link.pathname,
      });
    });

    this.state = {
      current: "",
      drawerVisible: false,
      slideDirection: this.props.slideDirection
        ? this.props.slideDirection
        : "left",
      navBgColor: this.props.navBgColor ? this.props.navBgColor : "",
      navTxtColor: this.props.navTxtColor ? this.props.navTxtColor : "",
      navActiveBgColor: this.props.navActiveBgColor
        ? this.props.navActiveBgColor
        : "",
      navActiveTxtColor: this.props.navActiveTxtColor
        ? this.props.navActiveTxtColor
        : "",
      sideNavBgColor: this.props.sideNavBgColor
        ? this.props.sideNavBgColor
        : "",
      sideNavTxtColor: this.props.sideNavTxtColor
        ? this.props.sideNavTxtColor
        : "",
      routes: this.props.routes ? this.props.routes : [],
      fontFamily: this.props.fontFamily ? this.props.fontFamily : "",
      logo: this.props.logo,
      firstRender: true,
    };
    console.log(this.state.logo);
  }
  //prevent memory leak
  componentWillUnmount = () => {
    this.setState = (state, callback) => {
      return;
    };
  };

  //judge if it belongs to current path
  isThisRoute(targetPath) {
    if (targetPath === "/") {
      if (this.props.location.pathname === targetPath) {
        return true;
      } else {
        return false;
      }
    } else {
      return this.props.location.pathname.startsWith(targetPath);
    }
  }

  onClick({ key }) {
    this.closeDrawer();
  }

  showDrawer() {
    console.log(this.state);
    this.setState({
      ...this.state,
      drawerVisible: true,
    });
  }
  closeDrawer() {
    this.setState({
      ...this.state,
      drawerVisible: false,
    });
  }

  render() {
    //deal with color props *************************************************************************************
    //modify css only at first render
    if (this.state.firstRender) {
      if (this.state.sideNavBgColor) {
        StyledSideNav.componentStyle.rules.push(
          `background:${this.state.sideNavBgColor};`
        );
      }
      if (this.state.sideNavTxtColor) {
        StyledSideNav.componentStyle.rules.push(
          `color:${this.state.sideNavTxtColor};`
        );
        StyledSideNav.componentStyle.rules.push(
          `.ant-menu-submenu > .ant-menu-submenu-title {
            background: transparent;
            color: ${this.state.sideNavTxtColor};
            &:hover{
              background: rgba(0, 0, 0, 0.6);
            }
          }`
        );
      }

      if (this.state.navTxtColor) {
        StyledBox.componentStyle.rules.push(`
        .ant-menu-submenu > .ant-menu-submenu-title {
          padding: 0;
          color: ${this.state.navTxtColor};
          
      }
        `);
      }

      if (
        this.state.slideDirection === "top" ||
        this.state.slideDirection === "bottom"
      ) {
        StyledSideNav.componentStyle.rules.push(`min-height:auto;`);
      }
      //first render finished
      this.state.firstRender = false;
    }

    // side nav body *************************************************************************************
    const SideNav = (
      <div>
        <div className="menuBtn">
          <MenuOutlined onClick={this.showDrawer.bind(this)} />
        </div>

        <Drawer
          placement={this.state.slideDirection}
          closable={false}
          onClose={this.closeDrawer.bind(this)}
          visible={this.state.drawerVisible}
          bodyStyle={{
            padding: 0,
            fontFamily: this.state.fontFamily,
          }}
        >
          <StyledSideNav
            style={{ padding: "20px 0 0", boxSizing: "border-box" }}
          >
            {recursiveSubMenu.bind(this, {
              routes: this.state.routes,
              isFirstLevel: true,
              route: null,
              isNav: false,
              mode: "inline",
            })()}
          </StyledSideNav>
        </Drawer>
      </div>
    );

    // generate nav items ********************************************************************
    function recursiveSubMenu(
      params = {
        routes: [],
        isFirstLevel: true,
        route: null,
        isNav: true,
        mode: "horizontal",
      }
    ) {
      if (params.isFirstLevel) {
        return (
          <Menu
            onClick={this.onClick.bind(this)}
            mode={params.mode}
            className="navBox"
          >
            {params.routes.map((route) => {
              if (!route.routes) {
                return (
                  <Menu.Item
                    key={route.path}
                    className={
                      (params, params.mode !== "inline")
                        ? this.isThisRoute(route.path)
                          ? "itemActive"
                          : "item"
                        : ""
                    }
                    style={{
                      border: "none",
                    }}
                  >
                    <Link
                      to={route.path}
                      style={
                        this.isThisRoute(route.path)
                          ? {
                              color:
                                params.mode !== "inline"
                                  ? this.state.navActiveTxtColor
                                  : this.state.sideNavTxtColor,
                              background:
                                params.mode !== "inline" &&
                                this.state.navActiveBgColor,
                            }
                          : {
                              color:
                                params.mode !== "inline"
                                  ? this.state.navTxtColor
                                  : this.state.sideNavTxtColor,
                            }
                      }
                    >
                      {route.meta.title}
                    </Link>
                  </Menu.Item>
                );
              } else {
                return recursiveSubMenu.bind(this, {
                  routes: route.routes,
                  isFirstLevel: false,
                  route: route,
                  isNav: true,
                  mode: params.mode,
                })();
              }
            })}
          </Menu>
        );
      } else {
        return (
          <SubMenu
            key={params.route.path}
            title={params.route.meta.title}
            className={
              this.isThisRoute(params.route.path) && params.isNav
                ? "itemActive"
                : "item"
            }
            style={
              this.isThisRoute(params.route.path) && params.isNav
                ? {
                    color: this.state.navActiveTxtColor,
                    background:
                      params.mode !== "inline"
                        ? this.state.navActiveBgColor
                        : "",
                    border: "none",
                  }
                : {
                    border: "none",
                  }
            }
          >
            {params.routes.map((route) => {
              if (!route.routes) {
                return (
                  <Menu.Item
                    key={route.path}
                    style={{ minWidth: "100px", border: "none" }}
                  >
                    <Link
                      to={route.path}
                      style={
                        params.mode === "inline"
                          ? {
                              color: this.state.sideNavTxtColor,
                            }
                          : {}
                      }
                    >
                      {route.meta.title}
                    </Link>
                  </Menu.Item>
                );
              } else {
                return recursiveSubMenu.bind(this, {
                  routes: route.routes,
                  isFirstLevel: false,
                  route: route,
                  isNav: false,
                  mode: params.mode,
                })();
              }
            })}
          </SubMenu>
        );
      }
    }

    return (
      <StyledBox component="div" style={{ fontFamily: this.state.fontFamily }}>
        <div className="nav" style={{ backgroundColor: this.state.navBgColor }}>
          <div className="logo">
            <img src={this.state.logo} className="logoImg" />
          </div>
          {recursiveSubMenu.bind(this, {
            routes: this.state.routes,
            isFirstLevel: true,
            route: null,
            isNav: false,
            mode: "horizontal",
          })()}
          <div className="sideNav">{SideNav}</div>
        </div>
      </StyledBox>
    );
  }
}

export default withRouter(Nav);
