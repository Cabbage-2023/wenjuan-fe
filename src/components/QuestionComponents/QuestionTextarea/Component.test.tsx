import { render,screen } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers' // 引入匹配器
import { expect, test } from 'vitest'

// 关键一步：让 Vitest 的 expect 穿上 jest-dom 的装甲
expect.extend(matchers)

// 加上这段兼容代码
if (typeof window !== 'undefined') {
  window.ResizeObserver = window.ResizeObserver || class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

import Component from './Component';

test("默认属性", () => {
  render(<Component />)
  const p=screen.getByText('请输入标题。')
  expect(p).toBeInTheDocument()

  const textarea=screen.getByPlaceholderText('漆原琉华提示您，这是多行输入框。')
  expect(textarea).toBeInTheDocument()
})

test('传入属性',()=>{
  render(<Component title='hello' placeholder='请输入内容'/>)
  const span=screen.getByText('hello')
  expect(span).toBeInTheDocument()

  const textarea=screen.getByPlaceholderText('请输入内容')
  expect(textarea).toBeInTheDocument()

})