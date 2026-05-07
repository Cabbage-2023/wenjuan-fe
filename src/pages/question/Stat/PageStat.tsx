import React,{useState, type FC} from 'react'
import { useRequest } from 'ahooks';
import { useParams } from 'react-router-dom';
import {Typography,Spin, Table,Pagination} from 'antd'

import { getQuestionStatListService } from '../../../services/stat'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import { STAT_PAGE_SIZE } from '../../../constant/index'


const {Title}=Typography

type PropsType={
  selectedComponentId: string;
  setSelectedComponentId: (id: string) => void;
  setSelectedComponentType: (type: string) => void;
}

const PageStat:FC<PropsType>=(props:PropsType)=>{
  const {id=''}=useParams()
  const {selectedComponentId,setSelectedComponentId,setSelectedComponentType}=props

  const [total,setTotal]=useState(0)
  const [list,setList]=useState([])
  const [page,setPage]=useState(1)
  const [pageSize,setPageSize]=useState(STAT_PAGE_SIZE)

  const {loading}=useRequest(async()=>{
    const res=await getQuestionStatListService(id,{page,pageSize})
    return res
  },{
    refreshDeps:[id,page,pageSize],//依赖项，当id、page、或pageSize变化时，重新请求
    onSuccess(res){
      const {total,list=[]}=res
      setTotal(total)
      setList(list)
    }
  })

  const {componentList}=useGetComponentInfo()
  const columns=componentList.map(item=>{
    const {fe_id,title,props={},type}=item

    const colTitle=props.title||title

    return {
      title: <div style={{cursor:'pointer'}} 
        onClick={()=>{
          setSelectedComponentId(fe_id)
          setSelectedComponentType(type)
        }}>
        <span style={{color:fe_id===selectedComponentId?'#1890FF':'inherit'}}>{colTitle}</span>
      </div>,
      dataIndex: fe_id,
      key: fe_id,      // 建议也加上 key
    }
  })


  const dataSource=list.map(item=>({...item,key:item._id}))//添加key
  const TableElem=<>
      <Table columns={columns} dataSource={dataSource} pagination={false}></Table>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '18px' }}>
        <Pagination total={total} current={page} pageSize={pageSize} onChange={page=>setPage(page)} 
          onShowSizeChange={(page,pageSize)=>{
            setPage(1)
            setPageSize(pageSize)
          }}/>
      </div>
  </>

  return <div>
      <Title level={3} style={{ marginBottom: 0, marginTop: 0 }}>
        答卷数量：{!loading && total}
      </Title>
      {loading&&<div style={{textAlign:'center' }}><Spin/></div>}
      {!loading && TableElem}
  </div>
}

export default PageStat
