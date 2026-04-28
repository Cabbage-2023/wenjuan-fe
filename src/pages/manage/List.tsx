import React,{type FC,useState} from 'react'
// import {useSearchParams} from 'react-router-dom'
import { useTitle } from 'ahooks' 
import { Typography } from 'antd'

import styles from './common.module.scss'
import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'

const {Title}=Typography

const rawQuestionList=[
  {_id:'q1',title:'问卷1',isPublished:false,isStar:false,answerCount:5,createAt:'3月10日 13:23'},
  {_id:'q2',title:'问卷2',isPublished:true,isStar:true,answerCount:3,createAt:'3月11日 13:23'},
  {_id:'q3',title:'问卷3',isPublished:false,isStar:false,answerCount:6,createAt:'3月12日 13:23'},
  {_id:'q4',title:'问卷4',isPublished:true,isStar:true,answerCount:2,createAt:'3月9日 13:23'},
]


const List:FC=()=>{
  useTitle('小慕问卷-我的问卷')

  // const [searchParams]=useSearchParams()
  // console.log('keyword',searchParams.get('keyword'))

  const [questionList,setQuestionList]=useState(rawQuestionList) 

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
        {/* 问卷列表 */}
        {questionList.length>0 &&
          questionList.map((item)=>{
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