// import { Mst_Code } from '@prisma/client';
// import type { NextApiRequest, NextApiResponse } from 'next';

// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()

// export default async function handler(
//     req: NextApiRequest,
//     res: NextApiResponse<Mst_Code[]>,
// ) {
//     const reqQuery = req.query.q
//     let result: Mst_Code[] = [];

//     if (reqQuery) {
//         result = await prisma.mst_Code.findMany({
//             where: {
//                 class: { contains: reqQuery.toString() }
//             }
//         })
//     } else {
//         result = await prisma.mst_Code.findMany()
//     }

//     res.status(200).json(result);
// }