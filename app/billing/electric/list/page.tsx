import { Card, Title, Text, Subtitle, Divider } from '@tremor/react';
import { Suspense } from 'react';
import { billinStatement } from '@prisma/client';

import { LoadingChip } from '../../../../components/common/LoadingChip';
import { SelectSearchCode } from '../../../../components/element/SelectSearchCode';
import BillingTable from './billingTable';

// TODO 後で修正
const selectMonth = [
  {code:"1", name:"2023年 11月"},
  {code:"2", name:"2023年 10月"},
  {code:"3", name:"2023年 09月"},
];

const getBillingList: () => Promise<billinStatement[]> = async () => {
  const res = await fetch(
    'http://localhost:3000/api/billing',
    { cache: 'no-store' }
  );
  return res.json();
};

export default async function ElectricBillingList() {

const billingList = await getBillingList();

  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <div className="w-full items-left justify-between font-mono text-sm lg:flex">
        <Title>電気明細</Title>
      </div>
      {/* <Text></Text> */}
      <div className="w-full items-left justify-between font-mono text-sm lg:flex">
        <Suspense fallback={<LoadingChip />}>
          <SelectSearchCode
            label={''}
            placeholder={'「年月」を選択してください'}
            listItems={selectMonth}
          />
        </Suspense>
      </div>
      <BillingTable
          billingList={billingList}
        />
    </main>
  )
}
