"use client";

import { useParams, useRouter } from "next/navigation";

import { DataTable } from "@/_components/ui/orderDataTable";
import { Heading } from "@/_components/ui/heading";
import { Separator } from "@/_components/ui/separator";

import { columns, OrderColumn } from "./columns";

interface CategoriesClientProps {
  data: OrderColumn[];
}

export const OrdersClient: React.FC<CategoriesClientProps> = ({
  data
}) => {
  const router = useRouter();
  return (
    <>
      <div className="flex flex-col lg:flex-row lg:items-center items-start gap-4 justify-between">
        <Heading title={`Orders (${data.length})`} description="Manage Order for your store" />
      </div>
      <Separator />
      <DataTable searchKey="phoneNumber" columns={columns} data={data} />
    </>
  );
};
