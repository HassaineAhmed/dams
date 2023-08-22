import prismadb from "@/_lib/prismadb";

import { ProductForm } from "./components/product-form";
import { ProductColumn } from "../components/columns";


const ProductPage = async ({
  params
}: {
  params: { productId: string, storeId: string }
}) => {

  const unFormatedProduct = await prismadb.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      productType: { select: { id: true, name: true, sizingSystem: true } },
      imagesNames: { select: { imageName: true } },
      orders: { select: { id: true } }
    },
  });

  let product: ProductColumn | null = null;
  if (unFormatedProduct) {
    product = {
      id: unFormatedProduct.id,
      name: unFormatedProduct.name,
      price: unFormatedProduct.price,
      category: unFormatedProduct.productType,
      isAvailable: unFormatedProduct.isAvailable,
      isNewArrival: unFormatedProduct.isNewArrival,
      isForMen: unFormatedProduct.isForMen,
      isForWomen: unFormatedProduct.isForWomen,
      isComingSoon: unFormatedProduct.isComingSoon,
      isTrending: unFormatedProduct.isTrending,
      howManyOrders: unFormatedProduct.orders.length,
      imagesNames: unFormatedProduct.imagesNames,
      model: unFormatedProduct.model,
      fit: unFormatedProduct.fit,
      design: unFormatedProduct.design
    }
  }

  const categories = await prismadb.productType.findMany();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          categories={categories}
          initialData={product}
        />
      </div>
    </div>
  );
}

export default ProductPage;
