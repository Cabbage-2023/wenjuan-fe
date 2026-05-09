import { render, screen } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers"; // 引入匹配器
import { expect, test } from "vitest";

// 关键一步：让 Vitest 的 expect 穿上 jest-dom 的装甲
expect.extend(matchers);

// 加上这段兼容代码
// if (typeof window !== 'undefined') {
//   window.ResizeObserver = window.ResizeObserver || class {
//     observe() {}
//     unobserve() {}
//     disconnect() {}
//   };
// }

import Component from "./Component";

test("默认属性", () => {
  render(<Component />);
  const p = screen.getByText("单选标题");
  expect(p).toBeInTheDocument();

  for (let i = 1; i <= 3; i++) {
    const radio = screen.getByDisplayValue(`item${i}`);
    expect(radio).toBeInTheDocument();
    const label = screen.getByText(`选项${i}`);
    expect(label).toBeInTheDocument();
  }
});

test("传入属性", () => {
  render(
    <Component
      title="hello"
      isVertical={true}
      options={[
        { value: "item1", text: "选项1" },
        { value: "item2", text: "选项2" },
        { value: "item3", text: "选项3" },
      ]}
      value="v1"
    />
  );
  const span = screen.getByText("hello");
  expect(span).toBeInTheDocument();

  for (let i = 1; i <= 3; i++) {
    const curVal=`item${i}`
    const radio = screen.getByDisplayValue(curVal);
    expect(radio).toBeInTheDocument();
    const label = screen.getByText(`选项${i}`);
    expect(label).toBeInTheDocument();

    if(curVal==='v1'){
      expect(radio).toBeChecked()
    }
  }
});
