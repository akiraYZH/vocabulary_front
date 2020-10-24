import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { updateUserInfo, clearUserInfo } from "../redux/actions";
import { Button, message } from "antd";
import styled from "styled-components";
import _axios from "../utils/_axios";
import ShowCase from "../components/ShowCase";
import SelectBook from "../components/SelectBook";
import UserPanel from "../components/UserPanel";

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
  const [books, setBooks] = useState([]);
  const [showSelectBook, setShowSelectBook] = useState(false);
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

  const closeSelectBook = () => {
    setShowSelectBook(false);
  };
  const getBooks = async () => {
    const res = await _axios.get("/api/books/get").then((data) => data.data);

    if (res.code === 1) {
      setBooks(res.data);
    }
  };
  useEffect(() => {
    getBooks();
  }, []);

  const greeting = () => {
    if (props.user.userInfo && !props.user.userInfo.book) {
      //已经登陆但没有选书
      return (
        <div>
          <ShowCase books={books} />
          <p>还没选择单词书。</p>
          <Button
            type="primary"
            onClick={() => setShowSelectBook(true)}
            className="btn"
          >
            选择单词书
          </Button>
        </div>
      );
    } else if (!props.user.userInfo) {
      // 还没登陆
      return (
        <div>
          <ShowCase books={books} />
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
    } else if (props.user.userInfo && props.user.userInfo.book) {
      return <UserPanel />;
    }
  };

  return (
    <Container className="animate__animated animate__fadeIn">
      {greeting()}
      <SelectBook
        showSelectBook={showSelectBook}
        closeSelectBook={closeSelectBook}
        books={books}
      ></SelectBook>
    </Container>
  );
};

export default connect((state, props) => Object.assign({}, props, state), {
  updateUserInfo,
  clearUserInfo,
})(withRouter(Home));
