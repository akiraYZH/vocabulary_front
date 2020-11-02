import React from "react";
import { Steps } from "antd";
import { withRouter } from "react-router-dom";
import ForgetPasswordStep1 from "../components/ForgetPasswordStep1";
import ForgetPasswordStep2 from "../components/ForgetPasswordStep2";
import ForgetPasswordStep3 from "../components/ForgetPasswordStep3";
// import _axios from "../utils/_axios";
import styled from "styled-components";

const Container = styled.div`
  max-width: 90%;
  min-height: 200px;
  width: 600px;
  margin: 0 auto;
  background: white;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 5px;
  box-shadow: 0 2px 8px #c0c0c0;
  .steps-content {
    margin-top: 16px;
    text-align: center;
    padding-top: 20px;
  }

  .steps-action {
    margin-top: 24px;
  }
`;

const { Step } = Steps;

class ForgetPassword extends React.Component {
  constructor(props) {
    super(props);

    this.step1 = React.createRef();
    this.state = {
      current: 0,
      steps: [
        {
          title: "First",
          content: (
            <ForgetPasswordStep1
              next={this.next.bind(this)}
            ></ForgetPasswordStep1>
          ),
        },
        {
          title: "Second",
          content: (
            <ForgetPasswordStep2
              next={this.next.bind(this)}
            ></ForgetPasswordStep2>
          ),
        },
        {
          title: "Last",
          content: (
            <ForgetPasswordStep3
              goToLogin={this.goToLogin.bind(this)}
            ></ForgetPasswordStep3>
          ),
        },
      ],
    };
  }

  next() {
    const current = this.state.current + 1;
    // console.log(this.step1);
    this.setState({ ...this.state, current });
  }

  goToLogin() {
    this.props.history.push("/account");
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ ...this.state, current });
  }

  render() {
    const { current, steps } = this.state;
    return (
      <Container>
        <Steps current={current}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
      </Container>
    );
  }
}

export default withRouter(ForgetPassword);
