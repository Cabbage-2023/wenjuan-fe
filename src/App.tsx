import React from 'react'
import {RouterProvider} from 'react-router-dom'


import List from './pages/manage/List'
import router from './router'


function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
