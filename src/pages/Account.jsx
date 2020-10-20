import React, { Component } from "react";
import { connect } from "react-redux";
import AccountTabs from "../components/AccountTabs";
import UserInfo from "../components/UserInfo";

import styled from "styled-components";

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;
const Account = (props) => {
  const userInfo = <UserInfo />;
  const accountTabs = <AccountTabs />;
  return (
    <Container className="animate__animated animate__fadeIn">
      {props.userInfo ? userInfo : accountTabs}
    </Container>
  );
};

export default connect((state, props) => Object.assign({}, props, state))(
  Account
);
