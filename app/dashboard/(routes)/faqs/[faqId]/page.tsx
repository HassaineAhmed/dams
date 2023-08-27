import prismadb from "@/_lib/prismadb";

import { FAQsForm } from "./components/faq-form";

const CategoryPage = async ({
  params
}: {
  params: { faqId: string }
}) => {
  const faq = await prismadb.fAQ.findUnique({
    where: {
      id: params.faqId
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <FAQsForm initialData={faq} />
      </div>
    </div>
  );
}

export default CategoryPage;
