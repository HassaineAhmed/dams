import prismadb from "@/_lib/prismadb";

import { OrderColumn } from "./components/columns"
import { OrdersClient } from "./components/client";

const CategoriesPage = async () => {
  const orders = await prismadb.order.findMany({ include: { product: { select: { revenue: true } } } });

  const formattedOrders: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    product: item.productName,
    date: item.createdAt.toLocaleDateString(),
    wilaya: item.wilaya,
    address: item.fullAdress,
    revenue: item.product.revenue,
    phoneNumber: item.phoneNumber
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrdersClient data={formattedOrders} />
      </div>
    </div>
  );
};

export default CategoriesPage;
