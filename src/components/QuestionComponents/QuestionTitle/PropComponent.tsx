import React, { FC, useEffect } from 'react'
import {Form,Input,Checkbox,Select} from 'antd'

import { QuestionTitlePropsType } from './interface'

const PropComponent: FC<QuestionTitlePropsType> = (props:QuestionTitlePropsType) => {
  const {text,level,isCenter,onChange,disabled}=props
  const [form]=Form.useForm()

  useEffect(()=>{
    form.setFieldsValue({text,level,isCenter})
  },[text,level,isCenter])

  function handleValueChange(values:QuestionTitlePropsType){
    if(onChange) onChange(form.getFieldsValue())
  }

  return <Form
    layout='vertical'
    initialValues={{text,level,isCenter}}
    form={form}
    onValuesChange={handleValueChange}
    disabled={disabled}
  >
    <Form.Item label='标题' name='text' rules={[{required:true,message:'请输入标题'}]}>
      <Input />
    </Form.Item>
    <Form.Item label='层级' name='level' rules={[{required:true,message:'请选择标题等级'}]}>
      <Select options={[
        {value:1, label: '标题1'},
        {value:2, label: '标题2'},
        {value:3, label: '标题3'},
        {value:4, label: '标题4'},
        {value:5, label: '标题5'},
      ]} />
    </Form.Item>
    <Form.Item label='是否居中' name='isCenter' valuePropName='checked'>
      <Checkbox>是否居中</Checkbox>
    </Form.Item>
  </Form>
}

export default PropComponent
