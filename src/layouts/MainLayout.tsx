import React,{type FC} from 'react'
import {Outlet} from 'react-router-dom'
import {Layout, Spin} from 'antd';

import styles from './MainLayout.module.scss'
import Logo from '../components/Logo';
import UserInfo from '../components/UserInfo';
import useLoadUserData from '../hooks/useLoadUserData';
import useNavPage from '../hooks/useNavPage';

const { Header, Footer, Content } = Layout;

const MainLayout:FC=()=>{
  const { waitingUserData } = useLoadUserData()
  useNavPage(waitingUserData)

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
        {
          waitingUserData 
            ? <div style={{ textAlign: 'center', marginTop: '60px' }}><Spin /></div> // 正在加载
            : <Outlet /> // 加载完成
        }
      </Content>
      <Footer className={styles.footer}>
        小慕问卷 &copy; 2023-{new Date().getFullYear()}. Created by 华华子
      </Footer>
    </Layout>
  )
}

export default MainLayout
