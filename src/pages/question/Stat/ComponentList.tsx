import React,{ FC, useState } from 'react';
import classNames from 'classnames';

import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { getComponentConfByType } from '../../../components/QuestionComponents';
import styles from './ComponentList.module.scss';

type PropsType={
  selectedComponentId: string;
  setSelectedComponentId: (id: string) => void;
  setSelectedComponentType: (type: string) => void;
}


const ComponentList: FC<PropsType> = (props) => {
  const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props;
  const { componentList } = useGetComponentInfo();

  return (
      <div className={styles.container}>
          {
              componentList
                  .filter(c => !c.isHidden)          //过滤隐藏的组件
                  .map(c => {
                      const { fe_id, props, type } = c;

                      const componentConfig = getComponentConfByType(type);
                      if (!componentConfig) return null;

                      const { Component } = componentConfig;

                      //拼接class name
                      const wrapperDefaultClassName = styles['component-wrapper'];
                      const selectedClassName = styles.selected;
                      const wrapperClassName = classNames({
                          [wrapperDefaultClassName]: true,
                          [selectedClassName]: fe_id === selectedComponentId
                      });

                      return (
                          <div        
                              className={wrapperClassName}
                              key={fe_id}
                              onClick={() => {
                                  setSelectedComponentId(fe_id);
                                  setSelectedComponentType(type);
                              }}
                              onBlur={() => {
                                  setSelectedComponentId('');
                              }}
                              >
                              <div className={styles.component}>
                                  <Component {...props} />
                              </div>
                          </div>
                      )
                  })
          }
      </div>
  )
}

export default ComponentList;