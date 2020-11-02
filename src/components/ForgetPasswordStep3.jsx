import React from "react";
import { Form, Input, Button, message } from "antd";
import _axios from "../utils/_axios";

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

const forgetFormStep3 = React.forwardRef((props, ref) => {
  // const [form] = Form.useForm();
  const onFinish = async (values) => {
    const res = await _axios
      .put("/api/users/change-pass", {
        password: values.password,
        auth: "bearer " + sessionStorage.getItem("auth"),
      })
      .then((data) => data.data);

    if (res.code === 1) {
      message.success("Processing complete!");
      props.goToLogin();
    }
  };

  return (
    <Form
      name="forgetPassStep3"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      ref={ref}
    >
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
        {...formItemLayout}
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
        {...formItemLayout}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Next
        </Button>
      </Form.Item>
    </Form>
  );
});
export default forgetFormStep3;
