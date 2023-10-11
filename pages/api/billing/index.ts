import { BillinStatement } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<BillinStatement[]>,
) {
  console.log("handler 実行")
  console.log("req :", req.query.q)
  const reqQuery = req.query.q;
  let query: any = {};

  try {
      if (reqQuery) {
        console.log("存在する :", reqQuery)
        query = {
          where: {
            useMonth: Number(reqQuery),
          },
          include: {
            supplyNumber: true,
          }
        };
      } else {
        query = {
          include: {
            supplyNumber: true,
          }
        };
      }

      const billings = await prisma.billinStatement.findMany(query);
      return res.status(200).json(billings);
    } catch (e) {
      console.error(e);
    }
}