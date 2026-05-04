import React,{FC, useEffect} from "react";
import {Form,Input,Checkbox} from "antd";

import {QuestionParagraphPropsType  } from "./interface";

const {TextArea} = Input;

const PropComponent:FC<QuestionParagraphPropsType> = (props:QuestionParagraphPropsType) =>{
  const {text,isCenter,onChange,disabled} = props;
  const [form]=Form.useForm()

  useEffect(()=>{
    form.setFieldsValue({text,isCenter})
  },[text,isCenter])

  function handleValuesChange(values){
    if(onChange){
      onChange(form.getFieldsValue())
    }
  }

  return <Form
    form={form}
    layout="vertical"
    initialValues={{text,isCenter,}}
    onValuesChange={handleValuesChange}
    disabled={disabled}
  >
    <Form.Item name="text" label="段落内容" rules={[{required:true,message:'请输入段落内容'}]}>
      <TextArea />
    </Form.Item>
    <Form.Item label='是否居中' name='isCenter' valuePropName='checked'>
      <Checkbox>是否居中</Checkbox>
    </Form.Item>
  </Form>
}

export default PropComponent
