import React ,{FC,useRef} from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import {Space,Button,Typography, Input,Tooltip,InputRef,message,Popover} from 'antd'
import { LeftOutlined,CopyOutlined,QrcodeOutlined } from '@ant-design/icons'
//import QRcode from 'qrcode.react' // ❌ 这种写法在新版本中不可用
import { QRCodeCanvas } from 'qrcode.react' // ✅ 推荐使用 Canvas 渲染

import styles from './StatHeader.module.scss'
import useGetPageInfo from '../../../hooks/useGetPageInfo'


const {Title}=Typography

const StatHeader:FC=()=>{
  const nav=useNavigate()
  const {title,isPublished}=useGetPageInfo()
  const {id}=useParams()

  
  //拷贝链接
  const urlInputRef=useRef<InputRef>(null)
  function copy(){
    const elem=urlInputRef.current//获取input元素,useRef获取最新值
    if(elem==null)return 
    elem.select()//选中input的内容
    document.execCommand('copy')//执行复制命令 富文本操作
    message.success('复制成功')//提示复制成功
  }
    

  function genLinkAndQRCodeElem(){
    if(!isPublished)return null

    //拼接url需要参考C端规则
    const url=`http://localhost:8000/question/${id}`
    //生成二维码
    const QRCodeElem=(
      <div style={{textAlign:'center'}}>
        <QRCodeCanvas value={url} size={150} />
      </div>
    )

    return <Space>
      <Input value={url} style={{width:'300px'}} ref={urlInputRef}/>
      <Tooltip title='拷贝链接'>
        <Button icon={<CopyOutlined/>} onClick={copy}></Button>
      </Tooltip>
      <Popover content={QRCodeElem}>
        <Button icon={<QrcodeOutlined/>}></Button>
      </Popover>
    </Space>
  }
  
  return <div className={styles['header-wrapper']}>
    <div className={styles.header}>
      <div className={styles.left}>
        <Space>
          <Button type='link' icon={<LeftOutlined/>} onClick={()=>nav(-1)}>返回</Button>
          <Title>{title}</Title>
        </Space>
      </div>
      <div className={styles.main}>
        {genLinkAndQRCodeElem()}
      </div>
      <div className={styles.right}>
        <Button type='primary' onClick={()=>nav(`/question/edit/${id}`)}>编辑问卷</Button>
      </div>
    </div>
  </div> 
}

export default StatHeader
