"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

export type CategoryColumn = {
  id: string
  title: string;
}

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "title",
    header: "title",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
];
