import React,{lazy,Suspense} from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

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
// import Edit from '../pages/question/Edit'
// import Stat from '../pages/question/Stat'
//懒加载两个较大的页面
const Edit=lazy(()=>import('../pages/question/Edit'))
const Stat=lazy(()=>import('../pages/question/Stat'))


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

const AppRouter: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default AppRouter
