import prismadb from "@/_lib/prismadb";

import { CategoryColumn } from "./components/columns"
import { CategoriesClient } from "./components/client";


const CategoriesPage = async () => {
  const categories = await prismadb.formationCategory.findMany();

  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    title: item.title,
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoriesClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
