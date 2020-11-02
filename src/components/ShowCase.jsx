import React from "react";
import { List, Typography } from "antd";
import styled from "styled-components";
// import _axios from "../utils/_axios";

const Container = styled.div``;

const ShowCase = (props) => {
  return (
    <Container className="animate__animated animate__fadeIn">
      <List
        header={<h2 className="title">现有单词书</h2>}
        dataSource={props.books}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <Typography.Text>
              <span className="title">{item.title}</span> --- 单词数量：
              {item.count}
            </Typography.Text>
          </List.Item>
        )}
      />
    </Container>
  );
};

export default ShowCase;
