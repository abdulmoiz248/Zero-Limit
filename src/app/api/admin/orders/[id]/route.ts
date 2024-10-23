import type { NextApiRequest } from 'next'
import OrderModel from '@/Models/Order'
import connect from '@/dbConfig/dbConfig'

export async function POST(req: NextApiRequest) {
  const { id } = req.query

  await connect()

    try {
      const { status } = req.body
      const updatedOrder = await OrderModel.findByIdAndUpdate(id, { status }, { new: true })

      if (!updatedOrder) {
        return Response.json({
            message:"order not found",
            success: false,
          },{status:404})
      }

    
      return Response.json({
        order: updatedOrder,
        success: false,
      },{status:200})
    
    } catch (error) {
        return Response.json({
            error,
            success: false,
          },{status:500})
    }
  }