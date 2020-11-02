import React, { useEffect, useState } from "react";
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
import ImgQuestion from "../components/ImgQuestion";
import FinishStudy from "../components/FinishStudy";
import _axios from "../utils/_axios";
import arrSubstract from "../utils/arrSubstract";

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
  .notice {
    position: absolute;
    right: 30px;
    top: 30px;
  }
`;
function Study(props) {
  const [finished, setFinished] = useState(false);
  //新学index
  const [index, setIndex] = useState(
    sessionStorage.getItem("index")
      ? Number(sessionStorage.getItem("index"))
      : 0
  );
  //复习index
  const [reviewIndex, setReviewIndex] = useState(
    sessionStorage.getItem("reviewIndex")
      ? Number(sessionStorage.getItem("reviewIndex"))
      : 0
  );

  // 验证是否在线,
  const init = async () => {
    const res = await props.user.getUserInfo();

    //成功登陆
    if (res.code === 1) {
      props.updateUserInfo(res.data);

      //查看session中是否存在今天任务单词
      if (sessionStorage.getItem("task")) {
        props.updateTask(JSON.parse(sessionStorage.getItem("task")));
      } else {
        //   获得今天任务单词
        const task_res = await props.words.getExam(res.data.task_today);

        if (task_res.code === 1) {
          //保存到session
          sessionStorage.setItem("task", JSON.stringify(task_res.data));
          //   今天任务存到redux, 开始学习
          props.updateTask(task_res.data);
        }
      }

      //查看session中是否存在复习单词
      if (sessionStorage.getItem("review")) {
        props.updateReview(JSON.parse(sessionStorage.getItem("review")));
      } else {
        //   已学习单词
        const review_res = await props.words.getExam(res.data.learned_arr);

        if (review_res.code === 1) {
          let review_arr = [];

          //保存到session
          sessionStorage.setItem("review", JSON.stringify(review_res.data));
          //   复习单词存到redux, 开始学习

          if (review_res.data.length > 10) {
            review_arr = getRandomArrayElements(review_res.data, 10);
          } else {
            review_arr = review_res.data;
          }

          props.updateReview(review_arr);
        }
      }
    } else if (res.code === -1) {
      props.clearUserInfo();
      message.error("验证信息已过期，请重新登陆！");
      props.history.push("/account");
    }
  };

  let next = () => {
    if (index < props.words.task_today.length) {
      if (props.words.review_arr) {
        props.updateReview([
          ...props.words.review_arr,
          props.words.task_today[index],
        ]);
      } else {
        props.updateReview([props.words.task_today[index]]);
      }

      setIndex(index + 1);
    } else if (reviewIndex < props.words.review_arr.length - 1) {
      setReviewIndex(reviewIndex + 1);
    } else {
      //完成
      setFinished(true);

      //更新redux
      let not_learned_arr = arrSubstract(
        props.user.userInfo.not_learned_arr,
        props.user.userInfo.task_today
      );
      let learned_arr = [
        ...props.user.userInfo.learned_arr,
        ...props.user.userInfo.task_today,
      ];

      props.updateUserInfo({
        ...props.user.userInfo,
        not_learned_arr: not_learned_arr,
        learned_arr: learned_arr,
        task_completed: 1,
      });

      //   props.updateReview([]);
      props.updateTask([]);
      //清空session
      sessionStorage.clear();

      //更新数据库
      _axios
        .put("/api/users/update", {
          id: props.user.userInfo.id,
          not_learned_arr,
          learned_arr,
          task_today: [],
          task_completed: 1,
        })
        .then((data) => {
          if (data.data.code === 1) {
            message.success("今天任务已完成！");
          }
        });
    }
  };

  useEffect(() => {
    // props.updateReview(JSON.parse(sessionStorage.getItem("review")));
    init();
    return () => {
      sessionStorage.clear();
      props.updateReview([]);
      props.updateTask([]);
    };
  }, []);

  useEffect(() => {
    //保存到session
    sessionStorage.setItem("index", index);
    sessionStorage.setItem("reviewIndex", reviewIndex);
  }, [index, reviewIndex]);

  useEffect(() => {
    //保存到session
    if (sessionStorage.getItem("review") && props.words.review_arr.length) {
      sessionStorage.setItem("review", JSON.stringify(props.words.review_arr));
    }
    // sessionStorage.setItem("review", JSON.stringify(props.words.review_arr));
  }, [props.words.review_arr]);

  const questionWord = () => {
    if (index < props.words.task_today.length) {
      return props.words.task_today[index];
    } else if (reviewIndex < props.words.review_arr?.length) {
      return props.words.review_arr[reviewIndex];
    } else {
      return;
    }
  };

  const questPanel = (
    <>
      <div className="notice">
        <span>
          学习: {index}/{props.words.task_today?.length}
        </span>
        &nbsp;
        <span>
          复习: {reviewIndex}/{props.words.review_arr?.length}
        </span>
      </div>

      <ImgQuestion questionWord={questionWord()} next={next} />
    </>
  );

  const finishStudy = <FinishStudy />;
  return <Container>{finished ? finishStudy : questPanel}</Container>;
}

export default connect((state, props) => Object.assign({}, props, state), {
  updateUserInfo,
  clearUserInfo,
  updateReview,
  updateTask,
})(withRouter(Study));
