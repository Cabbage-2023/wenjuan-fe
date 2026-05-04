import React,{FC} from "react";
import {Typography} from "antd";

import {QuestionInfoPropsType,QuestionInfoDefaultProps} from "./interface";

const {Title,Paragraph} = Typography;

const Component:FC<QuestionInfoPropsType> = (props:QuestionInfoPropsType) =>{
  const {title,desc=''}={...QuestionInfoDefaultProps,...props}

  //允许描述内容换行
  const descTextList=desc.split('\n')

  return <div style={{textAlign:'center'}}>
    <Title style={{fontSize:'24px'}}>{title}</Title>
    <Paragraph style={{fontSize:'16px'}}>
      {descTextList.map((item,index)=>(
        <span key={index}>{index>0 && <br />}{item}</span>
      ))}
    </Paragraph>
  </div>
}

export default Component