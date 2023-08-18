import prismadb from "@/_lib/prismadb";

import { CategoryForm } from "./components/category-form";

const CategoryPage = async ({
  params
}: {
  params: { categoryId: string }
}) => {
  console.log("id :",params.categoryId);
  const category = await prismadb.productType.findUnique({
    where: {
      id: params.categoryId
    }
  });
  console.log("the category :", category);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm initialData={category} />
      </div>
    </div>
  );
}

export default CategoryPage;
