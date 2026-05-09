//问卷-段落组件


import Component from "./Component";
import {QuestionParagraphDefaultProps} from "./interface";
import PropComponent from "./PropComponent";


export * from "./interface"

//Paragraph组件的配置
export default{
  title:'段落',
  type:'questionParagraph',
  Component,
  PropComponent,
  defaultProps:QuestionParagraphDefaultProps,
}
