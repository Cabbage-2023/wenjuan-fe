import React,{  type FC} from 'react'
import {useNavigate} from 'react-router-dom'
import { Button,Typography,message } from 'antd'
import axios from 'axios'

import { MANAGE_INDEX_PATHNAME } from '../constant/index2'
import styles from './Home.module.scss'
import useGetUserInfo from '../hooks/useGetUserInfo'



const { Title,Paragraph } = Typography;


const Home:FC=()=>{
  const nav=useNavigate()
  const {username}=useGetUserInfo()

  function handleClick(){
    if(username){
      nav(MANAGE_INDEX_PATHNAME)
    }else{
      message.info('请先登录再操作')
      nav('/login')
      return
    }
  }

  return(
    <div className={styles.container}>
      <div className={styles.info}>
        <Title>问卷调查 | 在线投票</Title>
        <Paragraph>
          怎么感觉远程部署在服务器上比敲项目还累？
        </Paragraph>
        <div>
          <Button type="primary" onClick={handleClick}>开始使用</Button>
        </div>
      </div>
    </div>
  )
}

export default Home