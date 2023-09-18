"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction, StageCellAction } from "./cell-action"


export type OrderColumn = {
  id: number,
  product: string;
  date: string,
  phoneNumber: number,
  wilaya: string,
  address: string,
  revenue: number,
  stage: string
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
    accessorKey: "name",
    header: "Name",
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
    header: "stage",
    cell: ({ row }) => <StageCellAction orderId={row.original.id} previousStage={row.original.stage} />,
  },
  {
    id: "actions",
    cell: ({ row }) => { return <CellAction data={row.original} /> }
  },
];
