import React,{type FC} from 'react'
import {Outlet} from 'react-router-dom'

const MainLayout:FC=()=>{
  return(
    <>
      <div className="">MainLayout Header</div>
      <div>
        <Outlet />
      </div>
      <div className="">MainLayout Footer</div>
    </>
  )
}

export default MainLayout
