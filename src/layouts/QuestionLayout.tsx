import React,{type FC} from 'react'
import {Outlet} from 'react-router-dom'

const QuestionLayout:FC=()=>{
  return(
    <>
      <p>QuestionLayout</p>
      <div className="">
        <Outlet />
      </div>
    </>
  )
}

export default QuestionLayout
