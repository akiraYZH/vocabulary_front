import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux"; //connect链接redux
import { CloseCircleFilled, CheckCircleFilled } from "@ant-design/icons";
import styled from "styled-components";

const Container = styled.div`
  .questionWord {
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 0px;
  }
  .phonetic {
    font-family: "arial";
    color: grey;
    font-size: 20px;
    margin-bottom: 0px;
  }
  .type {
    font-size: 20px;
    color: #22ddb8;
    margin-bottom: 30px;
  }
  .frame {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    cursor: pointer;

    .option {
      width: 45%;
      position: relative;
      margin-bottom: 30px;
      transition: 0.5s;
      &:hover {
        transform: scale(1.1);
        box-shadow: 0 0 10px grey;
      }
      &::before {
        content: "";
        display: block;
        padding-top: 80%;
      }
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .optionText {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        background: rgba(0, 48, 37, 0.8);
        color: white;
        font-size: 16px;
      }
      .mask {
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.5);
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
        transition: 0.3s;
        .right {
          color: green;
        }
        .wrong {
          color: red;
        }
        .right,
        .wrong {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          font-size: 50px;
        }
      }
    }
  }
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

const ImgQuestion = (props) => {
  //正确答案的index下标
  const [answerIndex, setAnswerIndex] = useState(Math.floor(Math.random() * 4));
  const [options, setOptions] = useState([]);
  const optionsRef = useRef({});
  let timers = [];

  //生成选项
  const generateOptions = () => {
    // 随机生成答案下标
    setAnswerIndex(Math.floor(Math.random() * 4));
    let arr = [];
    //答案

    const answer = (
      <div className="option" onClick={() => judge(props.questionWord?.id)}>
        <img
          src={props.questionWord?.image}
          key={props.questionWord?.id}
          alt=""
        ></img>
        <span className="optionText">
          {props.questionWord?.primary_explaination}
        </span>

        <div
          className="mask"
          ref={(el) => {
            optionsRef.current[props.questionWord?.id] = el;
          }}
        >
          <CheckCircleFilled className="right" />
        </div>
      </div>
    );

    for (let i = 0; i < 3; i++) {
      arr.push(
        <div
          className="option"
          onClick={() => judge(props.questionWord?.options[i].id)}
        >
          <img
            src={props.questionWord?.options[i].image}
            key={props.questionWord?.options[i].id}
            alt=""
          ></img>
          <span className="optionText">
            {props.questionWord?.options[i].primary_explaination}
          </span>
          <div
            className="mask"
            ref={(el) => {
              optionsRef.current[props.questionWord?.options[i].id] = el;
            }}
          >
            <CloseCircleFilled className="wrong" />
          </div>
        </div>
      );
    }
    arr.splice(answerIndex, 0, answer);

    setOptions(arr);

    return arr;
  };

  //判断是否正确
  const judge = (id) => {
    //   显示正确与否

    let mask = optionsRef.current[id];
    mask.style = "opacity:1";

    timers.push(
      setTimeout(() => {
        mask.style = "";
      }, 1000)
    );

    //判断
    if (id === props.questionWord.id) {
      timers.push(
        setTimeout(() => {
          props.next();
        }, 1000)
      );
    }
  };

  useEffect(() => {
    generateOptions();
    let refCurrent = optionsRef.current;
    return () => {
      //下一题的时候清除mask
      timers.forEach((timer) => clearTimeout(timer));
      for (const key in refCurrent) {
        if (refCurrent[key]) refCurrent[key].style = "";
      }
    };
  }, [props.questionWord, props.words.review_arr]);

  return (
    <Container>
      <h2 className="questionWord">{props.questionWord?.spelling}</h2>
      <h6 className="phonetic">{props.questionWord?.phonetic}</h6>
      <h6 className="type">{props.questionWord?.primary_type.type_abbr}</h6>
      <div className="frame">{options}</div>
    </Container>
  );
};

export default connect((state, props) => {
  // 合并
  return Object.assign({}, props, state);
})(ImgQuestion);
