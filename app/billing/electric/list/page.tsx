import { Card, Title, Text, Subtitle, Divider } from '@tremor/react';
import { Suspense } from 'react';
import dayjs from "dayjs";
// import { useState } from "react";

import { LoadingChip } from '../../../../components/common/LoadingChip';
import { SelectMonth } from './SelectMonth';
import BillingTable from './billingTable';
import TotalDisplay from './totalDisplay';
import { getBillingList } from './billing';

// TODO 後で修正
const selectMonth = [
  {code: 202311, name:"2023年 11月"},
  {code: 202310, name:"2023年 10月"},
  {code: 202309, name:"2023年 09月"},
];

interface MonthInfo {
  code: number | null;
  name: string | undefined;
}

export default async function ElectricBillingList({
  searchParams
}: {
  searchParams: { q: string };
}) {

  // const [billingList, setBillingList] = useState();
  console.log("searchParams !!!!!!!!!!!! ", searchParams)
  // TODO データ都合で仮で設定、後で直す
  const thisMonth ='202307';
  // const thisMonth = searchParams.q ? searchParams.q : dayjs().format("YYYYMM");
  console.log("thisMonth !!!!!!!!!!!! ", thisMonth)
  // 明細
  const billingList = await getBillingList(thisMonth);
  console.log("取得した明細数　:", billingList.length);

  // totalCount の算出
  let totalCount = billingList.length;
  let possibleCount = 0;
  let totalAmount = 0;

  for (let i = 0; i < billingList.length; i++) {
    // possibleCount の算出
    if (billingList[i].status === 0) {
      possibleCount++;
    }
    // totalAmount の算出
    if (billingList[i].totalAmount) {
      totalAmount = totalAmount + billingList[i].totalAmount!;
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <div className="w-full items-left justify-between font-mono text-sm lg:flex">
        <Title>電気明細</Title>
      </div>
      <div className="w-full items-left justify-between font-mono text-sm lg:flex">
        <Suspense fallback={<LoadingChip />}>
          <SelectMonth
            label={''}
            placeholder={'「年月」を選択してください'}
            listItems={selectMonth}
            month={thisMonth}
          />
        </Suspense>
        <TotalDisplay 
          totalCount = {totalCount}
          possibleCount = {possibleCount}
          totalAmount = {totalAmount}
        /> 
      </div>
      <br />
      <br />
      <BillingTable
        billingList={billingList}
      />
    </main>
  )
}
