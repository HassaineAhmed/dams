import prismadb from "@/_lib/prismadb";

import { CategoryColumn } from "./components/columns"
import { CategoriesClient } from "./components/client";

function wait() {
  return new Promise((resolve, reject) => {
    setTimeout(() => { resolve("wiatie") }, 10000)
  })

}

const CategoriesPage = async () => {
  await wait()
  const categories = await prismadb.category.findMany();

  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
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
