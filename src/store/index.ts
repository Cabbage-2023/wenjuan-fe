import { configureStore } from "@reduxjs/toolkit";

import userReducer,{ UserStateType } from "./userReducer";
import componentsReducer,{ ComponentsStateType } from "./componentsReducer";


export type StateType={
  user:UserStateType
  components:ComponentsStateType
}

export default configureStore({
  reducer: {
    user:userReducer,


    components:componentsReducer,
    //组件列表（复杂，undo/redo）

    //问卷信息
  },
})
