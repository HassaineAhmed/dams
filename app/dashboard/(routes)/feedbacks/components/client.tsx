"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/_components/ui/button";
import { DataTable } from "@/_components/ui/data-table";
import { Heading } from "@/_components/ui/heading";
import { Separator } from "@/_components/ui/separator";

import { columns, FeedbackColumn } from "./columns";

interface FeedbackClientProps {
  data: FeedbackColumn[];
}

export const FeedbackClient: React.FC<FeedbackClientProps> = ({
  data
}) => {
  const router = useRouter();

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:items-center items-start gap-4 justify-between">
        <Heading title={`FAQs (${data.length})`} description="Manage manage faqs for your store" />
        <Button onClick={() => router.push(`/dashboard/faqs/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
