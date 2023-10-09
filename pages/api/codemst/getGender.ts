// import { Mst_Code } from '@prisma/client';
// import type { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@prisma/client'
// import { CLASSIFICATIONS } from '../../../lib/const/classifications';

// const prisma = new PrismaClient()

// export default async function handler(
//     req: NextApiRequest,
//     res: NextApiResponse<Mst_Code[]>,
// ) {
//     const query: any = {
//         where: {
//             class: CLASSIFICATIONS.Gender
//         }
//     }
//     const result = await prisma.mst_Code.findMany(query);
//     res.status(200).json(result);
// }