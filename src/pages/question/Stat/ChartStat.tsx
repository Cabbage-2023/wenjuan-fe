import React,{FC, useEffect, useState} from 'react'
import {Typography} from 'antd'
import { useRequest } from 'ahooks';
import { useParams } from 'react-router-dom';


import { getComponentStatService } from '../../../services/stat'
import { getComponentConfByType } from '../../../components/QuestionComponents';


type SelectedComponentIdType={
  selectedComponentId: string;
  selectedComponentType: string;
}

const {Title}=Typography


const ChartStat:FC<SelectedComponentIdType>=(props:SelectedComponentIdType)=>{
  const {selectedComponentId,selectedComponentType}=props
  const {id=''}=useParams()

  const [stat,setStat]=useState([])
  const {run}=useRequest(async(questionId:string,componentId:string)=>{
    const res=await getComponentStatService(questionId,componentId)
    return res
  },{
    manual:true,
    onSuccess(res){
      setStat(res.stat)
    }
  })

  //选中了组件再执行请求
  useEffect(()=>{
    if(selectedComponentId) run(id,selectedComponentId)
  },[id,selectedComponentId])

  function genStatElem(){
    if(!selectedComponentId) return <div style={{textAlign:'center'}}>未选中组件</div>

    const {StatComponent}=getComponentConfByType(selectedComponentType)||{}
    if(!StatComponent) return <div style={{textAlign:'center'}}>该组件无统计图表</div>

    return <StatComponent stat={stat} />
  }

  return <>
    <Title level={3}>图表统计</Title>
    <div>{genStatElem()}</div>
  </>
}

export default ChartStat
