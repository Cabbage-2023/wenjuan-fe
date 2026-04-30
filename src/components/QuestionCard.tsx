import React, { type FC, useState } from "react";
import {
  Button,
  Flex,
  Divider,
  Space,
  Tag,
  Popconfirm,
  Modal,
  message,
} from "antd";
import {
  EditOutlined,
  LineChartOutlined,
  StarOutlined,
  CopyOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import { useRequest } from "ahooks";

import styles from "./QuestionCard.module.scss";
import { updateQuestionService,duplicateQuestionService } from "../services/question";

const { confirm } = Modal;

type PropsType = {
  _id: string;
  title: string;
  isPublished: boolean;
  isStar: boolean;
  answerCount: number;
  createAt: string;
};

const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const nav = useNavigate();

  const { _id, title, isPublished, isStar, answerCount, createAt } = props;

  //修改标星
  const [isStarState, setIsStarState] = useState(isStar);
  const { loading: changeStarLoading, run: changeStar } = useRequest(
    async () => {
      await updateQuestionService(_id, { isStar: !isStarState });
    },
    {
      manual: true, //手动触发
      onSuccess: () => {
        setIsStarState(!isStarState)
        message.success("更新成功");
      },
    }
  );

  const{loading:duplicateLoading,run:duplicate}=useRequest(
    async()=>{
    const data=await await duplicateQuestionService(_id)
    return data
  },{
    manual:true, //手动触发
    onSuccess: (result:any) => {
      message.success("复制成功");
      nav(`/question/edit/${result._id}`)//跳转到新问卷的编辑页面
    },
  })

  const [isDeletedState, setIsDeletedState] = useState(false);
  const { loading:deleteLoading, run:deleteQuestion } = useRequest(
    async () => {
      await updateQuestionService(_id, { isDeleted: true });
    },
    {
      manual: true, //手动触发
      onSuccess: () => {
        setIsDeletedState(true)
        message.success("删除成功");
      },
    }
  );
  function del() {
    confirm({
      title: "确认删除吗？",
      icon: <ExclamationCircleOutlined />,
      okText: "确认",
      cancelText: "取消",
      onOk: deleteQuestion,
    });
  }


  //删除后，不展示在列表中
  if(isDeletedState) return null

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.left}>
            <Link
              to={
                isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`
              }
            >
              <Space>
                {isStarState && <StarOutlined style={{ color: "red" }} />}
                {title}
              </Space>
            </Link>
          </div>
          <div className={styles.right}>
            <Space>
              {isPublished ? (
                <Tag color="processing">已发布</Tag>
              ) : (
                <Tag>未发布</Tag>
              )}
              <span>答卷：{answerCount}</span>
              <span>{createAt}</span>
            </Space>
          </div>
        </div>

        <Divider style={{ margin: "12px 0" }} />

        <div className={styles["button-container"]}>
          <div className={styles.left}>
            <Flex>
              <Button
                icon={<EditOutlined />}
                type="text"
                size="small"
                onClick={() => nav(`/question/edit/${_id}`)}
              >
                编辑问卷
              </Button>
              <Button
                icon={<LineChartOutlined />}
                type="text"
                size="small"
                onClick={() => nav(`/question/stat/${_id}`)}
                disabled={!isPublished}
              >
                数据统计
              </Button>
            </Flex>
          </div>

          <div className={styles.right}>
            <Flex justify="end">
              <Button
                icon={<StarOutlined />}
                type="text"
                size="small"
                onClick={changeStar}
                disabled={changeStarLoading}//加载中禁用，防止按钮重复点击
              >
                {isStarState ? "取消标星" : "标星"}
              </Button>
              <Popconfirm
                title="确认复制吗？"
                okText="确认"
                cancelText="取消"
                onConfirm={duplicate}
              >
                <Button icon={<CopyOutlined />} type="text" size="small" disabled={duplicateLoading}>
                  复制
                </Button>
              </Popconfirm>
              <Button
                icon={<DeleteOutlined />}
                type="text"
                size="small"
                onClick={del}
                disabled={deleteLoading}
              >
                删除
              </Button>
            </Flex>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionCard;
