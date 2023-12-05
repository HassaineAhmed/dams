import prismadb from "@/_lib/prismadb";

import { ProductForm } from "./components/product-form";
import { ProductColumn } from "../components/columns";


const ProductPage = async ({
  params
}: {
  params: { productId: string, storeId: string }
}) => {

  const unFormatedProduct = await prismadb.formation.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      imagesNames: { select: { imageName: true } },
      formationOrders: { select: { id: true } }
    },
  });

  let formation = null;
  if (unFormatedProduct) {
    formation = {
      id: unFormatedProduct.id,
      title: unFormatedProduct.title,
      price: unFormatedProduct.price,
      formationCategoryTitle: unFormatedProduct.formationCategoryTitle,
      isAvailable: unFormatedProduct.isAvailable,
      imagesNames: unFormatedProduct.imagesNames,
      revenue: unFormatedProduct.revenue,
      point1: unFormatedProduct.point1,
      point2: unFormatedProduct.point2,
      point3: unFormatedProduct.point3,
      point4: unFormatedProduct.point4,
      point5: unFormatedProduct.point5,
      point6: unFormatedProduct.point6,
    }
  }

  const categories = await prismadb.formationCategory.findMany();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          categories={categories}
          initialData={unFormatedProduct}
        />
      </div>
    </div>
  );
}

export default ProductPage;
