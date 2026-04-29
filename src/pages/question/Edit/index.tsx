import React,{type FC,useEffect,useState} from 'react'

import {getQuestionService} from '../../../services/question'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'

const Edit:FC=()=>{
  const {loading,data}=useLoadQuestionData()

  return(
    <>
      <p>Edit page</p>
      {loading?<p>Loading..</p>:<p>{JSON.stringify(data)}</p>}
      
    </>
  )
}

export default Edit
