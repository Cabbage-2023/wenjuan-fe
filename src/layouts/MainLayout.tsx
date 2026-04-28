import React,{type FC} from 'react'
import {Outlet} from 'react-router-dom'
import {Layout } from 'antd';

import styles from './MainLayout.module.scss'
import Logo from '../components/Logo';
import UserInfo from '../components/UserInfo';


const { Header, Footer, Content } = Layout;

const MainLayout:FC=()=>{
  return(
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo/>
        </div>
        <div className={styles.right}>
          <UserInfo/>
        </div>
      </Header>
      <Content className={styles.main}>
        <Outlet />
      </Content>
      <Footer className={styles.footer}>
        小慕问卷 &copy; 2023-{new Date().getFullYear()}. Created by 华华子
      </Footer>
    </Layout>
  )
}

export default MainLayout
