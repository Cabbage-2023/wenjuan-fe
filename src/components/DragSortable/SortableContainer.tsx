import React,{FC,ReactNode} from "react";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  //arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

type PropsType={
  children:ReactNode// 涵盖了单个、多个元素以及文本等所有情况
  items:Array<{id:string;[key:string]:any}>
  onDragEnd:(oldIndex:number,newIndex:number)=>void
}

const SortableContainer:FC<PropsType>=(props:PropsType)=>{
  const {children,items,onDragEnd}=props

  const sensors = useSensors(
    useSensor(MouseSensor, {
        activationConstraint: {
            distance: 8,        //鼠标在8px内移动会被视为点击而不是拖拽
        }
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
        const oldIndex = items.findIndex(item => item.fe_id === active.id);
        const newIndex = items.findIndex(item => item.fe_id === over.id);
        onDragEnd(oldIndex, newIndex);
    }
}

  return (
    <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCenter}
    >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {children}
        </SortableContext>
    </DndContext>
  )
}

export default SortableContainer
