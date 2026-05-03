import {useParams} from "react-router-dom"
import {useRequest} from 'ahooks'
import { useEffect } from "react";
import { useDispatch} from "react-redux";


import {getQuestionService} from "../services/question";
import { resetComponents } from "../store/componentsReducer";



//自定义hooks,用于加载卡片数据
function useLoadQuestionData(){
  const {id=''}=useParams()
  const dispatch=useDispatch()

  //ajax加载
  const{data,loading,error,run}=useRequest(async(id:string)=>{
    if(!id) throw new Error('id不能为空')
    const data=await getQuestionService(id)
    return data
  },{
    manual:true,
  })

  //根据获取的data设置redux store
  useEffect(()=>{
    if(!data) return
    const {title='',componentList=[]}=data

    let selectedId=''
    if(componentList.length>0){
      selectedId=componentList[0].fe_id//默认选中第一个组件
    }

    //把componentList存到redux里
    dispatch(resetComponents({componentList,selectedId,copiedComponent:null}))
  },[data])


  //判断id变化，执行ajax加载问卷数据
  useEffect(()=>{
    run(id)
  },[id])

  return{loading,error}
}
export default useLoadQuestionData