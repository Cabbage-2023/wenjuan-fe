import {useParams} from "react-router-dom"
import {useRequest} from 'ahooks'

import {getQuestionService} from "../services/question";

//自定义hooks,用于加载卡片数据
function useLoadQuestionData(){
  const {id=''}=useParams()
  async function load(){
    const data=await getQuestionService(id)
    return data
  }
  const {loading,data,error}=useRequest(load)
  return {
    loading,
    data,
    error
  }
}
export default useLoadQuestionData