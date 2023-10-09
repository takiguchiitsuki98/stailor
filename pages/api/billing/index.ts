import { billinStatement } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<billinStatement[]>,
) {
    try {
      // const query: any = {
      //     include: {
      //         group: true,
      //     }
      // }
      const billings = await prisma.billinStatement.findMany();
      res.status(200).json(billings);
    } catch (e) {
      console.error(e);
    }
}