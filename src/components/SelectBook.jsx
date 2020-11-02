import React from "react";
import { connect } from "react-redux"; //connect链接redux
import { updateUserInfo } from "../redux/actions";
import { Modal, message, Button, Select, Form, Input } from "antd";
import styled from "styled-components";
import _axios from "../utils/_axios";

let StyledButton = styled(Button)`
  background: #22ddb8;
  border: 1px solid #22ddb8;
  color: white;
  transition: 0.3s;
  box-shadow: none;

  &:focus {
    background: #22ddb8;
    border: 1px solid #22ddb8;
    color: white;
  }
  &:hover {
    color: #22ddb8;
    background: white;
    border: 1px solid #22ddb8;
  }
`;
const { Option } = Select;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const SelectBook = (props) => {
  const [form] = Form.useForm();

  //提交
  const onFinish = async (values) => {
    console.log(values);
    const res = await _axios
      .post("/api/users/choose-book", {
        ...values,
        id: props.user.userInfo.id,
      })
      .then((data) => data.data);

    if (res.code === 1) {
      message.success("成功选择单词书！");
      const res = await props.user.getUserInfo();
      if (res.code === 1) {
        props.updateUserInfo(res.data);
        props.closeSelectBook();
      } else if (res.code === -1) {
        props.clearUserInfo();
        message.error("验证信息已过期，请重新登陆！");
        props.closeSelectBook();
        props.history.push("/account");
      }
    }
  };

  const handleOk = (e) => {
    form.submit();
  };

  const handleCancel = (e) => {
    props.closeSelectBook();
  };

  return (
    <Modal
      title="选择单词书"
      visible={props.showSelectBook}
      // onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          取消
        </Button>,
        <StyledButton key="submit" type="primary" onClick={handleOk}>
          确定
        </StyledButton>,
      ]}
    >
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        initialValues={{ num_day: 10 }}
      >
        <Form.Item
          name="book_id"
          label="单词书"
          rules={[
            {
              required: true,
              message: "请选择单词书",
            },
          ]}
        >
          <Select
            placeholder="选择您所需要的单词书"
            // onChange={onGenderChange}
            allowClear
          >
            {props.books.map((item) => (
              <Option value={item.id} key={item.id}>
                {item.title} --- 单词数: {item.count}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="num_day"
          label="每天记忆个数"
          rules={[
            {
              required: true,
              message: "请填入每天记忆个数",
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
      </Form>
    </Modal>
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
)(SelectBook);
