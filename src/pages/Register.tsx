import React, { type FC } from "react";
import { Space, Typography, Form, Input, Button, Flex, message } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { Link,useNavigate } from "react-router-dom";
import { useRequest } from "ahooks";

import styles from "./Register.module.scss";
import { LOGIN_PATHNAME } from "../router/index";
import { registerUserService } from "../services/user";

const { Title } = Typography;

const Register: FC = () => {
  const nav = useNavigate();

  const {run,loading} = useRequest(async values=>{
    const {username,password,nickname} = values||{}
    await registerUserService(username,password,nickname)
  },{
    manual:true,
    onSuccess:()=>{
      message.success('注册成功')
      nav(LOGIN_PATHNAME)
    }
  });

  const onFinish = (values: any) => {
    run(values)//触发注册请求
  };

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>注册新用户</Title>
        </Space>
      </div>

      <div>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: "请输入用户名" },
              {type:'string', min:5, max:20, message:'字符长度在5-20位之间'},
              {pattern:/^[a-zA-Z0-9_]+$/, message:'只能包含字母、数字和下划线'},
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="昵称" name="nickname">
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="确认密码"
            name="confirm"
            dependencies={['password']}//password变化会触发validator
            //表单验证
            rules={[{ required: true, message: "请确认密码" },
              ({getFieldValue})=>({
                validator(_,value){
                  if(!value||getFieldValue('password')===value){
                    return Promise.resolve()
                  }else{
                    return Promise.reject(new Error('两次输入密码不一致'))
                  }
                }
              })
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Flex justify="space-between">
              <Space>
                <Button type="primary" htmlType="submit" size="medium">
                  注册
                </Button>
              </Space>
              <Link to={LOGIN_PATHNAME}>已有账号？登录</Link>
            </Flex>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
