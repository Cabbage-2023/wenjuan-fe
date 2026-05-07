// 多选框组件

import PropComponent from "./PropComponent";
import Component from "./Component";
import {QuestionCheckboxDefaultProps} from "./interface";
import StatComponent from "./StatComponent";

export * from "./interface";

export default {
  title:'多选框',
  type:'questionCheckbox',
  Component,
  PropComponent,
  defaultProps:QuestionCheckboxDefaultProps,
  StatComponent,
 }
