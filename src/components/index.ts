import type {FC} from 'react'
import QuestionInputConf, { QuestionInputPropsType,  } from "./QuestionComponents/QuestionInput";
import QuestionTitleConf, { QuestionTitlePropsType,  } from "./QuestionComponents/QuestionTitle";

export type ComponentPropsType = QuestionInputPropsType & QuestionTitlePropsType

//统一定义组件的默认配置
export type ComponentDefaultPropsType = {
  title:string,
  type:string,
  Component:FC<ComponentPropsType>,
  defaultProps:ComponentPropsType,
}

//全部配置的组件列表
const componentConfList:ComponentDefaultPropsType[]=[
  QuestionInputConf,
  QuestionTitleConf,
]

export function getComponentConfByType(type:string){
  return componentConfList.find(conf=>conf.type===type) || null
}
