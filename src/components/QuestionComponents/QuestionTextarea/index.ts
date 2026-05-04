//问卷 多行输入框组件

import Component from "./Component";
import { QuestionTextareaDefaultProps } from "./interface";
import PropComponent from "./PropComponent";

export * from './interface'

export default{
  title:'多行输入框',
  type:'questionTextarea',//和后端统一好
  Component,//画布显示的组件
  PropComponent,//修改属性
  defaultProps:QuestionTextareaDefaultProps,
}
