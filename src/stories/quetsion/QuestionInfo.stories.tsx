import React from 'react'
// 1. 类型名变了：ComponentMeta -> Meta, ComponentStory -> StoryObj
import { Meta, StoryObj } from '@storybook/react'

import Component from '../../components/QuestionComponents/QuestionInfo/Component'

// 2. Default Export (对应你截图里的 6-9 行)
const meta: Meta<typeof Component> = {
  title: 'Question/QuestionInfo',
  component: Component,
}
export default meta

type Story = StoryObj<typeof Component>

// 3. 默认属性 (对应你截图里的 13-15 行)
// 现在不需要写 Template.bind({}) 了，直接写对象
export const Default: Story = {
  args: {},
}

// 4. 设置了属性 (对应你截图里的 17-22 行)
export const SetProps: Story = {
  args: {
    title: 'hello',
    desc: 'world',
  },
}

//换行
export const DescWithBreakLink: Story = {
  args: {
    title: 'hello',
    desc: 'world\nhello',
  },
}