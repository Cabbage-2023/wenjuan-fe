import React, { FC } from "react";
import { Typography } from "antd";

import { QuestionTitlePropsType, QuestionTitleDefaultProps } from "./interface";

const { Title } = Typography;

const QuestionTitle: FC<QuestionTitlePropsType> = (
  props: QuestionTitlePropsType
) => {
  const {
    text = "",
    level = 1,
    isCenter = false,
  } = { ...QuestionTitleDefaultProps, ...props };

  const getFontSize = (level: 1 | 2 | 3 | 4 | 5) => {
    if (level === 1) return "24px";
    if (level === 2) return "20px";
    if (level === 3) return "16px";
    if (level === 4) return "14px";
    if (level === 5) return "12px";
    return "16px";
  };

  return (
    <Title
      level={level}
      style={{
        textAlign: isCenter ? "center" : "start",
        marginTop:"0" ,       // 覆盖 AntD 默认的 margin-top
        marginBottom: "0",
        fontSize: getFontSize(level),
      }}
    >
      {text}
    </Title>
  );
};

export default QuestionTitle;
