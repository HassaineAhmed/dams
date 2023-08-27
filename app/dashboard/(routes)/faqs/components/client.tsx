"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/_components/ui/button";
import { DataTable } from "@/_components/ui/data-table";
import { Heading } from "@/_components/ui/heading";
import { Separator } from "@/_components/ui/separator";

import { columns, FAQColumn } from "./columns";

interface CategoriesClientProps {
  data: FAQColumn[];
}

export const FAQsClient: React.FC<CategoriesClientProps> = ({
  data
}) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`FAQs (${data.length})`} description="Manage manage faqs for your store" />
        <Button onClick={() => router.push(`/dashboard/faqs/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="question" columns={columns} data={data} />
    </>
  );
};
