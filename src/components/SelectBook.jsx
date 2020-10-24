import React from "react";
import { connect } from "react-redux"; //connect链接redux
import { clearUserInfo } from "../redux/actions";
import { message, Button } from "antd";
import styled from "styled-components";

const Container = styled.div``;

const SelectBook = (props) => {
  // const logout = () => {
  //   props.clearUserInfo();
  //   message.success("Successfully logout!");
  // };

  const selectBookBtn = (
    <Button type="primary" className="Btn" onClick={logout}>
      Log out
    </Button>
  );

  return (
    <Container className="animate__animated animate__fadeInUp">
      <h2>
        Hello, &nbsp;
        <span style={{ color: "#22DDB8" }}>
          {props.user.userInfo?.nickname}
        </span>
        !
      </h2>
      <h3>账号:&nbsp;{props.user.userInfo?.email}</h3>
      <div>
        {props.user.userInfo &&
          (props.user.userInfo?.book
            ? props.user.userInfo?.book.title
            : selectBookBtn)}
      </div>
      <Button type="primary" className="logoutBtn" onClick={logout}>
        Log out
      </Button>
    </Container>
  );
};

export default connect(
  (state, props) => {
    // 合并
    return Object.assign({}, props, state);
  },
  {
    //放actions
    clearUserInfo,
  }
)(SelectBook);
