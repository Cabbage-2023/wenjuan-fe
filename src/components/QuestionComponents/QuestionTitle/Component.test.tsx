import { render,screen } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers' // 引入匹配器
import { expect, test } from 'vitest'

// 关键一步：让 Vitest 的 expect 穿上 jest-dom 的装甲
expect.extend(matchers)

import Component from './Component';

test("默认属性", () => {
  render(<Component />)
  const h=screen.getByText('请输入标题')
  expect(h).toBeInTheDocument()
})

test('传入属性',()=>{
  render(<Component text='测试标题' level={2} isCenter={true}/>)
  const h=screen.getByText('测试标题')
  expect(h).toBeInTheDocument()

  expect(h.matches('h2')).toBeTruthy()

  const style=h.style
  expect(style.textAlign).toBe('center')

})