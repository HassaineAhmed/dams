"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/_components/ui/button";
import { DataTable } from "@/_components/ui/data-table";
import { Heading } from "@/_components/ui/heading";
import { Separator } from "@/_components/ui/separator";

import { ProductColumn, columns } from "./columns";

interface ProductsClientProps {
  data: ProductColumn[];
};

export const ProductsClient: React.FC<ProductsClientProps> = ({
  data
}) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Products (${data.length})`} description="Manage products for your store" />
        <Button onClick={() => router.push(`/dashboard/products/new`)}>
          <Plus className="mr-2 h-4 w-4" />Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
