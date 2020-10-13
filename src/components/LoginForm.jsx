import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
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
  // const [count, setCount] = useState(0);
  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    const res = await _axios
      .post("/api/users/login", values)
      .then((data) => data.data);
    console.log(res);
  };

  return (
    <Container>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        className="form"
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

          <a className="login-form-forgot" href="">
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
            <a href="javascript:void(0);" onClick={props.goToRegister}>
              register now!
            </a>
          </div>
        </Form.Item>
      </Form>
    </Container>
  );
};
export default LoginForm;
