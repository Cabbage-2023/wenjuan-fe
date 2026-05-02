import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {ComponentPropsType} from "../../components/QuestionComponents";

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
    },

    //添加组件到画布
    addComponent(state:ComponentsStateType,action:PayloadAction<ComponentInfoType>){
      const newComponent=action.payload

      const {selectedId,componentList}=state
      const index=componentList.findIndex((item)=>item.fe_id===selectedId)
      if(index===-1){
        //如果没有选中的组件，直接添加到列表末尾
        componentList.push(newComponent)
      }else{
        //如果有选中的组件，添加到选中组件的后面
        componentList.splice(index+1,0,newComponent)
      }

      //添加组件后，将选中的组件设置为新添加的组件
      state.selectedId=newComponent.fe_id
    },

    //修改组件属性
    changeComponentProps(state:ComponentsStateType,action:PayloadAction<{fe_id:string,newProps:ComponentPropsType}>){
      const {fe_id,newProps}=action.payload
      //找到组件
      const curComp=state.componentList.find((item)=>item.fe_id===fe_id)
      if(!curComp) return
      curComp.props={
        ...curComp.props,
        ...newProps
      }
    }
  }
})

export const {resetComponents,changeSelectedId,addComponent,changeComponentProps}=componentsSlice.actions

export default componentsSlice.reducer