import type { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const {query} = req
    const forvalID = query.forvalID;
    console.log(forvalID);

    try {
      
      const customer = await prisma.customer.findMany();
      return res.status(200).json(customer);
      
    } catch (e) {
      console.error(e);
    }
}








// import type { NextApiRequest, NextApiResponse } from 'next';

// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()

// export default async function handler(
//     req: NextApiRequest,
//     res: NextApiResponse,
// ) {
//     const {query} = req
//     const forvalID = query.forvalID;
//     console.log(forvalID);

//     try {
//       const query: any = {
//         where:{
//             forvalId:forvalID
//           }
//       }
//       const customer = await prisma.customer.findMany(query);
//       if(customer){
//       return res.status(200).json(customer);
//       }else{
//         return res.status(200).json('なし')
//       }
//     } catch (e) {
//       console.error(e);
//     }
// }