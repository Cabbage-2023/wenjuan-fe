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