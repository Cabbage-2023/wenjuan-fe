import React,{type FC} from 'react'
import { Link } from 'react-router-dom'

import { LOGIN_PATHNAME } from '../router/index'

const UserInfo:FC=()=>{
  //对于已经登录的用户显示的内容，后面再做
  return(
    <>
      <Link to={LOGIN_PATHNAME}>登录</Link>
    </>
  )
}
export default UserInfo
