 import { message } from "antd";
import axios from "axios";

import { getToken } from "../utils/user-token";


const instance = axios.create({
  // 优先读取环境变量，没有则回退到 localhost
  baseURL: import.meta.env.VITE_BASE_URL ?? "http://localhost:3005",
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
  res => {
    // 状态码为 2xx 时进入这里
    const resData = (res.data || {}) as ResType
    const { errno, data, msg } = resData
    if (errno !== 0) {
      if (msg) message.error(msg)
      throw new Error(msg || "请求失败")
    }
    return data as any
  },
  error => {
    // 🌟 状态码不是 2xx 时（比如 401, 500）进入这里
    message.destroy() // 防止弹窗堆叠
    
    // 1. 尝试获取后端返回的业务错误信息
    // 对应你后端返回的 {"errno":-1, "msg":"用户名或密码错误", "data":null}
    const resData = error.response?.data
    const errorMsg = resData?.msg || error.message || "网络请求错误"

    // 2. 弹出真实的错误原因
    message.error(errorMsg)

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