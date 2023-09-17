import prismadb from "../_lib/prismadb";

export const getSalesCount = async (storeId: string) => {
  const salesCount = await prismadb.order.count({
    where: {
      stage: "delivered"
    },
  });

  return salesCount;
};
