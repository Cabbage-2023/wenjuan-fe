import React,{FC} from 'react'
import {Typography} from 'antd'
import {useDispatch} from 'react-redux'
import {nanoid} from 'nanoid'


import styles from './ComponentLib.module.scss'
import {componentGroup,ComponentConfType} from '../../../components/QuestionComponents/index'
import {addComponent} from '../../../store/componentsReducer'

const {Title}=Typography


const GenComponent: FC<{ c: ComponentConfType }> = ({ c }) => {
  const dispatch=useDispatch()
  const {title,type,Component,defaultProps}=c
  
  //点击组件，添加到画布
  function handleClick(){
    dispatch(addComponent({ 
      fe_id:nanoid(),
      title,
      type,
      props:defaultProps
    }))
  }

  return <div className={styles.wrapper} key={type} onClick={handleClick}>
    <div className={styles.component}>
      <Component/>
    </div>
  </div>
}

const ComponentLib:FC=()=>{


  return <>
    {componentGroup.map((group)=>{
      const {groupId,groupname,components}=group

      return <div key={groupId} className={styles.groupContainer}>
        <Title className={styles.title}>{groupname}</Title> 
        <div>
              {/* 🌟 2. 像使用组件一样调用它 */}
              {components.map((c) => (
                <GenComponent key={c.type} c={c} />
              ))}
            </div>
      </div>
    })}
  </>
}

export default ComponentLib
