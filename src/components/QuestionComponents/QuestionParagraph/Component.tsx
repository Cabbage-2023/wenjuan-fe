import React,{FC} from "react";
import {Typography} from "antd";

import { QuestionParagraphPropsType, QuestionParagraphDefaultProps } from "./interface";

const {Paragraph} = Typography;


const Component:FC<QuestionParagraphPropsType> = (props:QuestionParagraphPropsType) =>{
  const {text='',isCenter=false} = {...QuestionParagraphDefaultProps,...props}

  //尽量不要使用dangerouslySetInnerHTML，因为它存在安全风险
  const textList=text.split('\n')

  return <Paragraph style={{textAlign:isCenter?'center':'start',marginBottom:0}} >
      {textList.map((item,index)=>(
        <span key={index}>{index>0 && <br />}{item}</span>
      ))}
    </Paragraph>
}

export default Component
