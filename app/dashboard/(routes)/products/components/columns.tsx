"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export type ProductColumn = {
  id: string,
  name: string,
  price: number,
  categoryName: string,
  isAvailable: boolean,
  gender: string,
  howManyOrders: number,
}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isAvailable",
    header: "Available",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "categoryName",
    header: "Category",
  },
  {
    accessorKey: "howManyOrders",
    header: "Orders",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
];
