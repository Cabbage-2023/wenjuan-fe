import { configureStore } from "@reduxjs/toolkit";
import undoable,{excludeAction,StateWithHistory} from "redux-undo";


import userReducer,{ UserStateType } from "./userReducer";
import componentsReducer,{ ComponentsStateType } from "./componentsReducer";
import pageInfoReducer,{ PageInfoType } from "./pageInfoReducer";


export type StateType={
  user:UserStateType
  components:StateWithHistory<ComponentsStateType>// 增加了undo/redo功能
  pageInfo:PageInfoType
}

export default configureStore({
  reducer: {
    user:userReducer,

    //组件列表（复杂，undo/redo）
    components:undoable(componentsReducer,{
      limit:20,//最大历史记录数
      //排除一些操作，不记录到历史记录中
      filter:excludeAction([
        'components/resetComponents',
        'components/changeSelectedId',
        'components/selectNextComponent',
        'components/selectPrevComponent',
      ]),
    }),

    //页面信息
    pageInfo:pageInfoReducer, 
  },
})
