import { BillinStatement } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<BillinStatement[]>,
) {
  console.log("pdfOutput handler 実行")
  console.log("req :", req.query.q)
  const reqQuery = req.query.q;
  const splitReq: string[] = String(reqQuery).split(/,/);
  let query: any = {};

  try {
    query = {
      where: {
        syshanId: {in: splitReq},
      },
      include: {
        supplyNumber: true,
        // TODO 下記、trueにするとエラーになる原因を調査
        chargeItemCode: false,
        syshanInfo: false,
      },
    };
    console.log("query !!! :", query)

    const billings = await prisma.billinStatement.findMany(query);
    console.log("billings !!! :", billings)

    // TODO 上記の問題が解決するまで仮実装
    const query2 = {
      where: {
        chargeItemCode: "36000130",
      },
    }
    const merchandise = await prisma.merchandise.findMany(query2);
    console.log("merchandise !!! :", merchandise);
    const query3 = {
      where: {
        syshanId: "SYS10072",
      },
    }
    const customer = await prisma.customer.findMany(query3);
    console.log("customer !!! :", customer);

    let billings2 = [];
    for (let i = 0; i < 1; i++) {
      const billing = billings[i];
      billing.chargeItemCode = merchandise[0];
      billing.syshanInfo = customer[0];
      billings2.push(billing)
    }

    console.log("billings2 !!! :", billings2)

    return res.status(200).json(billings2);
  } catch (e) {
    console.error(e);
  }
}