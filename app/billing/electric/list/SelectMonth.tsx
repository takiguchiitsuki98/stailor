'use client';

import React from 'react';
import { SearchSelect, SearchSelectItem, Text } from '@tremor/react';
import dayjs from "dayjs";
import ElectricBillingList from './page';
import { getBillingList } from './billing';
import { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export const SelectMonth = ({
  label,
  listItems,
  placeholder,
  month
}: {
  label: string;
  listItems: Array<any>;
  placeholder: string;
  month: string;
}) => {

  const [selectValue, setSelectValue] = useState("");

  const thisMonth = dayjs().format("YYYYMM");

  const changeMonth = async (value: string) => {
    console.log("onValueChange が呼ばれた :", value)
    setSelectValue(value);
    // 選択した年月で一覧の情報を再取得
    ElectricBillingList({ searchParams: {q:value}});
    // const billingList = await getBillingList(thisMonth);

  };

  return (
    <div className="mt-2 mb-2">
      <Text className="mb-2">{label}</Text>
      <SearchSelect value={selectValue} placeholder={placeholder} onValueChange={ changeMonth }>
        {listItems?.map((item) => (
          <SearchSelectItem key={String(item.code)} value={String(item.code)}>
            {item.name}
          </SearchSelectItem>
        ))}
      </SearchSelect>
      {/* <Select
        labelId="selectMonth"
        id="selectMonth"
        name="selectMonth"
        label={label}
        value={month}
        onChange={(event) => {
          changeMonth(event);
        }}
      >
        {listItems?.map((item) => (
          <MenuItem key={String(item.code)} value={String(item.code)}>
            {item.name}
          </MenuItem>
        ))}
      </Select> */}
    </div>
  );
};
