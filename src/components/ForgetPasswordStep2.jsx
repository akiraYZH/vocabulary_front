import React from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import _axios from "../utils/_axios";

const forgetFormStep2 = React.forwardRef((props, ref) => {
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    const res = await _axios
      .get("/api/forget-verify-confirm?code=" + values.code)
      .then((data) => data.data);
    // console.log(res);
    if (res.code === 1) {
      sessionStorage.setItem("auth", res.data.auth);
      props.next();
    } else {
      message.error(res.msg);
    }
  };

  return (
    <Form
      name="forgetPassStep2"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      ref={ref}
    >
      <Form.Item
        name="code"
        rules={[
          {
            required: true,
            message: "Please enter the code indicated in email!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Please enter verification code from email."
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Next
        </Button>
      </Form.Item>
    </Form>
  );
});
export default forgetFormStep2;
