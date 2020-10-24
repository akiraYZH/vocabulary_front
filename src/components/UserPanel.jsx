import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux"; //connect链接redux
import { Progress, Button } from "antd";
import styled from "styled-components";

const Container = styled.div`
  h3 {
    margin-bottom: 20px;
    .nickname {
      color: #22ddb8;
    }
  }

  .progress {
    margin-bottom: 30px;
  }
  .statistic {
    margin-bottom: 20px;
    color: #22ddb8;
  }
  .frame {
    display: flex;
    margin-bottom: 30px;
    box-shadow: 0 2px 10px #eeeeee;
    .col {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .block {
        padding: 10px;
        box-sizing: border-box;
      }
    }
    .lightGreenBg {
      background: #eefffc;
    }
  }

  .buttonSet {
    display: flex;
    justify-content: space-around;
    .btn {
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
  }
`;

function UserPanel(props) {
  return (
    <Container>
      <div>
        <h3>
          <span className="nickname">{props.user.userInfo.nickname}</span>{" "}
          的记录
        </h3>
        <Progress
          type="circle"
          strokeColor={{
            "0%": "#22ddb8",
            "100%": "#7cc5e2",
          }}
          percent={parseInt(
            props.user.userInfo.learned_arr.length /
              props.user.userInfo.not_learned_arr.length
          )}
          className="progress"
        />
        <div className="statistic">
          {props.user.userInfo.learned_arr.length}/
          {props.user.userInfo.not_learned_arr.length}
        </div>
        <div className="frame">
          <div className="col">
            <div className="block lightGreenBg">今天目标</div>
            <div className="block">{props.user.userInfo.task_today.length}</div>
          </div>
          <div className="col">
            <div className="block lightGreenBg">今天任务</div>
            <div className="block">
              {props.user.userInfo.task_completed ? "完成" : "未完成"}
            </div>
          </div>
        </div>
      </div>
      <div className="buttonSet">
        <div className="">
          <Button className="btn">复习</Button>
        </div>
        <div className="col">
          <Button className="btn" onClick={() => props.history.push("/study")}>
            开始记单词
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default connect((state, props) => Object.assign({}, props, state))(
  withRouter(UserPanel)
);
