import Image from 'next/image'
import { billinStatement } from '@prisma/client';

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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          電気明細一覧
      </div>
    </main>
  )
}
