import React,{FC,useState,ChangeEvent,useEffect} from "react";
import {Button,Typography,Space,Input,message} from 'antd'
import { LeftOutlined,EditOutlined,LoadingOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import {useNavigate,useParams} from 'react-router-dom'
import { useRequest,useKeyPress,useDebounceEffect } from "ahooks";

import styles from './EditHeader.module.scss'
import EditToolbar from './EditToolbar'
import { changeTitle } from "../../../store/pageInfoReducer";
import useGetPageInfo from "../../../hooks/useGetPageInfo";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import { updateQuestionService } from "../../../services/question";


const {Title} = Typography

//显示和修改标题
const TitleElem:FC=()=>{
  const dispatch = useDispatch();
  const {title} = useGetPageInfo();
  const [editState,setEditState] = useState(false);
  
  function handleChange(e:ChangeEvent<HTMLInputElement>){
    const newTitle=e.target.value.trim()
    if(!newTitle){
      return
    }
    dispatch(changeTitle(newTitle))
  }

  if(editState){
    return <Input value={title} onPressEnter={()=>setEditState(false)} 
    onBlur={()=>setEditState(false)} onChange={handleChange}/>
  }

  return <Space>
      <Title>{title || '问卷标题'}</Title>
      <Button icon={<EditOutlined />} type="text" onClick={()=>setEditState(true)} />
  </Space>
}

//保存按钮
const SaveButton:FC=()=>{
  //pageInfo componentList
  const {componentList=[]} = useGetComponentInfo();
  const pageInfo = useGetPageInfo();
  const {id}=useParams();

  const {loading,run:save}=useRequest(async()=>{
    if(!id){
      return
    }
    await updateQuestionService(id,{...pageInfo,componentList})
  },{
    manual:true
  })

  //监听快捷键
  useKeyPress(['ctrl.s','meta.s'],(event:KeyboardEvent)=>{
    event.preventDefault()//阻止默认行为,防止浏览器保存整个页面
    if(!loading) save()
  })

  //修改后自动保存，1秒内未修改则不保存，一秒内修改了多次则只保存一次，有防抖
  useDebounceEffect(()=>{
    save()
  },[componentList,pageInfo],{
    wait:1000
  })

  return <Button onClick={save} disabled={loading} icon={loading?<LoadingOutlined/>:null}>保存</Button>
}

//发布按钮
const PublishButton:FC=()=>{
  const nav = useNavigate();
  //发布，实际上就是更新isPublished为true
  const {componentList=[]} = useGetComponentInfo();
  const pageInfo = useGetPageInfo();
  const {id}=useParams();


  const {loading,run:pub}=useRequest(async()=>{
    if(!id){
      return
    }
    await updateQuestionService(id,{...pageInfo,componentList,
      isPublished:true})//标志着问卷已经被发布
  },{
    manual:true,
    onSuccess:()=>{
      message.success('发布成功')
      nav(`/question/stat/${id}`)//跳转到统计页面
    }
  })


  return <Button type="primary" onClick={pub} disabled={loading}>发布</Button>
}



const EditHeader:FC=()=>{
  const nav = useNavigate()

  return <div className={styles['header-wrapper']}>
    <div className={styles.header}>
      <div className={styles.left}>
        <Space>
          <Button type="link" icon={<LeftOutlined/>} onClick={()=>nav(-1)}>返回</Button>
          <TitleElem /> 
        </Space>
      </div>
      <div className={styles.main}>
        <EditToolbar />
      </div>
      <div className={styles.right}>
        <Space>
          <SaveButton />
          <PublishButton />
        </Space>
      </div>
    </div>
  </div>
}

export default EditHeader
