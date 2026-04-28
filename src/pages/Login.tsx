import React, { useEffect, type FC } from "react";
import { Space, Typography, Form, Input, Button, Flex, Checkbox } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";

import styles from "./Login.module.scss";
import { REGISTER_PATHNAME } from "../router/index";

const { Title } = Typography;

const USERNAME_KEY = 'username'
const PASSWORD_KEY = 'password'

function remberUser(username:string,password:string){
  localStorage.setItem(USERNAME_KEY,username)
  localStorage.setItem(PASSWORD_KEY,password)
}

function deleteUserUserInfoFromStorage(){
  localStorage.removeItem(USERNAME_KEY)
  localStorage.removeItem(PASSWORD_KEY)
}

function getUserInfoFromStorage(){
  return {
    username:localStorage.getItem(USERNAME_KEY),
    password:localStorage.getItem(PASSWORD_KEY),
  }
}

const Login: FC = () => {
  const nav = useNavigate();

  const [form] = Form.useForm()//第三方hook

  useEffect(()=>{
    const {username,password} = getUserInfoFromStorage()
    form.setFieldsValue({username,password})
  },[])

  const onFinish = (values) => {
    console.log(values);
    const {username,password,remember} = values||{}
    
    if(remember){
      remberUser(username,password)
    }else{
      deleteUserUserInfoFromStorage()
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}> 用户登录</Title>
        </Space>
      </div>

      <div>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={{remember:true}}
          onFinish={onFinish}
          form={form} // 🌟 必须加上这一行！连接 form 实例
        >
          <Form.Item label="用户名" name="username"
            rules={[{ required: true, message: "请输入用户名" },
              {type:'string', min:5, max:20, message:'字符长度在5-20位之间'},
              {pattern:/^[a-zA-Z0-9_]+$/, message:'只能包含字母数字下划线'},
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="密码" name="password" rules={[{ required: true, message: "请输入密码" }]}>
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 6, span: 16 }}
          >
            <Checkbox>记住密码</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Flex justify="space-around" align="center">
              <Space>
                <Button type="primary" htmlType="submit">
                  登录
                </Button>
              </Space>
              <Link to={REGISTER_PATHNAME}>注册新用户</Link>
            </Flex>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
