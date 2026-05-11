import React,{type FC,useEffect,useState} from 'react'
import { Space,Typography } from 'antd';
import { Link } from 'react-router-dom';
import { FormOutlined } from '@ant-design/icons';

import styles from './Logo.module.scss'
import useGetUserInfo from '../hooks/useGetUserInfo'
import { HOME_PATHNAME,MANAGE_INDEX_PATHNAME } from '../constant/index2'

const {Title}=Typography;

const Logo:FC=()=>{
  const {username}=useGetUserInfo()
  // 🌟 直接计算，不需要 useState 和 useEffect
  //const pathname = username ? MANAGE_INDEX_PATHNAME : HOME_PATHNAME
  //忘了上面这样想干啥了，直接把logo改回默认HOME页面吧

  return(
    <div className={styles.container}>
      <Link to={HOME_PATHNAME}>
        <Space>
          <Title>
            <FormOutlined />
          </Title>
          <Title>小慕问卷</Title>
        </Space>
      </Link>
    </div>
  )
}
export default Logo
