export type QuestionTitlePropsType={
  text?:string,
  level?:1|2|3|4|5,
  isCenter?:boolean,

}

export const QuestionTitleDefaultProps:QuestionTitlePropsType={
  text:'冬马和纱提示您，请输入标题',
  level:1,
  isCenter:false,
}