import type { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const {body} = req
    
    console.log(body[0]['顧客コード']);
    console.log(body[1]['親ID']);
    console.log(typeof body[0]['status'])

    for(let i of body){
        const createMany = await prisma.billinStatement.create({
            data:{
                forvalId:i['顧客コード'],
                syshanId:i['syshanId']?i['syshanId']:'なし',
                fitId:i['fit代理店コード'],
                supplyNumberId:i['供給地点特定番号'],
                userName:i['userName'],
                status:i['status'],
                useMonth:i['課金年月'],
                startDay:i['利用開始日'],
                endDay:i['利用終了日'],
                chargeItemCode:i['料金項目コード１'],
                useAmount:i['使用量'],
                totalAmount:i['請求額（税込）'],
                government:i['請求額（税抜）'],
                tax:i['消費税'],
                CO2Discharge:i['CO2排出見込'],
                parentId:i['親ID'],
                childId:i['ID'],
            }
        })
    }
    

    // try {
      
    //   const customer = await prisma.customer.findMany();
    //   return res.status(200).json(customer);
      
    // } catch (e) {
    //   console.error(e);
    // }
}