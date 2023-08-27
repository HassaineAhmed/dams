import prismadb from "@/_lib/prismadb";

import { FAQColumn } from "./components/columns"
import { FAQsClient } from "./components/client";

const FAQsPage = async () => {

  const faqs = await prismadb.fAQ.findMany();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <FAQsClient data={faqs} />
      </div>
    </div>
  );
};

export default FAQsPage;
