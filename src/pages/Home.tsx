import React,{type FC} from 'react'
import {Link, useNavigate} from 'react-router-dom'

const Home:FC=()=>{
  const nav=useNavigate()
  function clickHandler(){
    nav({
      pathname:'/login',
      search:'b=10',
    })
  }

  return(
    <div>
      <p>Home</p>
      <div>
        <button onClick={clickHandler}>登录</button>
        <Link to="/register?a=10">注册</Link>
      </div>
    </div>
  )
}

export default Home