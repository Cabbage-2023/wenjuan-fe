import type { FC } from "react";
import QuestionInputConf, { QuestionInputPropsType } from "./QuestionInput";
import QuestionTitleConf, { QuestionTitlePropsType } from "./QuestionTitle";
import QuestionParagraphConf, {QuestionParagraphPropsType,} from "./QuestionParagraph";
import QuestionInfoConf, { QuestionInfoPropsType } from "./QuestionInfo";
import QuestionTextareaConf, { QuestionTextareaPropsType } from "./QuestionTextarea";
import QuestionRadioConf, { QuestionRadioPropsType,QuestionRadioStatPropsType } from "./QuestionRadio";
import QuestionCheckboxConf, { QuestionCheckboxPropsType,QuestionCheckboxStatPropsType } from "./QuestionCheckbox";

//统一各个组件的prop type
export type ComponentPropsType = QuestionInputPropsType &
  QuestionTitlePropsType &
  QuestionParagraphPropsType &
  QuestionInfoPropsType &
  QuestionTextareaPropsType &
  QuestionRadioPropsType &
  QuestionCheckboxPropsType;

//统一各个组件的统计属性
type CommentStatPropsType=QuestionRadioStatPropsType & QuestionCheckboxStatPropsType

//统一定义组件的默认配置
export type ComponentConfType = {
  title: string;
  type: string;
  Component: FC<ComponentPropsType>;
  PropComponent: FC<ComponentPropsType>;
  defaultProps: ComponentPropsType;
  StatComponent?:FC<CommentStatPropsType>//有的有，有的没有
};

//全部配置的组件列表
const componentConfList: ComponentConfType[] = [
  QuestionInputConf,
  QuestionTitleConf,
  QuestionParagraphConf,
  QuestionInfoConf,
  QuestionTextareaConf,
  QuestionRadioConf,
  QuestionCheckboxConf,
];

//组件分组
export const componentGroup = [
  {
    groupId: "textGroup",
    groupname: "文本显示",
    components: [QuestionTitleConf,QuestionParagraphConf,QuestionInfoConf],
  },
  {
    groupId: "inputGroup",
    groupname: "用户输入",
    components: [QuestionInputConf,QuestionTextareaConf],
  },
  {
    groupId: "chooseGroup",
    groupname: "用户选择",
    components: [QuestionRadioConf,QuestionCheckboxConf],
  }
];

export function getComponentConfByType(type: string) {
  return componentConfList.find((conf) => conf.type === type) || null;
}
