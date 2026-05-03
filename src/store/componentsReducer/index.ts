import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import cloneDeep from "lodash/cloneDeep";
import { nanoid } from 'nanoid'

import { ComponentPropsType } from "../../components/QuestionComponents";
import { getNextSelectedId, insertNewComponent } from "./utils";

export type ComponentInfoType = {
  fe_id: string
  type: string
  title: string
  isHidden?: boolean
  isLocked?: boolean
  props: ComponentPropsType
};

export type ComponentsStateType = {
  selectedId: string
  componentList: Array<ComponentInfoType>
  copiedComponent: ComponentInfoType | null //复制的组件,暂存

};

const INIT_STATE: ComponentsStateType = {
  selectedId: "",
  componentList: [],
  //其他拓展
  copiedComponent: null, 
};

export const componentsSlice = createSlice({
  name: "components",
  initialState: INIT_STATE,
  reducers: {
    //重置所有组件
    resetComponents(
      state: ComponentsStateType,
      action: PayloadAction<ComponentsStateType>
    ) {
      return action.payload;
    },

    // 🌟 修改 selectedId：直接修改 state 即可，不需要包裹 produce
    changeSelectedId(
      state: ComponentsStateType,
      action: PayloadAction<string>
    ) {
      // RTK 内部已经用了 immer，这里的 state 本质上就是 draft
      state.selectedId = action.payload;
    },

    //添加组件到画布
    addComponent(
      state: ComponentsStateType,
      action: PayloadAction<ComponentInfoType>
    ) {
      const newComponent = action.payload;

      insertNewComponent(state, newComponent);
    },

    //修改组件属性
    changeComponentProps(
      state: ComponentsStateType,
      action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>
    ) {
      const { fe_id, newProps } = action.payload;
      //找到组件
      const curComp = state.componentList.find((item) => item.fe_id === fe_id);
      if (!curComp) return;
      curComp.props = {
        ...curComp.props,
        ...newProps,
      };
    },

    //删除选中的组件
    removeSelectedComponent(state: ComponentsStateType) {
      const { selectedId, componentList } = state;
      //重新计算selectedId
      const newSelectedId = getNextSelectedId(selectedId, componentList);
      state.selectedId = newSelectedId;

      const index = componentList.findIndex(
        (item) => item.fe_id === selectedId
      );
      if (index === -1) return;
      componentList.splice(index, 1);
    },

    //隐藏/显示选中的组件
    changeComponentHidden(
      state: ComponentsStateType,
      action: PayloadAction<{ fe_id: string; isHidden: boolean }>
    ) {
      const {componentList} = state
      const {fe_id,isHidden} = action.payload

      //重新计算selectedId，更新属性面板
      const newSelectedId = isHidden 
        ? getNextSelectedId(fe_id, componentList) 
        : fe_id
      state.selectedId = newSelectedId;
      
      const curComp = componentList.find((item) => item.fe_id === fe_id);
      if (!curComp) return;
      curComp.isHidden = isHidden; 
    },

    //锁定/解锁选中的组件
    toggleComponentLocked(
      state: ComponentsStateType,
      action: PayloadAction<{ fe_id: string}>
    ) {
      const {fe_id} = action.payload
      
      const curComp = state.componentList.find((item) => item.fe_id === fe_id);
      if (!curComp) return;
      curComp.isLocked = !curComp.isLocked; 
    },

    //复制选中的组件
    copySelectedComponent(state: ComponentsStateType) {
      const {selectedId,componentList} = state
      const curComp = componentList.find((item) => item.fe_id === selectedId);
      if (!curComp) return;
      state.copiedComponent = cloneDeep(curComp)//深拷贝
    },

    //粘贴选中的组件
    pasteCopiedComponent(state: ComponentsStateType) {
      const {copiedComponent,componentList} = state
      if (!copiedComponent) return;

      //要把fe_id也改变，重要！
      copiedComponent.fe_id = nanoid()
      //插入copiedComponent
      insertNewComponent(state, copiedComponent)
    },

    //选中上一个组件
    selectPrevComponent(state: ComponentsStateType) {
      const {selectedId,componentList} = state
      const selectedIndex = componentList.findIndex((item) => item.fe_id === selectedId);
      
      if(selectedIndex<0) return //没有选中的组件
      if(selectedIndex===0) return //选中了第一个，无法再向上选中
       
      state.selectedId=componentList[selectedIndex-1].fe_id
    },
    //选中下一个组件
    selectNextComponent(state: ComponentsStateType) {
      const {selectedId,componentList} = state
      const selectedIndex = componentList.findIndex((item) => item.fe_id === selectedId);
      
      if(selectedIndex<0) return //没有选中的组件
      if(selectedIndex+1===componentList.length) return //选中了最后一个，无法再向下选中
       
      state.selectedId=componentList[selectedIndex+1].fe_id
    }
  },
});

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
  selectPrevComponent,
  selectNextComponent,
} = componentsSlice.actions;

export default componentsSlice.reducer;
