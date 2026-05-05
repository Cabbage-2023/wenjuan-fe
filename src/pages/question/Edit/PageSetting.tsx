import React, { FC, useEffect } from "react";
import {Form, Input,message} from "antd";
import { useDispatch } from "react-redux";

import useGetPageInfo from "../../../hooks/useGetPageInfo";
import { resetPageInfo } from "../../../store/pageInfoReducer";

const {TextArea} = Input;

const PageSetting: FC = () => {
  const pageInfo = useGetPageInfo();
  //const { title,desc,js,css } = pageInfo;
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  // 监听表单值变化
  useEffect(() => {
    form.setFieldsValue(pageInfo);
  }, [pageInfo]);


  function handleValuesChange() {
    dispatch(resetPageInfo(form.getFieldsValue()));
  }
  

  return <Form
    layout="vertical"
    initialValues={pageInfo}
    onValuesChange={handleValuesChange}
    form={form}
  >
    <Form.Item name="title" label="问卷标题" rules={[{ required: true, message: "请输入问卷标题" }]}>
      <Input placeholder="请输入问卷标题"/>
    </Form.Item>
    <Form.Item name="desc" label="问卷描述">
      <TextArea placeholder="请输入问卷描述"/>
    </Form.Item>
    <Form.Item name="css" label="样式代码">
      <Input placeholder="请输入CSS样式代码"/>
    </Form.Item>
    <Form.Item name="js" label="脚本代码">
      <Input placeholder="请输入JavaScript脚本代码"/>
    </Form.Item>
  </Form>
};

export default PageSetting;
