//问卷-单选框组件
import Component from "./Component";
import PropComponent from "./PropComponent";
import {QuestionRadioDefaultProps} from "./interface";

export * from "./interface";

export default {
  title: '单选标题',
  type:'questionRadio',
  Component,
  PropComponent,
  defaultProps: QuestionRadioDefaultProps,
}
