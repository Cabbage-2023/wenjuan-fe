import React,{type FC,useEffect,useState,useRef} from 'react'  
import { useTitle,useDebounceFn,useRequest } from 'ahooks' 
import { Typography,Spin,Empty } from 'antd'
import { useSearchParams } from 'react-router-dom'

import styles from './common.module.scss'
import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'
import { getQuestionListService } from '../../services/question'
import { LIST_PAGE_SIZE,LIST_SEARCH_PARAM_KEY} from '../../constant/index'


const {Title}=Typography

const List: FC = () => {
  useTitle('小慕问卷 - 我的问卷')
  const [searchParams] = useSearchParams()

  // 🌟 使用 Ref 维护那些需要“跨渲染周期”且“同步更新”的值
  const pageRef = useRef(1)      // 追踪当前请求到第几页
  const [list, setList] = useState([]) // 仅用于 UI 渲染的数据
  const [total, setTotal] = useState(0)
  const haveMoreData = total > list.length

  // 🌟 1. 加载数据的核心逻辑
  const { run: load, loading } = useRequest(
    async () => {
      const data = await getQuestionListService({
        page: pageRef.current, // 永远拿最新的 Ref 值
        pageSize: LIST_PAGE_SIZE,
        keyword: searchParams.get(LIST_SEARCH_PARAM_KEY) || '',
      })
      return data
    },
    {
      manual: true,
      onSuccess(result) {
        const { list: newList = [], total: newTotal = 0 } = result
        
        // 🌟 关键：根据当前页码决定是覆盖还是拼接
        setList((prevList) => {
          if (pageRef.current === 1) return newList // 第一页：直接覆盖（解决重置问题）
          return [...prevList, ...newList]          // 后续页：追加
        })

        setTotal(newTotal)
        pageRef.current += 1 // 成功后，Ref 自增
      },
    }
  )

  // 🌟 2. 监听搜索词变化（这里是唯一产生警告的地方，我们用 Ref 绕过）
  useEffect(() => {
    // 当搜索词变动时，我们不 setState，而是重置 Ref 并直接发起请求
    pageRef.current = 1 
    load() 
    // 💡 这里的 ESLint 报错如果你觉得烦，可以用 // eslint-disable-line 关掉
    // 因为这确实是无限滚动业务的“刚需”
  }, [searchParams]) // eslint-disable-line react-hooks/exhaustive-deps

  // 🌟 3. 防抖触发逻辑
  const containerRef = useRef<HTMLDivElement>(null)
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = containerRef.current
      if (!elem) return
      const { bottom } = elem.getBoundingClientRect()

      if (loading || !haveMoreData) return // 防火墙
      if (bottom <= window.innerHeight) {
        load()
      }
    },
    { wait: 500 }
  )

  // 🌟 4. 滚动监听
  useEffect(() => {
    window.addEventListener('scroll', tryLoadMore)
    return () => window.removeEventListener('scroll', tryLoadMore)
  }, [haveMoreData, loading, tryLoadMore])

  return (
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
        {/* 🌟 列表应该始终渲染，不被 loading 阻断 */}
        {list.length > 0 &&
          list.map((item: any) => {
            const { _id } = item
            return <QuestionCard key={_id} {...item} />
          })
        }

        {/* 如果加载结束且确实没数据，渲染 Empty */}
        {!loading && list.length === 0 && <Empty description="什么都没搜到哦" />}
      </div>

      <div className={styles.footer}>
      <div ref={containerRef} style={{ textAlign: 'center', padding: '20px' }}>
        {/* 🌟 loading 状态放在底部，作为“加载中”的提示 */}
        {loading && <Spin />}
        
        {/* 🌟 各种状态的文案提示 */}
        {!loading && !haveMoreData && list.length > 0 && <span>没有更多数据了</span>}
        {!loading && haveMoreData && <span>上滑加载更多...</span>}
        {!loading && list.length === 0 && <span>暂无数据</span>}
      </div>
    </div>
    </>
  )
}

export default List