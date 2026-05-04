import React,{FC} from "react";
import {Form,Input,Checkbox,Space,Button} from "antd";
import { MinusCircleOutlined,PlusOutlined } from "@ant-design/icons";
import {nanoid} from "nanoid";

import { QuestionCheckboxPropsType,OptionType } from "./interface";

const PropComponent:FC<QuestionCheckboxPropsType> = (props:QuestionCheckboxPropsType)=>{
  const {title,isVertical,list=[],onChange,disabled} = props;
  const [form] = Form.useForm();

  function handleValuesChange(changedValues: any, allValues: any) {
    //调用onChange,这里处理方式和QuestionRadio一样
    if(onChange) {
        onChange(allValues);
    }
}

  return <Form
    layout="vertical"
    form={form}
    initialValues={{title,isVertical,list}}
    disabled={disabled}
    onValuesChange={handleValuesChange}
  >
    <Form.Item name="title" label="标题" rules={[{required:true,message:"请输入标题"}]}>
      <Input />
    </Form.Item>

    <Form.Item label='选项'>
      <Form.List name={'list'}>
        {(fields,{add,remove})=>(
          <>
            {/* 遍历所有选项，可删除 */}
            {fields.map(({key,name},index)=>{
              return <Space key={key} align="baseline">
                {/* 当前选项是否选中  */}
                <Form.Item name={[name,'checked']} valuePropName='checked'>
                  <Checkbox />
                </Form.Item>
                {/* 选项文本输入框 */}
                <Form.Item
                  name={[name,'text']}
                  rules={[{ required: true, message: '请输入选项' },//需要补充不能重复
                    { 
                      validator: (_,text)=>{
                        const {list=[]}=form.getFieldsValue();

                        let num=0
                        list.forEach((opt:OptionType)=>{
                          if(opt.text===text) num++//统计重复次数
                        })
                        if(num===1) return Promise.resolve()
                        return Promise.reject('选项不能重复')
                      }
                    }
                  ]}
                >
                  <Input placeholder='请输入选项' />
                </Form.Item>
                {/* 🌟 2. 必须绑定隐藏的 value 字段！否则 Select 找不到对应关系 */}
                <Form.Item name={[name, 'value']} noStyle>
                  <Input type="hidden" />
                </Form.Item>
                {/* 选项文本删除按钮 */}
                {index>0&&<MinusCircleOutlined onClick={()=>remove(name)}/>}
              </Space>
            })}
            <Form.Item>
              {/* 添加选项按钮，add的默认值是optionType，因为options就是选项的数组 */}
              <Button type='link' onClick={()=>add({text:'',value:nanoid(5),checked:false})} icon={<PlusOutlined />} block>添加选项</Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form.Item>

    <Form.Item label='是否垂直' name='isVertical' valuePropName='checked'>
      <Checkbox>竖向排列</Checkbox>
    </Form.Item>
  </Form>


}

export default PropComponent;
