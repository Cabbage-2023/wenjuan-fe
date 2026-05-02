import type {FC} from 'react'
import QuestionInputConf, { QuestionInputPropsType,  } from "./QuestionInput";
import QuestionTitleConf, { QuestionTitlePropsType,  } from "./QuestionTitle";

export type ComponentPropsType = QuestionInputPropsType & QuestionTitlePropsType

//统一定义组件的默认配置
export type ComponentConfType = {
  title:string,
  type:string,
  Component:FC<ComponentPropsType>,
  PropComponent:FC<ComponentPropsType>,
  defaultProps:ComponentPropsType,
}

//全部配置的组件列表
const componentConfList:ComponentConfType[]=[
  QuestionInputConf,
  QuestionTitleConf,
]

//组件分组
export const componentGroup = [
  {
    groupId:'textGroup',
    groupname:'文本显示',
    components:[QuestionTitleConf]
  },
  {
    groupId:'inputGroup',
    groupname:'用户输入',
    components:[QuestionInputConf]
  },
]

export function getComponentConfByType(type:string){
  return componentConfList.find(conf=>conf.type===type) || null
}
