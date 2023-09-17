"use client";

import axios from "axios";
import { useState } from "react";
import { Copy, ClipboardEdit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/_components/ui/dropdown-menu";
import { AlertModal } from "@/_components/modals/alert-modal";

import { OrderColumn } from "./columns";

interface CellActionProps {
  data: OrderColumn;
}

export const CellAction: React.FC<CellActionProps> = ({
  data,
}) => {
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onConfirm = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/categories/${data.id}`)
      toast.success('Category deleted.');
      router.refresh();
    } catch (error) {
      toast.error('Make sure you removed all products using this category first.');
    } finally {
      await axios.get("/api/revalidate-data").catch(e => toast.error("home page is not refreshed"))
      setOpen(false);
      setLoading(false);
    }
  };
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/orders/${data.id}`)
      toast.success('order deleted.');
      router.refresh();
    } catch (error) {
      toast.error("Can't remove order.");
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  return (
    <>
      <Button variant={"destructive"} onClick={onDelete}>Delete</Button>
    </>
  );
};
