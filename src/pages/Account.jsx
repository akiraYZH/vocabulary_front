import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import AccountTabs from "../components/AccountTabs";
import UserInfo from "../components/UserInfo";
import { message } from "antd";
import { updateUserInfo, clearUserInfo } from "../redux/actions";
import styled from "styled-components";

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;
const Account = (props) => {
  const userInfo = <UserInfo />;
  const accountTabs = <AccountTabs />;
  // 验证是否在线
  const loginToken = async () => {
    const res = await props.user.getUserInfo();

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
    <Container className="animate__animated animate__fadeIn">
      {props.user.userInfo ? userInfo : accountTabs}
    </Container>
  );
};

export default connect((state, props) => Object.assign({}, props, state), {
  updateUserInfo,
  clearUserInfo,
})(withRouter(Account));
