import React,{type FC} from 'react'
import {Outlet} from 'react-router-dom'
import {Spin} from 'antd';

import useLoadUserData from '../hooks/useLoadUserData';
import useNavPage from '../hooks/useNavPage';


const QuestionLayout:FC=()=>{
  const { waitingUserData } = useLoadUserData()
  useNavPage(waitingUserData)
  
  return(
    <>
      <p>QuestionLayout</p>
      <div className="">
        {
          waitingUserData 
            ? <div style={{ textAlign: 'center', marginTop: '60px' }}><Spin /></div> // 正在加载
            : <Outlet /> // 加载完成
        }
      </div>
    </>
  )
}

export default QuestionLayout
