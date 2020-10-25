import React from "react";
import { connect } from "react-redux"; //connect链接redux
import { clearUserInfo } from "../redux/actions";
import { message, Button } from "antd";
import styled from "styled-components";

const Container = styled.div`
  max-width: 90%;
  min-height: 200px;
  width: 600px;
  margin: 0 auto;
  background: white;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 5px;
  box-shadow: 0 2px 8px #c0c0c0;
  position: relative;
  .logoutBtn {
    position: absolute;
    transform: translateX(-50%);
    bottom: 20px;
    background: #22ddb8;
    border: 1px solid #22ddb8;
    transition: 0.3s;
    box-shadow: none;
    &:hover {
      color: #22ddb8;
      background: white;
      border: 1px solid #22ddb8;
    }
  }
`;

const UserInfo = (props) => {
  const logout = () => {
    props.clearUserInfo();
    message.success("Successfully logout!");
  };

  return (
    <Container className="animate__animated animate__fadeIn">
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
          (props.user.userInfo?.book ? (
            <span>
              单词书:{" "}
              <span style={{ color: "#22DDB8" }}>
                {props.user.userInfo?.book.title}
              </span>
            </span>
          ) : (
            <span>还没选择单词书</span>
          ))}
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
)(UserInfo);
