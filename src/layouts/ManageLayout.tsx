import React, { type FC } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Button, Flex, message } from "antd";
import {
  BarsOutlined,
  DeleteOutlined,
  PlusOutlined,
  StarOutlined,
} from "@ant-design/icons";

import styles from "./ManageLayout.module.scss";
import { createQuestionService } from "../services/question";
import { useRequest } from "ahooks";

const ManageLayout: FC = () => {
  const nav = useNavigate();
  const { pathname } = useLocation();

  const{loading,run:handleCreateClick}=useRequest(createQuestionService,{
    manual:true,//手动触发
    onSuccess(result){
      nav(`/question/edit/${result?.id}`);
      message.success("创建问卷成功");  
    }
  })

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Flex vertical gap="middle">
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={handleCreateClick}
            disabled={loading}//创建中禁用,防止重复点击
          >
            创建问卷
          </Button>
          <Button
            type={pathname.startsWith("/manage/list") ? "default" : "text"}
            size="large"
            icon={<BarsOutlined />}
            onClick={() => nav("/manage/list")}
          >
            我的问卷
          </Button>
          <Button
            type={pathname.startsWith("/manage/star") ? "default" : "text"}
            size="large"
            icon={<StarOutlined />}
            onClick={() => nav("/manage/star")}
          >
            星标问卷
          </Button>
          <Button
            type={pathname.startsWith("/manage/trash") ? "default" : "text"}
            size="large"
            icon={<DeleteOutlined />}
            onClick={() => nav("/manage/trash")}
          >
            回收站
          </Button>
        </Flex>
      </div>
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  );
};

export default ManageLayout;
