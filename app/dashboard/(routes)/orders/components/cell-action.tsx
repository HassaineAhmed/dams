"use client";

import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/_components/ui/select";

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"

import { Button } from "@/_components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/_components/ui/form";


import { OrderColumn } from "./columns";

interface CellActionProps {
  data: OrderColumn;
}

interface StageCellActionProps {
  previousStage: string;
  orderId: number
}

export const CellAction: React.FC<CellActionProps> = ({
  data,
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/order/${data.id}`)
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
      <Button variant={"destructive"} onClick={onDelete} disabled={loading} className="ml-auto" >Delete</Button>
    </>
  );
};

const formSchema = z.object({
  stage: z.string().min(1)
})

type TFormValue = z.infer<typeof formSchema>;

export const StageCellAction: React.FC<StageCellActionProps> = ({
  previousStage,
  orderId,
}) => {

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stage: previousStage
    }
  })

  async function onSubmit(data: TFormValue) {
    try {
      setLoading(true);
      await axios.patch("/api/order", { stage: data.stage, orderId: orderId }).then(res => {
        router.refresh();
        toast.success("Order stage updated")
      }).catch(e => {
        toast.error("Can't update stage, try again");
        console.log(e)
      })
    }
    catch (e) {
    } finally {
      setOpen(false);
      setLoading(false);
    }
  }
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex gap-3">
          <FormField
            control={form.control}
            name="stage"
            render={({ field }) => (
              <FormItem>
                <Select
                  disabled={loading}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="text-[16px]">
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Wilaya"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={"preparing"}>Preparing</SelectItem>
                    <SelectItem value={"gettingDelivered"}>Getting Delivered</SelectItem>
                    <SelectItem value={"delivered"}>Delivered</SelectItem>
                    <SelectItem value={"returned"}>Returned</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          {form.getValues("stage") != previousStage &&
            <Button disabled={loading} className="ml-auto" type="submit" >Save</Button>}
        </div>
      </form>
    </Form>
  );
};
