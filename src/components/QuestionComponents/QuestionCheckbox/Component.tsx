import React,{FC} from "react";
import {Typography,Space,Checkbox} from "antd";

const {Paragraph} = Typography;

import { QuestionCheckboxPropsType,QuestionCheckboxDefaultProps } from "./interface";

const Component:FC<QuestionCheckboxPropsType> = (props:QuestionCheckboxPropsType)=>{
  const {title,isVertical,list} = {...QuestionCheckboxDefaultProps,...props}

  return <div>
    <Paragraph strong>{title}</Paragraph>
    <Space orientation={isVertical?"vertical":"horizontal"}>
      {list.map((item,index)=>{
        const {value,text,checked} = item;
        return <Checkbox key={value} value={value} checked={checked}>{text}</Checkbox>
      })}
    </Space>
  </div>
}

export default Component;
