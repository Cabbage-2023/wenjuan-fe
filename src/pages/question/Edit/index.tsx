import React,{type FC,useEffect,useState} from 'react'
import { useDispatch } from "react-redux";


import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import styles from './index.module.scss'
import EditCanvas from './EditCanvas';
import { changeSelectedId } from "../../../store/componentsReducer";


const Edit:FC=()=>{
  const dispatch = useDispatch();
  const {loading}=useLoadQuestionData()

  function clearSelectedId(){
    dispatch(changeSelectedId(''))
  }

  return(
    <div className={styles.container}>
      <div style={{backgroundColor:'white',height:'40px'}}>Header</div>
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>Left</div>
          <div className={styles.main} onClick={clearSelectedId}>
            <div className={styles['canvas-wrapper']}>
              <EditCanvas loading={loading} />
            </div>
          </div>
            
          <div className={styles.right}>Right</div>
        </div>
      </div>
    </div>
  )
}

export default Edit
