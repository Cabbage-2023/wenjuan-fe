import { useEffect } from "react"
import { useLocation,useNavigate } from "react-router-dom"

import useGetUserInfo from "./useGetUserInfo"
import { isLoginOrRegister,MANAGE_INDEX_PATHNAME,isNoNeedUserInfo ,LOGIN_PATHNAME} from "../router"



function useNavPage(waitingUserData: boolean){
  const nav=useNavigate()
  const{username}=useGetUserInfo()
  const {pathname}=useLocation()

  useEffect(()=>{
    if(waitingUserData){
      return
    }

    //如果用户已登录，且当前路由是登录或注册路由，导航到管理首页
    if(username){
      if(isLoginOrRegister(pathname)){
        nav(MANAGE_INDEX_PATHNAME)
      }
      return
    }

    //如果用户未登录，且当前路由不是登录或注册路由，导航到登录页
    if(isNoNeedUserInfo(pathname)){
      return
    }else{
      nav(LOGIN_PATHNAME)
    }
  },[waitingUserData,username,pathname])

}

export default useNavPage