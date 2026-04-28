import React,{type FC} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { Button,Typography } from 'antd'

import { MANAGE_INDEX_PATHNAME } from '../router/index'
import styles from './Home.module.scss'


const { Title,Paragraph } = Typography;


const Home:FC=()=>{
  const nav=useNavigate()
  function clickHandler(){
    nav({
      pathname:'/login',
      search:'b=10',
    })
  }

  return(
    <div className={styles.container}>
      <div className={styles.info}>
        <Title>问卷调查 | 在线投票</Title>
        <Paragraph>
          已累计创建问卷100份，发布问卷90份，收到答卷980份
        </Paragraph>
        <div>
          <Button type="primary" onClick={()=>nav(MANAGE_INDEX_PATHNAME)}>开始使用</Button>
        </div>
      </div>
    </div>
  )
}

export default Home