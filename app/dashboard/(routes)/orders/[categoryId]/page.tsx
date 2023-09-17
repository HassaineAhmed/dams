import prismadb from "@/_lib/prismadb";

const CategoryPage = async ({
  params
}: {
  params: { categoryId: string }
}) => {
  const category = await prismadb.category.findUnique({
    where: {
      id: params.categoryId
    },
    include: {
      imageName: {
        select: {
          id: true,
          imageName: true
        }
      }
    }
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">

      </div>
    </div>
  );
}

export default CategoryPage;
