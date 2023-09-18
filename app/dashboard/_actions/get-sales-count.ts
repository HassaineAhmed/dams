import prismadb from "../_lib/prismadb";

export const getSalesCount = async () => {
  const salesCount = await prismadb.order.count({
    where: {
      stage: "delivered"
    },
  });

  return salesCount;
};
