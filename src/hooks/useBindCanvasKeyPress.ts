import { useKeyPress } from "ahooks";
import { useDispatch } from "react-redux";

import {
  removeSelectedComponent,
  copySelectedComponent,
  pasteCopiedComponent,
  selectPrevComponent,
  selectNextComponent,
} from "../store/componentsReducer";

//判断当前选中的元素是否有效
function isActiveElementValid(){
  const activeElem=document.activeElement;
  
  // 如果焦点在 body，有效
  if(activeElem === document.body) return true;
  
  // 如果焦点在画布区域内，也有效
  const canvasWrapper = document.querySelector('.canvas-wrapper');
  if(canvasWrapper && canvasWrapper.contains(activeElem)) return true;
  
  // 如果焦点是可编辑元素（input、textarea等），则无效（避免干扰输入）
  const editableTags = ['INPUT', 'TEXTAREA', 'SELECT'];
  if(editableTags.includes(activeElem.tagName)) return false;
  
  // 其他情况（如左侧面板）也允许响应键盘事件
  return true;
}

function useBindCanvasKeyPress(){
  const dispatch = useDispatch();
  //删除选中的组件
  useKeyPress(["delete","backspace"],()=>{
    if(!isActiveElementValid()) return;
    dispatch(removeSelectedComponent());
  })

  //复制
  useKeyPress(["ctrl.c",'meta.c','ctrl.C','meta.C'],()=>{
    if(!isActiveElementValid()) return;
    dispatch(copySelectedComponent());
  })
  
  //粘贴
  useKeyPress(["ctrl.v",'meta.v','ctrl.V','meta.V'],()=>{
    if(!isActiveElementValid()) return;
    dispatch(pasteCopiedComponent());
  })

  //选中上一个
  useKeyPress('uparrow',(event)=>{
    if(!isActiveElementValid()) return;
    event.preventDefault(); // 阻止浏览器默认的向上滚动/焦点移动
    dispatch(selectPrevComponent());
  })

  //选中下一个
  useKeyPress('downarrow',(event)=>{
    if(!isActiveElementValid()) return;
    event.preventDefault(); // 阻止浏览器默认的向下滚动/焦点移动
    dispatch(selectNextComponent());
  })

  //还没实现的功能 撤销 重做
}

export default useBindCanvasKeyPress