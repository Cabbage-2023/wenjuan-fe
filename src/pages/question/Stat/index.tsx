import React,{type FC} from 'react'

import useLoadQuestionData from '../../../hooks/useLoadQuestionData'


const Stat:FC=()=>{
  //const {loading,data}=useLoadQuestionData()

  return(
     <>
      <p>Stat page</p>
      {/* {loading?<p>Loading..</p>:<p>{JSON.stringify(data)}</p>} */}
      
    </>
  )
}

export default Stat
