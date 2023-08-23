import { format } from "date-fns";

import prismadb from "@/_lib/prismadb";
import { formatter } from "@/_lib/utils";

import { ProductsClient } from "./components/client";
import { ProductColumn } from "./components/columns";

prismadb.category.deleteMany();
const ProductsPage = async ({
  params
}: {
  params: { storeId: string }
}) => {

  const products = await prismadb.product.findMany({
    include: {
      category: { select: { id: true, name: true, sizingSystem: true } },
      imagesNames: { select: { imageName: true } },
      orders: { select: { id: true } }
    },
  });

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    categoryName: item.category.name,
    isAvailable: item.isAvailable,
    gender: item.isForMen ? "men" : "women",
    howManyOrders: item.orders.length,
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductsClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
