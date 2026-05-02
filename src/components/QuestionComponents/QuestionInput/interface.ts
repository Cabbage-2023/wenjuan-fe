export interface QuestionInputPropsType {
  title?: string;
  placeholder?: string;

  onChange?: (newProps: QuestionInputPropsType) => void;
}

export const QuestionInputDefaultProps: QuestionInputPropsType = {
  title: "请输入标题，喵。",
  placeholder: "漆原琉华、牧濑红莉栖提示您，请输入文本。",
};