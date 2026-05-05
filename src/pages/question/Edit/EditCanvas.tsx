import React, { FC,MouseEvent, use } from "react";
import { Spin } from "antd";
import { useDispatch } from "react-redux";
import classNames from 'classnames'

import styles from "./EditCanvas.module.scss";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import {
  ComponentInfoType,
  changeSelectedId,
  moveComponent,
} from "../../../store/componentsReducer";
import { getComponentConfByType } from "../../../components/QuestionComponents";
import useBindCanvasKeyPress from "../../../hooks/useBindCanvasKeyPress";
import SortableContainer from "../../../components/DragSortable/SortableContainer";
import SortableItem from "../../../components/DragSortable/SortableItem";

type PropsType = {
  loading: boolean;
};

function getComponent(componentInfo: ComponentInfoType) {
  //收到了来自后端的组件信息，先根据组件类型获取组件配置
  const { type, props } = componentInfo;

  const componentConf = getComponentConfByType(type);
  if (!componentConf) return null;

  //props才是真正的组件属性，默认属性里有组件默认值，还有Component属性
  //这个Component属性可以接收props，也就是服务器的数据，然后在画布上渲染出组件
  const { Component } = componentConf;
  return <Component {...props} />;
}

const EditCanvas: FC<PropsType> = ({ loading }) => {
  const { componentList,selectedId } = useGetComponentInfo();
  const dispatch = useDispatch();

  function handleClick(event: MouseEvent,id: string) {
    event.stopPropagation()//阻止事件冒泡,点击组件时,不会触发点击画布事件
    dispatch(changeSelectedId(id));
  }

  //绑定画布的键盘事件
  useBindCanvasKeyPress()

  if (loading)
    return (
      <div style={{ textAlign: "center", marginTop: "24px" }}>
        <Spin />
      </div>
    );

    //sortableContainer组件的items属性，需要每个item都有id
    const componentListWithId = componentList.map((c) => ({
      ...c,
      id: c.fe_id,
    }));
    //sortableContainer组件的onDragEnd属性，需要在拖动结束时调用
    function handleDragEnd(oldIndex: number, newIndex: number) {
      dispatch(moveComponent({ oldIndex, newIndex }));
    }

  return (
    <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
      <div className={styles.canvas}>
        {componentList.filter((c)=>!c.isHidden).map((c) => {
          const { fe_id,isLocked } = c;

          const wrapperDefaultClassName=styles['component-wrapper']
          const selectedClassName=styles.selected
          const lockedClassName=styles.locked
          const wrapperClassName=classNames({
            [wrapperDefaultClassName]:true,
            [selectedClassName]:fe_id===selectedId,
            [lockedClassName]:isLocked,
          })

          return (
            <SortableItem key={fe_id} id={fe_id}>
              <div
                className={wrapperClassName}
                onClick={(event) => handleClick(event,fe_id)}
              >
                <div className={styles.component}>{getComponent(c)}</div>
              </div>
            </SortableItem>
          );
        })}
      </div>
    </SortableContainer>
  );
};

export default EditCanvas;
