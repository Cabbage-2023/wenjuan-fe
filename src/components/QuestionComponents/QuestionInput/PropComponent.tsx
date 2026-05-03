import React, { FC, useEffect } from 'react'
import {Form,Input} from 'antd'

import { QuestionInputPropsType } from './interface'

const PropComponent: FC<QuestionInputPropsType> = (props:QuestionInputPropsType) => {
  const {title,placeholder,onChange,disabled}=props

  const [form]=Form.useForm()

  useEffect(()=>{
    form.setFieldsValue({title,placeholder})
  },[title,placeholder])

  function handleValueChange(values:QuestionInputPropsType){
    if(onChange) onChange(form.getFieldsValue())
  }

  return <Form
    layout='vertical'
    initialValues={{title,placeholder}}
    form={form}
    onValuesChange={handleValueChange}  
    disabled={disabled}
  >
    <Form.Item label='标题' name='title' rules={[{required:true,message:'请输入标题'}]}>
      <Input />
    </Form.Item>
    <Form.Item label='placeholder' name='placeholder' rules={[{message:'请输入占位符'}]}>
      <Input />
    </Form.Item>
  </Form>
}

export default PropComponent