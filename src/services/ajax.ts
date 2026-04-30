import { message } from "antd";
import axios from "axios";

import { getToken } from "../utils/user-token";


const instance = axios.create({
  timeout:10*1000,
});

// 配置请求拦截器
instance.interceptors.request.use(
  config=>{
    const token=getToken()
    if(token){
      config.headers['Authorization']=`Bearer ${token}`//JWT固定格式
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  res=>{
    const resData=(res.data||{}) as ResType
    const {errno,data,msg}=resData

    if(errno!==0){
      // 处理错误
      if(msg){
        message.error(msg)
      }

      throw new Error(msg||"请求失败")
    }

    return data as any
  },
  error => {
    message.error("网络请求错误")
    return Promise.reject(error)
  }
)

export default instance;

export type ResType={
  errno:number
  data?:ResDataType
  msg?:string
}

export type ResDataType={
  [key:string]:any
}