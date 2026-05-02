import React, { FC,MouseEvent } from "react";
import { Spin } from "antd";
import { useDispatch } from "react-redux";
import classNames from 'classnames'

import styles from "./EditCanvas.module.scss";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import {
  ComponentInfoType,
  changeSelectedId,
} from "../../../store/componentsReducer";
import { getComponentConfByType } from "../../../components/QuestionComponents";

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

  if (loading)
    return (
      <div style={{ textAlign: "center", marginTop: "24px" }}>
        <Spin />
      </div>
    );

  return (
    <div className={styles.canvas}>
      {componentList.map((c) => {
        const { fe_id } = c;

        const wrapperDefaultClassName=styles['component-wrapper']
        const selectedClassName=styles.selected
        const wrapperClassName=classNames({
          [wrapperDefaultClassName]:true,
          [selectedClassName]:fe_id===selectedId
        })

        return (
          <div
            key={fe_id}
            className={wrapperClassName}
            onClick={(event) => handleClick(event,fe_id)}
          >
            <div className={styles.component}>{getComponent(c)}</div>
          </div>
        );
      })}
    </div>
  );
};

export default EditCanvas;
