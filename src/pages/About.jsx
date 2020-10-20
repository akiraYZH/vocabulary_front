import React from "react";
import { connect } from "react-redux"; //connect链接redux
import { clearUserInfo } from "../redux/actions";
import { message, Button, Divider } from "antd";
import styled from "styled-components";
import CubeAnimation from "../components/CubeAnimation";

const Container = styled.div`
  max-width: 90%;
  min-height: 200px;
  width: 800px;
  margin: 0 auto;
  background: white;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 5px;
  box-shadow: 0 2px 8px #c0c0c0;
  position: relative;
  .title {
    color: #22ddb8;
  }
`;

const About = () => {
  return (
    <Container className="animate__animated animate__fadeIn">
      <h2 className="title">About this website</h2>
      <p>
        I made this website for pratice of my web develop skills and for
        personal study of french.
      </p>
      <p>此网页是为个人兴趣，并为个人学习法语而而开发。</p>
      <CubeAnimation></CubeAnimation>
    </Container>
  );
};

export default About;
