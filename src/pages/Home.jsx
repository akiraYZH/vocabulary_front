import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, List, Typography } from "antd";
import styled from "styled-components";
import _axios from "../utils/_axios";
import ShowCase from "../components/ShowCase";

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
  .bookList {
    display: flex;
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
const Home = (props) => {
  const SelectBook = null;
  const StartPanel = null;
  console.log(props);
  const [books, setBooks] = useState([]);
  const greeting = () => {
    if (props.user.userInfo && props.user.userInfo.book) {
      // return props.user.userInfo?.book ?  StartPanel;
    } else {
      return (
        <div>
          <p>请先登陆。</p>
          <Button
            type="primary"
            onClick={() => props.history.push("/account")}
            className="btn"
          >
            Go to Login
          </Button>
        </div>
      );
    }
  };

  return (
    <Container className="animate__animated animate__fadeIn">
      <ShowCase />
      {greeting()}
    </Container>
  );
};

export default connect((state, props) => Object.assign({}, props, state))(Home);
