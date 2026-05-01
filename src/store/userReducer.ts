import {createSlice,PayloadAction} from "@reduxjs/toolkit";

export type UserStateType={
  username:string
  nickname:string
}

const INIT_STATE:UserStateType={
  username:"",
  nickname:"",
}

export const userSlice=createSlice({
  name:"user",
  initialState:INIT_STATE,
  reducers:{
    loginReducer:(state:UserStateType,action:PayloadAction<UserStateType>)=>{
      return action.payload//设置username和nickname，用不到immer
    },
    logoutReducer:()=>INIT_STATE//退出登录，清空username和nickname
  },
})

export const {loginReducer,logoutReducer}=userSlice.actions

export default userSlice.reducer
