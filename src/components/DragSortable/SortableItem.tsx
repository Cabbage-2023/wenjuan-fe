import React,{FC,ReactNode} from "react";
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';


type PropsType={
  id:string
  children:ReactNode// 涵盖了单个、多个元素以及文本等所有情况
}

const SortableItem:FC<PropsType>=({id,children})=>{
  const {attributes,listeners,setNodeRef,transform,transition}=useSortable({id});

  const style={
    transform:CSS.Transform.toString(transform),
    transition
  };

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
        {children}
    </div>
  )
}

export default SortableItem
