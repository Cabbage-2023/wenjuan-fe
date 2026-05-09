import { render, screen } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers"; // 引入匹配器
import { expect, test } from "vitest";

// 关键一步：让 Vitest 的 expect 穿上 jest-dom 的装甲
expect.extend(matchers);

import Component from "./Component";

// export const QuestionCheckboxDefaultProps:QuestionCheckboxPropsType = {
//   title:"多选标题",
//   isVertical:false,
//   list:[
//     {value:"1",text:"选项1",checked:false},
//     {value:"2",text:"选项2",checked:false},
//     {value:"3",text:"选项3",checked:false},
//   ],
// }

test("默认属性", () => {
  render(<Component />);
  const p = screen.getByText("多选标题");
  expect(p).toBeInTheDocument();

  for (let i = 1; i <= 3; i++) {
    const checkbox = screen.getByDisplayValue(`${i}`);
    expect(checkbox).toBeInTheDocument();
    const label = screen.getByText(`选项${i}`);
    expect(label).toBeInTheDocument();
    expect(label).not.toBeChecked();
  }
});

test('传入属性', () => {
  const list = [
    { value: 'v1', text: 't1', checked: false },
    { value: 'v2', text: 't2', checked: true },
    { value: 'v3', text: 't3', checked: true },
  ]

  render(<Component title="hello" list={list} />)

  // 验证标题
  const p = screen.getByText('hello')
  expect(p).toBeInTheDocument()

  // 验证第一个选项（未选中）
  const checkbox1 = screen.getByDisplayValue('v1')
  expect(checkbox1).toBeInTheDocument()
  expect(checkbox1.getAttribute('checked')).toBeNull() // 未选中

  // 验证第二个选项（选中）
  const checkbox2 = screen.getByDisplayValue('v2')
  expect(checkbox2).toBeInTheDocument()
  expect(checkbox2.getAttribute('checked')).not.toBeNull() // 选中

  // 验证第三个选项（选中）
  const checkbox3 = screen.getByDisplayValue('v3')
  expect(checkbox3).toBeInTheDocument()
  expect(checkbox3.getAttribute('checked')).not.toBeNull() // 选中
})