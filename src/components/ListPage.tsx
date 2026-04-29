import React, { type FC, useEffect, useState } from "react";
import { Pagination } from "antd";
import { useSearchParams } from "react-router-dom";

import {
  LIST_PAGE_SIZE_PARAM_KEY,
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE,
} from "../constant/index";

type ProsType = {
  total: number;
};

const ListPage: FC<ProsType> = (props: ProsType) => {
  const { total } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  // 🌟 直接计算，不要用 useState + useEffect
  const current = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || "") || 1;
  const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || "") || LIST_PAGE_SIZE;

  function handlePageChange(page: number, pageSize: number) {
    // 点击分页时，直接去修改 URL
    searchParams.set(LIST_PAGE_PARAM_KEY, page.toString());
    searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize.toString());
    
    setSearchParams(searchParams); // 这一步会触发组件重绘，上面的变量会自动重新计算
  }

  return (
    <Pagination
      total={total}
      current={current}
      pageSize={pageSize}
      onChange={handlePageChange}
    />
  );
};

export default ListPage;
