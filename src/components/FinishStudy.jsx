import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { Result, Button } from "antd";

const Container = styled.div`
  .btn {
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
function FinishStudy(props) {
  return (
    <Container>
      <Result
        status="success"
        title="恭喜你完成今天任务!"
        subTitle="请再接再厉。"
        extra={[
          <Button
            type="primary"
            key="console"
            className="btn"
            onClick={() => props.history.push("/home")}
          >
            完成
          </Button>,
        ]}
      />
    </Container>
  );
}

export default withRouter(FinishStudy);
