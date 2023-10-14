import { BillinStatement } from '@prisma/client';

export const getPdfOutPutList: (query: string[]) => Promise<BillinStatement[]> = async (query) => {
  const res = await fetch(
    'http://localhost:3000/api/billing/pdfOutput?q=' + query ?? '',
    { cache: 'no-store' }
  );
  return res.json();
};
