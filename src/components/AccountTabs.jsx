import React, { Component } from "react";
import styled from "styled-components";
import { Tabs } from "antd";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
const { TabPane } = Tabs;

const Section = styled.section`
  max-width: 90%;
  width: 600px;
  margin: 0 auto;
  background: white;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 5px;
  box-shadow: 0 2px 8px #c0c0c0;
  .ant-tabs-nav-list {
    width: 100%;
    .ant-tabs-tab-btn {
      text-align: center;
      width: 100%;
    }

    .ant-tabs-tab {
      width: 100%;
    }
  }
`;
class AccountTabs extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      key: "login",
    };
  }

  callback(key) {
    this.setState({ ...this.state, key: key });
  }
  goToLogin() {
    this.setState({ ...this.state, key: "login" });
  }

  render() {
    return (
      <Section>
        <Tabs
          activeKey={this.state.key}
          onChange={this.callback.bind(this)}
          className="tabs"
          centered={true}
        >
          <TabPane tab="Login" key="login">
            <LoginForm></LoginForm>
          </TabPane>
          <TabPane tab="Sign up" key="register">
            <SignUpForm goToLogin={this.goToLogin.bind(this)}></SignUpForm>
          </TabPane>
        </Tabs>
      </Section>
    );
  }
}

export default AccountTabs;
