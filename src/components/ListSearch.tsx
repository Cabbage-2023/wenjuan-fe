import React, { type FC, type ChangeEvent, useState, useEffect } from "react";
import { Input } from "antd";
import { useNavigate,useLocation,useSearchParams  } from "react-router-dom";

import { LIST_SEARCH_PARAM_KEY } from "../constant";


const { Search } = Input;

const ListSearch: FC = () => {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  // 直接从 URL 读出初始值，不再需要 useEffect 监听
  const curVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || "";
  const [value, setValue] = useState(curVal);
  
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }
  function handleSearch(value: string) {
    //跳转搜索页面,并添加url关键词
    nav({
      pathname,
      search:`${LIST_SEARCH_PARAM_KEY}=${value}`
    })
  }

  return (
    <Search
      size="large"
      allowClear
      placeholder="请输入搜索关键词"
      value={value}
      onChange={handleChange}
      onSearch={handleSearch}
      style={{ width: "200px" }}
    />
  );
};

export default ListSearch;
