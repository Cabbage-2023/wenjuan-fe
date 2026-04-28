import React, { type FC, useState } from "react";
import { useTitle } from "ahooks";
import { Typography, Empty, Table, Tag, Button,Space,Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import styles from "./common.module.scss";
import QuestionCard from "../../components/QuestionCard";

const { Title } = Typography;
const { confirm } = Modal;

const rawQuestionList = [
  {
    _id: "q1",
    title: "问卷1",
    isPublished: false,
    isStar: false,
    answerCount: 5,
    createAt: "3月10日 13:23",
  },
  {
    _id: "q2",
    title: "问卷2",
    isPublished: true,
    isStar: true,
    answerCount: 3,
    createAt: "3月11日 13:23",
  },
  {
    _id: "q3",
    title: "问卷3",
    isPublished: false,
    isStar: false,
    answerCount: 6,
    createAt: "3月12日 13:23",
  },
  {
    _id: "q4",
    title: "问卷4",
    isPublished: true,
    isStar: true,
    answerCount: 2,
    createAt: "3月9日 13:23",
  },
];

const Trash: FC = () => {
  useTitle("小慕问卷 - 回收站");

  const [questionList, setQuestionList] = useState(rawQuestionList);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

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
      onOk:()=>{
        alert(JSON.stringify(selectedIds))
      }
    })
  }

  //可以把JSX片段定义为变量
  const TabelElem=<>
    <div style={{marginBottom:'16px'}}>
      <Space>
        <Button type="primary" disabled={selectedIds.length === 0}>恢复</Button>
        <Button danger disabled={selectedIds.length === 0} onClick={del}>彻底删除</Button>
      </Space>
    </div>
    <Table
            columns={tableColumns}
            dataSource={questionList}
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
        <div className={styles.right}>搜索</div>
      </div>

      <div className={styles.content}>
        {questionList.length === 0 && <Empty description="暂无回收站问卷" />}
        {questionList.length > 0 && TabelElem}
      </div>
    </>
  );
};

export default Trash;
