import React,{FC, useEffect} from "react";
import {Form,Input,Checkbox,Button,Select,Space} from "antd";
import { PlusOutlined,MinusCircleOutlined } from "@ant-design/icons";
import {nanoid} from "nanoid";

import { QuestionRadioPropsType,OptionType } from "./interface";


const PropComponent:FC<QuestionRadioPropsType> = (props:QuestionRadioPropsType) => {
  const {title,isVertical,options=[],value,onChange,disabled} = props;
  const [form] = Form.useForm();
  //重要！监听options字段变化，确保实时获取最新选项
  const watchOptions = Form.useWatch('options', form) || [];

  useEffect(() => {
    form.setFieldsValue({title,isVertical,options,value,});
  },[title,isVertical,options,value]);

   //接收Antd传过来的参数：changedValues（变化的字段）, allValues（所有字段）
   function handleValuesChange(changedValues: any, allValues: any) {
    if (!onChange) return;

    // 虽然内部属性会变，但变量引用不变，用 const
    const updatedValues = { ...allValues };

    // 🌟 增强逻辑：如果删除了选项，检查当前的“默认选中”是否还存在
    if (changedValues.options) {
      const { options: newOpts = [], value: curValue } = allValues;
      const isValueExist = newOpts.some((opt: OptionType) => opt && opt.value === curValue);
      
      if (!isValueExist) {
        // 如果被选中的项没了，重置 value
        updatedValues.value = "";
        form.setFieldsValue({ value: "" });
      }
    }
    onChange(updatedValues);
    //错误：这里拿到的可能是未更新的旧数据
    //onChange(form.getFieldsValue());
    /**
     * handleValueChange 处理函数和useEffect相互配合出现的问题：
     * 1.触发添加：你点击 add，Antd 的 Form.List 在内部状态中增加了一个新选项。
     * 2.触发变化：表单内部状态改变，触发了 <Form onValuesChange={handleValueChange}>。
     * 3.获取脏数据（罪魁祸首）：在你的 handleValueChange 中，你使用了 form.getFieldsValue()。在 onValuesChange 触发的瞬间，由于 React 的异步更新机制，form.getFieldsValue() 有时拿到的还是添加之前的旧数据。
     * 4.状态提升：你把这份旧数据通过 onChange 传给了父组件（Redux）。
     * 5.重置表单：父组件接收到旧数据后，将旧的 options 作为 props 传回给当前组件。触发了 useEffect。
     * 6.瞬间抹杀：useEffect 执行 form.setFieldsValue({ ... })，用旧的 options 强行覆盖了表单，导致你刚刚添加的*   新选项瞬间消失，看起来就像没加成功一样。
     *  
     *  onValuesChange语义：监听表单值的变化，触发回调函数，并不保证store中的值及时更新。
     *  getFieldsValue语义：从当前store中读取字段值。              
     */

    // 确保在 onChange 中获取到最新的所有值
  }

  return <Form
    form={form}
    layout="vertical"
    initialValues={{title,isVertical,options,value,}}
    onValuesChange={handleValuesChange}
    disabled={disabled}
  >
    <Form.Item name="title" label="标题" rules={[{ required: true, message: '请输入标题' }]}>
      <Input />
    </Form.Item>
    <Form.Item label='选项'>
      <Form.List name={'options'}>
        {(fields,{add,remove})=>(
          <>
            {/* 遍历所有选项，可删除 */}
            {fields.map(({key,name},index)=>{
              return <Space key={key} align="baseline">
                {/* 选项文本输入框 */}
                <Form.Item
                  name={[name,'text']}
                  rules={[{ required: true, message: '请输入选项' },//需要补充不能重复
                    { 
                      validator: (_,text)=>{
                        const {options=[]}=form.getFieldsValue();

                        let num=0
                        options.forEach((opt:OptionType)=>{
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
                {index>1&&<MinusCircleOutlined onClick={()=>remove(name)}/>}
              </Space>
            })}
            <Form.Item>
              {/* 添加选项按钮，add的默认值是optionType，因为options就是选项的数组 */}
              <Button type='link' onClick={()=>add({text:'',value:nanoid(5)})} icon={<PlusOutlined />} block>添加选项</Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form.Item>
    <Form.Item label='默认选中' name='value'>
      <Select 
        // 🌟 改用 watchOptions，确保下拉列表文字实时更新
        options={watchOptions.map((opt: OptionType) => ({ 
          value: opt.value, 
          label: opt.text || '' 
        }))} 
      />
    </Form.Item>
    <Form.Item label='是否垂直' name='isVertical' valuePropName='checked'>
      <Checkbox>竖向排列</Checkbox>
    </Form.Item>
  </Form>
}

export default PropComponent;