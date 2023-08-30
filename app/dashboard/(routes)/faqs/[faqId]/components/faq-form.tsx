"use client";

import * as z from "zod";
import axios from "~/axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { FAQ } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

import { Input } from "../../../../_components/ui/input"
import { Button } from "@/_components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/_components/ui/form";
import { Separator } from "@/_components/ui/separator";
import { Heading } from "@/_components/ui/heading";
import { AlertModal } from "@/_components/modals/alert-modal";

const formSchema = z.object({
  question: z.string().min(2),
  answer: z.string().min(2),
});

type FAQsFormValues = z.infer<typeof formSchema> | FAQ;

type FAQsFormProps = {
  initialData: FAQ | null;
}

export const FAQsForm: React.FC<FAQsFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit FAQ" : "Create FAQ";
  const description = initialData ? "Edit an FAQ" : "Add a new FAQ";
  const toastMessage = initialData ? "FAQ updated" : "FAQ created";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<FAQsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      question: "",
      answer: "",
    },
  });

  const onSubmit = async (data: FAQsFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/faqs/${params.faqId}`, data)
          .then(res => {
            if (res.status == 200) {
              toast.success('FAQ updated succesffuly', { duration: 2000 });
              router.refresh();
              router.push(`/dashboard/faqs`);
            }
          })
          .catch(e => console.log('server error', e))
      } else {
        await axios
          .post(
            "http://localhost:3000/api/faqs/",
            data,
            { headers: { "Content-Type": `application/json` } }
          )
          .then(res => {
            if (res.status == 200) {
              toast.success(toastMessage, { duration: 2000 });
              router.refresh();
              router.push(`/dashboard/faqs`);
            }
          })
          .catch(async (e) => {
            console.log(e);
            toast.error("Something went wrong.", { duration: 3000 });
          })
      }
    } finally {
      await fetch("http://localhost:3000/api/rd", { cache: "no-cache" }).catch(e => toast.error("home page is not refreshed"))
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/faqs/${params.categoryId}`);
      router.refresh();
      router.push(`/dashboard/faqs`);
      toast.success("FAQ deleted.");
    } catch (error: any) {
      toast.error(
        "There is an error"
      );
    } finally {
      await fetch("http://localhost:3000/api/rd", { cache: "no-cache" }).catch(e => toast.error("home page is not refreshed"))
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="FAQ Question"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="answer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Answer</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="FAQ Answer"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
