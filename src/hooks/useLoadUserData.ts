import {useEffect,useState} from "react";
import {useRequest} from "ahooks";
import {useDispatch} from "react-redux";

import useGetUserInfo from "./useGetUserInfo";
import { getUserInfoService } from "../services/user";
import { loginReducer } from "../store/userReducer";
import { getToken } from "../utils/user-token";


function useLoadUserData(){
  const dispatch=useDispatch()

  const { username } = useGetUserInfo()
  // 🌟 修改点 1：初始值直接根据 username 和 token 计算
  // 如果已经有 username 或者压根没有 token，那就不需要“等待加载数据”
  const [waitingUserData, setWaitingUserData] = useState(() => {
    const token = getToken()
    if (username || !token) return false
    return true
  })

  //ajax加载用户信息
  const{run}=useRequest(getUserInfoService,{
    manual:true,
    onSuccess:(result)=>{
      const {username,nickname}=result
      dispatch(loginReducer({username,nickname}))//设置username和nickname
    },
    onFinally:()=>{
      setWaitingUserData(false)//如果加载完成，就设置waitingUserData为false
    },
  })

  useEffect(() => {
    // 🌟 修改点 2：useEffect 只负责发起异步请求（外部系统同步）
    // 既然初始状态已经处理了“不用等”的情况，这里只需要判断什么时候“需要跑”
    if (username) return

    const token = getToken()
    if (token) {
      run()
    }
  }, [username]) // 当 username 变化时重新校验

  //ajax加载完用户信息以后直接放在redux里，不用返回
  return{waitingUserData}
}

export default useLoadUserData
