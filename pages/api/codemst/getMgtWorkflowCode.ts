// import { Mgt_Workflow_Code } from '@prisma/client';
// import type { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@prisma/client'
// import { CLASSIFICATIONS } from '../../../lib/const/classifications';

// const prisma = new PrismaClient()

// export default async function handler(
//     req: NextApiRequest,
//     res: NextApiResponse<Mgt_Workflow_Code[]>,
// ) {
//     const query: any = {
//         where: {
//             class: CLASSIFICATIONS.Project
//         }
//     }
//     const result = await prisma.mgt_Workflow_Code.findMany(query);
//     res.status(200).json(result);
// }