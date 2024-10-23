
import OrderModel from '@/Models/Order'
import connect from '@/dbConfig/dbConfig'

export  async function GET(req: Request) {

    try {
      await connect();
      const { searchParams } = new URL(req.url);
      const status = searchParams.get('status');

      let query = {}
      
      if (status === 'pending') {
        query = { status: 'Pending' }
      }
      console.log("qe",query)

      const orders = await OrderModel.find(query).sort({ createdAt: -1 })

      return Response.json({
        orders,
        success: true,
      },{status:200})
    } catch (error) {
      console.log("error", error)
      return Response.json({
        error,
        success: false,
      },{status:500})
    }
  }
