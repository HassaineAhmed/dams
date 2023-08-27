import prismadb from "@/_lib/prismadb";

import { FeedbackColumn } from "./components/columns"
import { FeedbackClient } from "./components/client";

const FAQsPage = async () => {

  const feedbacks = await prismadb.feedback.findMany();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <FeedbackClient data={feedbacks} />
      </div>
    </div>
  );
};

export default FAQsPage;
