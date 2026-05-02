import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {ComponentPropsType} from "../../components";

export type ComponentInfoType={
  fe_id:string
  type:string
  title:string
  props:ComponentPropsType
}

export type ComponentsStateType={
  selectedId:string
  componentList:Array<ComponentInfoType>
}

const INIT_STATE:ComponentsStateType={
  selectedId:'',
  componentList:[],
  //其他拓展
}

export const componentsSlice=createSlice({
  name:'components',
  initialState:INIT_STATE,
  reducers:{
    //重置所有组件
    resetComponents(state:ComponentsStateType,action:PayloadAction<ComponentsStateType>){
      return action.payload
    },

    // 🌟 修改 selectedId：直接修改 state 即可，不需要包裹 produce
    changeSelectedId(state: ComponentsStateType, action: PayloadAction<string>) {
      // RTK 内部已经用了 immer，这里的 state 本质上就是 draft
      state.selectedId = action.payload;
    }
  }
})

export const {resetComponents,changeSelectedId}=componentsSlice.actions

export default componentsSlice.reducer