"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"


export type OrderColumn = {
  id: number,
  product: string;
  date: string,
  phoneNumber: number,
  wilaya: string,
  address: string,
  revenue: number,
}

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "product",
    header: "Product",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
  {
    accessorKey: "wilaya",
    header: "Wilaya",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "revenue",
    header: "Revenue",
  },
  {
    accessorKey: "stage",
    header: "Stage",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
];
