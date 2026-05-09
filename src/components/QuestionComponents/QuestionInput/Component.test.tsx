import { render,screen } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers' // 引入匹配器
import { expect, test } from 'vitest'

// 关键一步：让 Vitest 的 expect 穿上 jest-dom 的装甲
expect.extend(matchers)

import Component from './Component';

test("默认属性", () => {
  render(<Component />)
  const p=screen.getByText('请输入标题，喵。')
  expect(p).toBeInTheDocument()

  const input=screen.getByPlaceholderText('牧濑红莉栖提示您，请输入文本。')
  expect(input).toBeInTheDocument()
})

test('传入属性',()=>{
  render(<Component title='hello' placeholder='请输入内容'/>)
  const span=screen.getByText('hello')
  expect(span).toBeInTheDocument()

  const input=screen.getByPlaceholderText('请输入内容')
  expect(input).toBeInTheDocument()

})