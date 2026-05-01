import React from 'react'
import {BrowserRouter,createBrowserRouter,Route,Routes} from 'react-router-dom'

import MainLayout from '../layouts/MainLayout'
import ManageLayout from '../layouts/ManageLayout'
import QuestionLayout from '../layouts/QuestionLayout'

import Home from '../pages/Home'
import Login from '../pages/Login'
import NotFound from '../pages/NotFound'
import Register from '../pages/Register'
import List from '../pages/manage/List'
import Star from '../pages/manage/Star'
import Trash from '../pages/manage/Trash'
import Edit from '../pages/question/Edit'
import Stat from '../pages/question/Stat'

const router=createBrowserRouter([
  {
    path:'/',
    element:<MainLayout />,
    children:[
      {
        path:'/',
        element:<Home />,
      },
      {
        path:'/login',
        element:<Login />,
      },
      {
        path:'/register',
        element:<Register />,
      },
      {
        path:'/manage',
        element:<ManageLayout />,
        children:[
          {
            path:'/manage/list',
            element:<List />,
          },
          {
            path:'/manage/star',
            element:<Star />,
          },
          {
            path:'/manage/trash',
            element:<Trash />,
          },
        ]
      },
      
      {
        path:'*',//404
        element:<NotFound />,
      }
    ]
  },
  {
    path:'/question',
    element:<QuestionLayout />,
    children:[
      {
        path:'/question/edit/:id',
        element:<Edit />,
      },
      {
        path:'/question/stat/:id',
        element:<Stat />,
      },
    ]
  },
])

export default router


//-------------分割线-----------------
//常用的路由路径
export const HOME_PATHNAME='/'
export const LOGIN_PATHNAME='/login'
export const REGISTER_PATHNAME='/register'
export const MANAGE_INDEX_PATHNAME='/manage/list'

export function isLoginOrRegister(pathname: string){
  if([LOGIN_PATHNAME,REGISTER_PATHNAME].includes(pathname)){
    return true
  }
  return false
}

export function isNoNeedUserInfo(pathname: string){
  if([HOME_PATHNAME,LOGIN_PATHNAME,REGISTER_PATHNAME].includes(pathname)){
    return true
  }
  return false
}