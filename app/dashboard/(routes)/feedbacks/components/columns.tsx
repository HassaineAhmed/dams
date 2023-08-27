"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

export type FeedbackColumn = {
  id: string
  name: string;
  email: string;
  phoneNumber: number | null,
  message: string;
  date: Date;
}

export const columns: ColumnDef<FeedbackColumn>[] = [
  {
    accessorKey: "name",
    header: "name",
  },
  {
    accessorKey: "email",
    header: "email",
  },
  {
    accessorKey: "phoneNumber",
    header: "phone number",
  },
  {
    accessorKey: "message",
    header: "message",
  },
  {
    accessorKey: "date",
    header: "date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
];
