import React, { useState, useEffect } from "react";
import _axios from "../utils/_axios";
import { Form, Input, Tooltip, Row, Col, Button, Modal, Result } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import styled from "styled-components";

// const { Option } = Select;
const Container = styled.div`
  .ant-form-item-extra {
    display: flex;
    justify-content: flex-start;
  }
  .registerRow {
    .ant-form-item-control-input-content {
      display: flex;
      justify-content: flex-start;
    }
  }
`;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const RegistrationForm = (props) => {
  const [form] = Form.useForm();
  const [verify, setVerify] = useState("");
  const [showModal, setShowModal] = useState(false);

  //   console.log(form);
  const closeModal = (e) => {
    setShowModal(false);
    form.resetFields();
    props.goToLogin();
  };
  //   提交订单
  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    const res = await _axios
      .post("api/users/add", values)
      .then((data) => data.data);
    console.log(res);
    if (res.code == 1) {
      setShowModal(true);
    }
  };

  //   获取验证码图片
  const getVerify = async () => {
    const verify = await _axios.get("api/verify").then((data) => data.data);
    setVerify(verify);
    return;
  };

  // 获取验证码答案
  const verify_code = async (input) => {
    const answer = await _axios
      .get("api/verify_code")
      .then((data) => data.data);

    return answer.toLowerCase() == input ? true : false;
  };

  //验证email
  const checkEmail = async (email) => {
    const res = await _axios
      .post("api/users/check-email", { email: email })
      .then((data) => data.data);

    return res;
  };

  //验证nickname
  const checkNickname = async (nickname) => {
    const res = await _axios
      .post("api/users/check-nickname", { nickname: nickname })
      .then((data) => data.data);

    return res;
  };
  //一开始mounted的时候
  useEffect(() => {
    getVerify();
    return () => {
      // cleanup
    };
  }, []);

  return (
    <Container>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            ({ getFieldValue }) => ({
              async validator(rule, value) {
                const res = await checkEmail(value);
                if (!value || res.code == 1) {
                  return Promise.resolve();
                }
                return Promise.reject("This email has been registered.");
              },
            }),
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            ({ getFieldValue }) => ({
              async validator(rule, value) {
                if (value.length >= 6) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  "The length of password cannot less than 6 letters."
                );
              },
            }),
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  "The two passwords that you entered do not match!"
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="nickname"
          label={
            <span>
              Nickname&nbsp;
              <Tooltip title="What do you want others to call you?">
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
          rules={[
            ({ getFieldValue }) => ({
              async validator(rule, value) {
                const res = await checkNickname(value);
                if (!value || res.code == 1) {
                  return Promise.resolve();
                }
                return Promise.reject("This nickname has been used.");
              },
            }),
            {
              required: true,
              message: "Please input your nickname!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Captcha"
          extra="We must make sure that your are a human."
        >
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                name="captcha"
                noStyle
                rules={[
                  ({ getFieldValue }) => ({
                    async validator(rule, value) {
                      if (!value || (await verify_code(value))) {
                        return Promise.resolve();
                      }
                      return Promise.reject("Try again.");
                    },
                  }),
                  {
                    required: true,
                    message: "Please input the captcha you got!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Button onClick={getVerify} style={{ padding: 0 }}>
                <div dangerouslySetInnerHTML={{ __html: verify }}></div>
              </Button>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item {...tailFormItemLayout} className="registerRow">
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
      <Modal
        closable={false}
        visible={showModal}
        onOk={closeModal}
        onCancel={closeModal}
      >
        <Result
          status="success"
          title="You have registered successfully!"
          subTitle="Click the button below and go to login panel."
        />
      </Modal>
    </Container>
  );
};

export default RegistrationForm;
