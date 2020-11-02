import React from "react";
import { connect } from "react-redux"; //connect链接redux
import { updateUserInfo } from "../redux/actions";
import { Form, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import _axios from "../utils/_axios";
import styled from "styled-components";

const Container = styled.div`
  #normal_login .login-form {
    max-width: 300px;
  }
  .ctls {
    max-width: 320px;
    margin: 0 auto 10px;
    .ant-form-item-control-input-content {
      display: flex;
      justify-content: space-between;
    }
    #normal_login .login-form-forgot {
      float: right;
    }
    #normal_login .ant-col-rtl .login-form-forgot {
      float: left;
    }
    #normal_login .ant-checkbox-wrapper {
      float: left;
    }
  }

  #normal_login .login-form-button {
    width: 100%;
    max-width: 320px;
    margin-bottom: 10px;
  }
`;

const LoginForm = (props) => {
  const onFinish = async (values) => {
    const res = await _axios
      .post("/api/users/login", values)
      .then((data) => data.data);
    if (res.code === 1) {
      message.success("成功登陆");
      props.updateUserInfo(res.data);
    } else {
      message.error(res.msg);
    }
    console.log(res);
  };

  return (
    <Container>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your E-mail!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item className="ctls">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a
            className="login-form-forgot"
            href="#"
            // 跳转到忘记密码页面
            onClick={(e) => {
              e.preventDefault();
              props.history.push({
                pathname: "/account/forget-password",
              });
            }}
          >
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          <div>
            Or{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                props.goToRegister();
              }}
            >
              register now!
            </a>
          </div>
        </Form.Item>
      </Form>
    </Container>
  );
};

// connect两个参数，第一个函数用于合并东西, 第二个json包装action
export default connect(
  (state, props) => {
    // 合并
    return Object.assign({}, props, state);
  },
  {
    //放actions
    updateUserInfo,
  }
)(withRouter(LoginForm));
