import React,{FC} from "react";
import {Tabs} from "antd";
import { FileTextOutlined,SettingOutlined } from "@ant-design/icons";

import ComponentProp from "./ComponentProp";
import PageSetting from "./PageSetting";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";

// 定义选项卡的键值
enum TAB_KEYS{
  PROP_KEY='prop',
  SETTING_KEY='setting',
}

const RightPanel:FC=()=>{
  const {selectedId}=useGetComponentInfo();

  // 🌟 核心改进：直接派生，不再使用 useEffect + useState
  // 如果有选中的组件 ID，就显示“属性”页，否则显示“设置”页
  const activeKey = selectedId ? TAB_KEYS.PROP_KEY : TAB_KEYS.SETTING_KEY;

  const tabsItems=[
    {
      key:TAB_KEYS.PROP_KEY,
      label:(
        <span>
          <FileTextOutlined />
          属性
        </span>
      ),
      children: <ComponentProp />
    },
    {
      key:TAB_KEYS.SETTING_KEY,
      label:(
        <span>
          <SettingOutlined />
          页面设置
        </span>
      ),
      children: <PageSetting />
    },
  ]

  return <Tabs activeKey={activeKey} items={tabsItems} />
}

export default RightPanel
