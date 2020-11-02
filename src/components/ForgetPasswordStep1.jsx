import React from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import _axios from "../utils/_axios";

const forgetFormStep1 = React.forwardRef((props, ref) => {
  // const [form] = Form.useForm();
  const onFinish = async (values) => {
    const res = await _axios
      .get("/api/forget-verify?email=" + values.email)
      .then((data) => data.data);
    // console.log(res);
    res.code === 1 && props.next();
  };

  return (
    <Form
      name="forgetPassStep1"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      ref={ref}
    >
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Please input your E-mail!" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Please enter your E-mail address."
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
export default forgetFormStep1;
