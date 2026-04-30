import React, { type FC, useState } from "react";
import { useTitle,useRequest } from "ahooks";
import { Typography, Empty, Table, Tag, Button,Space,Modal,Spin,message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import styles from "./common.module.scss";
import ListSearch from '../../components/ListSearch'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import ListPage from '../../components/ListPage'
import {updateQuestionService,deleteQuestionService} from '../../services/question'

interface QuestionDataType {
  _id: string;
  title: string;
  isPublished: boolean;
  answerCount: number;
  createAt: string;
}

const { Title } = Typography;
const { confirm } = Modal;


const Trash: FC = () => {
  useTitle("小慕问卷 - 回收站");

  const {data={},loading,refresh,}=useLoadQuestionListData({isDeleted:true})
  const {list=[],total=0}=data || {}
  //选中的问卷ID列表
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  //恢复选中的问卷
  const { run:recover } = useRequest(
    async () => {
      for await(const id of selectedIds) {
        await updateQuestionService(id, { isDeleted: false });
      }
    },
    {
      manual: true, //手动触发
      debounceWait: 500, //防抖等待时间
      onSuccess: () => {
        message.success("恢复成功");
        refresh()//刷新数据
        setSelectedIds([])//清空选中Ids
      },
    }
  );

  //彻底删除选中的问卷
  const { run:deleteQuestion } = useRequest(
    async () => {
      await deleteQuestionService(selectedIds);
    },
    {
      manual: true, //手动触发
      debounceWait: 500, //防抖等待时间
      onSuccess: () => {
        message.success("删除成功");
        refresh()//刷新数据
        setSelectedIds([])//清空选中Ids
      },
    }
  );

  const tableColumns = [
    {
      title: "问卷标题",
      dataIndex: "title",
    },
    {
      title: "是否发布",
      dataIndex: "isPublished",
      render: (isPublished: boolean) => {
        return isPublished ? (
          <Tag color="processing">已发布</Tag>
        ) : (
          <Tag>未发布</Tag>
        );
      },
    },
    {
      title: "回答数",
      dataIndex: "answerCount",
    },
    {
      title: "创建时间",
      dataIndex: "createAt",
    },
  ];

  function del(){
    confirm({
      title:'确认彻底删除选中的问卷吗？',
      icon:<ExclamationCircleOutlined />,
      content:'删除后将无法恢复',
      okText:'确认',
      cancelText:'取消',
      onOk:deleteQuestion,
    })
  }

  //可以把JSX片段定义为变量
  const TabelElem=<>
    <div style={{marginBottom:'16px'}}>
      <Space>
        <Button type="primary" disabled={selectedIds.length === 0} onClick={recover}>恢复</Button>
        <Button danger disabled={selectedIds.length === 0} onClick={del}>彻底删除</Button>
      </Space>
    </div>
    <Table<QuestionDataType>
            columns={tableColumns}
            dataSource={list}
            pagination={false}
            rowKey={q=>q._id}
            rowSelection={{
              type:'checkbox',
              onChange:(selectedRowKeys)=>{
                setSelectedIds(selectedRowKeys as string[])
              }
            }}
          />
  </>

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>

      <div className={styles.content}>
        {loading && <div style={{textAlign:'center'}}><Spin /></div>}
        {!loading && list.length === 0 && <Empty description="暂无回收站问卷" />}
        {list.length > 0 && TabelElem}
      </div>

      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  );
};

export default Trash;
