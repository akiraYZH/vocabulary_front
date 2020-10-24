import React, { useState, useEffect } from "react";
import { connect } from "react-redux"; //connect链接redux
import { updateUserInfo } from "../redux/actions";
import { Button, List, Typography } from "antd";
import styled from "styled-components";
import _axios from "../utils/_axios";

const Container = styled.div``;

const ShowCase = (props) => {
  const [books, setBooks] = useState([]);

  // 获得单词书列表
  const getBooks = async () => {
    const res = await _axios.get("/api/books/get").then((data) => data.data);

    if (res.code === 1) {
      setBooks(res.data);
      refreshUserInfo();
    }
  };

  const refreshUserInfo = async () => {
    const res = await _axios
      .post("api/users/login-token")
      .then((data) => data.data);

    console.log(res);
    if (res.code === 1) {
      props.updateUserInfo(res.data);
    }
  };
  useEffect(() => {
    getBooks();
  }, []);

  // 是否显示"选择"按钮
  const showBtn = (id) => {
    if (!props.user.userInfo?.book) {
      return (
        <Button className="btn" onClick={selectBook.bind(this, id)}>
          选择
        </Button>
      );
    }
    return;
  };
  const selectBook = async (book_id) => {
    const res = await _axios
      .post("/api/users/choose-book", {
        id: props.user.userInfo.id,
        book_id: book_id,
      })
      .then((data) => data.data);
    console.log(res);
    if (res.code === 1) {
      refreshUserInfo();
    }
  };
  return (
    <Container className="animate__animated animate__fadeIn">
      <List
        header={<h2 className="title">现有单词书</h2>}
        dataSource={books}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <Typography.Text>
              <span className="title">{item.title}</span> --- 单词数量：
              {item.count}
            </Typography.Text>
            {showBtn(item.id)}
          </List.Item>
        )}
      />
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
    updateUserInfo,
  }
)(ShowCase);
