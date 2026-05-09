import { render,screen } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers' // 引入匹配器
import { expect, test } from 'vitest'

// 关键一步：让 Vitest 的 expect 穿上 jest-dom 的装甲
expect.extend(matchers)

import Component from './Component';

test("默认属性", () => {
  render(<Component />)
  const span=screen.getByText('一行段落')
  expect(span).toBeInTheDocument()
})

test('传入属性',()=>{
  render(<Component text='hello' isCenter={true}/>)
  const span=screen.getByText('hello')
  expect(span).toBeInTheDocument()


  const p=span.parentElement
  expect(p).not.toBeNull()

  const style=p.style
  expect(style.textAlign).toBe('center')

})

test('多行文字',()=>{
  render(<Component text={'测试描述1\n测试描述2'}/>)
    const span=screen.getByText('测试描述1')
    expect(span).toBeInTheDocument()

    expect(span).toHaveTextContent('测试描述1')
    expect(span).not.toHaveTextContent('测试描述1测试描述2')
})