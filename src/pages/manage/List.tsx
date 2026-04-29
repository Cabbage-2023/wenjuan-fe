import React,{type FC} from 'react'
import { useTitle } from 'ahooks' 
import { Typography,Spin } from 'antd'

import styles from './common.module.scss'
import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'



const {Title}=Typography

const List:FC=()=>{
  useTitle('小慕问卷-我的问卷')

  const {data={},loading}=useLoadQuestionListData()
  const {list=[],total=0}=data || {}

  return(
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      
      <div className={styles.content}>
        {loading && <div style={{textAlign:'center'}}><Spin /></div>}
        {/* 问卷列表 */}
        {!loading && list.length>0 &&
          list.map((item)=>{
            const {_id}=item
            return(
              <QuestionCard key={_id} {...item} />
            )
          })}
      </div>
      <div className={styles.footer}>loadmore... 上滑加载更多...</div>
    </>
  )
}

export default List