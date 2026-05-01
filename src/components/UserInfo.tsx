import React,{type FC} from 'react'
import { Link,useNavigate } from 'react-router-dom'
// import {useRequest} from 'ahooks'
import { UserOutlined } from '@ant-design/icons'
import { Button,message } from 'antd'
import { useDispatch } from 'react-redux'

import { LOGIN_PATHNAME } from '../router/index'
// import { getUserInfoService } from '../services/user'
import { removeToken } from '../utils/user-token'
import useGetUserInfo from '../hooks/useGetUserInfo'
import { logoutReducer } from '../store/userReducer'



const UserInfo:FC=()=>{
  const nav=useNavigate()
  const dispatch=useDispatch()

  // const {data}=useRequest(getUserInfoService)
  // const {username,nickname}=data||{}
  const {username,nickname}=useGetUserInfo()

  function logout(){
    dispatch(logoutReducer())//清空了redux的用户数据
    removeToken()//退出登录
    message.success('退出登录成功')
    nav(LOGIN_PATHNAME)
  }

  const UserInfo=(
    <>
      <span style={{color:'#39c5bb'}}>
        <UserOutlined/>
        {nickname}
      </span>
      <Button type="link" style={{color:'#39c5bb'}} onClick={logout}>退出</Button>
    </>
  )

  const Login=(<Link to={LOGIN_PATHNAME}>登录</Link>)

  //对于已经登录的用户显示的内容，后面再做
  return(
    <>
      {username?UserInfo:Login}
    </>
  )
}
export default UserInfo
