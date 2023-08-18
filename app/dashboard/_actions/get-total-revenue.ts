import prismadb from "../_lib/prismadb";

export const getTotalRevenue = async (storeId: string) => {
  const paidOrders = await prismadb.order.findMany({
    where: {
      isPaid: true
    },
    include: {
      product: true
    }
  });

  const totalRevenue = paidOrders.reduce((total, order) => {
    return order.revenue + total
  }, 0);

  return totalRevenue;
};
