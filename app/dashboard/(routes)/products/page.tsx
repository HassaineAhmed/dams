import { format } from "date-fns";

import prismadb from "@/_lib/prismadb";
import { formatter } from "@/_lib/utils";

import { ProductsClient } from "./components/client";
import { ProductColumn } from "./components/columns";


const ProductsPage = async ({
  params
}: {
  params: { storeId: string }
}) => {

  const products = await prismadb.product.findMany({
    include: {
      productType: { select: { id: true, name: true, sizingSystem: true } },
      imagesNames: { select: { imageName: true } },
      orders: { select: { id: true } }
    },
  });

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    category: item.productType,
    isAvailable: item.isAvailable,
    isNewArrival: item.isNewArrival,
    isForMen: item.isForMen,
    isForWomen: item.isForWomen,
    isComingSoon: item.isComingSoon,
    isTrending: item.isTrending,
    howManyOrders: item.orders.length,
    imagesNames: item.imagesNames,
    model: item.model,
    fit: item.fit,
    design: item.design

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
