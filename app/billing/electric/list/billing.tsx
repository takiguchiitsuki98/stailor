import { BillinStatement } from '@prisma/client';

export const getBillingList: (query: string) => Promise<BillinStatement[]> = async (query) => {
  console.log("getBillingList 呼び出し！ :", query)
  const res = await fetch(
    'http://localhost:3000/api/billing?q=' + query ?? '',
    { cache: 'no-store' }
  );
  return res.json();
};
