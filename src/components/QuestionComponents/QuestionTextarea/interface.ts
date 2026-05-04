export interface QuestionTextareaPropsType {
  title?: string;
  placeholder?: string;

  onChange?: (newProps: QuestionTextareaPropsType) => void;
  disabled?: boolean;
}

export const QuestionTextareaDefaultProps: QuestionTextareaPropsType = {
  title: "请输入标题。",
  placeholder: "漆原琉华提示您，这是多行输入框。",
};