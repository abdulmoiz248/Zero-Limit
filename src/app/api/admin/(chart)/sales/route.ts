import { NextResponse } from "next/server";
import OrderModel from "@/Models/Order"; // Adjust the path if necessary
import connect from "@/dbConfig/dbConfig";
import CustomerModel from "@/Models/Customer";

export async function GET() {
  try {
    await connect();

    const sales = await getSales();
    const summary=await getSummary();
    const topProducts=await getTopProducts();

    const topOrders=await OrderModel.find().sort({createdAt:-1}).limit(5);
 

    return NextResponse.json({ sales,summary,topProducts,topOrders, success: true }, { status: 200 });
  } catch (error) {
    console.error("Error fetching sales data:", error);
    return NextResponse.json({ message: "Error", success: false }, { status: 500 });
  }
}

const getSummary = async () => {
    const revenue=await getRevenue();
    const products=await getProductsSold();  
    const orders=await getOrders();  
    const customers=await getCustomers();
   
   
    return {
       revenue,
        products,
        orders,
        customers,
     
    }
  
};


const getTopProducts = async () => {
  try {
    const topProducts = await OrderModel.aggregate([
      // Unwind the products array
      { $unwind: "$products" },

      // Ensure that the product is an object with an ID field that can be converted to ObjectId
      {
        $set: {
          productId: { $toObjectId: "$products.productId" }, // Assuming products are objects with productId field
        },
      },

      // Group by the product ID to accumulate total sales and revenue
      {
        $group: {
          _id: "$productId",
          totalSales: { $sum: 1 },
          totalRevenue: { $sum: "$total" },
        },
      },

      // Join with the Product collection to fetch product details
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "productDetails",
        },
      },

      // Unwind product details to extract individual fields
      { $unwind: "$productDetails" },

      // Project the desired fields in the output
      {
        $project: {
          _id: 0,
          name: "$productDetails.name",
          sales: "$totalSales",
          revenue: "$totalRevenue",
        },
      },

      // Sort by total sales in descending order
      { $sort: { sales: -1 } },

      // Limit to top 5 products
      { $limit: 5 },
    ]);

    return topProducts;
  } catch (error) {
    console.error("Error fetching top products:", error);
    throw error;
  }
};




const getCustomers = async (): Promise<{ value: number; trend: number }> => {
  const currentDate = new Date();

  // Calculate the start and end dates for the current month
  const startCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  // Calculate the start and end dates for the previous month, accounting for January
  const startPrevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
  const endPrevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);

  try {
    // Count customers for the current month
    const currentMonthCustomers = await CustomerModel.countDocuments({
      createdAt: {
        $gte: startCurrentMonth,
        $lte: endCurrentMonth,
      },
    });

   
    const previousMonthCustomers = await CustomerModel.countDocuments({
      createdAt: {
        $gte: startPrevMonth,
        $lte: endPrevMonth,
      },
    });

    // Calculate trend as the difference between current and previous month
    const trend = currentMonthCustomers - previousMonthCustomers;

    return { value: currentMonthCustomers, trend };
  } catch (error) {
    console.error('Error fetching customer trend:', error);
    throw error;
  }
};





// const getCustomers = async (): Promise<{ value: number; trend: number }> =>  {
//   const currentDate = new Date();
//   const startCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
//   const endCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

//   const startPrevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
//   const endPrevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);

//   try {
//     // Count customers for the current month
//     const currentMonthCustomers = await prisma.customer.count({
//       where: {
//         createdAt: {
//           gte: startCurrentMonth,
//           lte: endCurrentMonth,
//         },
//       },
//     });

//     // Count customers for the previous month
//     const previousMonthCustomers = await prisma.customer.count({
//       where: {
//         createdAt: {
//           gte: startPrevMonth,
//           lte: endPrevMonth,
//         },
//       },
//     });

//     const trend = currentMonthCustomers - previousMonthCustomers;

//     return { value: currentMonthCustomers, trend };
//   } catch (error) {
//     console.error('Error fetching customer trend:', error);
//     throw error;
//   } finally {
//     await prisma.$disconnect();
//   }
// };


const getOrders = async () => {
  const currentDate = new Date();
  const startCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  const startPrevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
  const endPrevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);

  // Orders in the current month
  const currentMonthOrders = await OrderModel.countDocuments({
      createdAt: { $gte: startCurrentMonth, $lte: endCurrentMonth }
  });

  // Orders in the previous month
  const prevMonthOrders = await OrderModel.countDocuments({
      createdAt: { $gte: startPrevMonth, $lte: endPrevMonth }
  });

  const trend = currentMonthOrders - prevMonthOrders;

  return { value: currentMonthOrders, trend };
};


const getProductsSold = async () => {
  const currentDate = new Date();
  const startCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  const startPrevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
  const endPrevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);

  // Products sold in the current month
  const currentMonthProducts = await OrderModel.aggregate([
      { $match: { createdAt: { $gte: startCurrentMonth, $lte: endCurrentMonth } } },
      { $unwind: "$products" },
      { $group: { _id: null, totalProducts: { $sum: 1 } } }
  ]);

  // Products sold in the previous month
  const prevMonthProducts = await OrderModel.aggregate([
      { $match: { createdAt: { $gte: startPrevMonth, $lte: endPrevMonth } } },
      { $unwind: "$products" },
      { $group: { _id: null, totalProducts: { $sum: 1 } } }
  ]);

  const currentTotal = currentMonthProducts[0]?.totalProducts || 0;
  const prevTotal = prevMonthProducts[0]?.totalProducts || 0;

  const trend = currentTotal - prevTotal;

  return { value: currentTotal, trend };
};


const getRevenue = async () => {
    const currentDate = new Date();
    const startCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  
    const endCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);


    const startPrevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);

    const endPrevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);

    // Calculate revenue for current month
    const currentMonthRevenue = await OrderModel.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: startCurrentMonth,
                    $lte: endCurrentMonth
                }
            }
        },
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: "$total" }
            }
        }
    ]);

  
    const prevMonthRevenue = await OrderModel.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: startPrevMonth,
                    $lte: endPrevMonth
                }
            }
        },
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: "$total" }
            }
        }
    ]);

    const currentMonthTotal = currentMonthRevenue[0]?.totalRevenue || 0;
    const prevMonthTotal = prevMonthRevenue[0]?.totalRevenue || 0;

  
    const revenueTrend = currentMonthTotal - prevMonthTotal;
    
     return    {value:currentMonthTotal,trend:revenueTrend}

}




const getSales = async () => {
  const orders = await OrderModel.aggregate([
    {
      $group: {
        _id: { $month: "$createdAt" }, // Group orders by month (1-12)
        count: { $sum: 1 }, // Count the number of orders per month
      },
    },
  ]);

  // Initialize sales array with 0 for each month (Jan to Dec)
  const monthlySales = Array(12).fill(0);

  // Map MongoDB month indexes (1-12) to array indexes (0-11)
  orders.forEach((order) => {
    const monthIndex = order._id - 1;
    monthlySales[monthIndex] = order.count;
  });

  // Format the sales data for the chart
  return {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ],
    datasets: [
      {
        label: "Sales",
        data: monthlySales,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };
};
