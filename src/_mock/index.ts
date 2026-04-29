import Mock from 'mockjs'

Mock.mock('/api/login', 'get',()=>{
  return{
    errno:0,
    data:{
      date:`123456 ${Date.now()}`,
    }
  }
})
