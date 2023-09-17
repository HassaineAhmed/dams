import prismadb from "../_lib/prismadb";

export const getTotalRevenue = async (storeId: string) => {
  const paidOrders = await prismadb.order.findMany({
    where: {
      stage: "delivered"
    },
    include: {
      product: true
    }
  });

  const totalRevenue = paidOrders.reduce((total, order) => {
    return order.product.revenue + total
  }, 0);

  return totalRevenue;
};
