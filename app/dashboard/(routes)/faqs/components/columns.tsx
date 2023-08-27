"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

export type FAQColumn = {
  id: string
  question: string;
  answer: string;
}

export const columns: ColumnDef<FAQColumn>[] = [
  {
    accessorKey: "question",
    header: "Question",
  },
  {
    accessorKey: "answer",
    header: "Answer",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
];
