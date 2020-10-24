import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { message } from "antd";
import {
  updateUserInfo,
  clearUserInfo,
  updateReview,
  updateTask,
} from "../redux/actions";
import { connect } from "react-redux";
import styled from "styled-components";
import getRandomArrayElements from "../utils/getRandomArrayElements";

const Container = styled.div`
  max-width: 90%;
  min-height: 200px;
  width: 800px;
  margin: 0 auto;
  background: white;
  padding: 50px;
  box-sizing: border-box;
  border-radius: 5px;
  box-shadow: 0 2px 8px #c0c0c0;
  position: relative;
  .title {
    color: #22ddb8;
    font-weight: bold;
  }

  .btn {
    background: #22ddb8;
    border: 1px solid #22ddb8;
    color: white;
    transition: 0.3s;
    box-shadow: none;

    &:hover {
      color: #22ddb8;
      background: white;
      border: 1px solid #22ddb8;
    }
  }
`;
function Study(props) {
  // 验证是否在线
  const loginToken = async () => {
    const res = await props.user.getUserInfo();

    //成功登陆
    if (res.code === 1) {
      props.updateUserInfo(res.data);
      //   今天任务单词
      const task_res = await props.words.getWords(
        props.user.userInfo?.task_today
      );
      //   已学习单词
      const review_res = await props.words.getWords(
        props.user.userInfo.learned_arr
      );

      if (task_res.code === 1) {
        //   今天任务存到redux, 开始学习
        props.updateTask(task_res.data);
      }

      if (review_res.code === 1) {
        //   复习单词存到redux, 开始学习
        let review_arr = null;
        if (review_res.data.length > 10) {
          review_arr = getRandomArrayElements(review_res.data, 10);
        } else {
          review_arr = review_res.data;
        }
        props.updateReview(review_arr);
      }
      console.log(task_res);
    } else if (res.code === -1) {
      props.clearUserInfo();
      message.error("验证信息已过期，请重新登陆！");
      props.history.push("/account");
    }
  };

  useEffect(() => {
    loginToken();
  }, []);

  return <Container></Container>;
}
export default connect((state, props) => Object.assign({}, props, state), {
  updateUserInfo,
  clearUserInfo,
  updateReview,
  updateTask,
})(withRouter(Study));
