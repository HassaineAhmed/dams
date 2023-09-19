"use client";

import * as z from "zod";
import axios from "~/axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { Category } from "@prisma/client";
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
import ImageUpload from "@/_components/ui/image-upload";
import { Separator } from "@/_components/ui/separator";
import { Heading } from "@/_components/ui/heading";
import { AlertModal } from "@/_components/modals/alert-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/_components/ui/select";

const formSchema = z.object({
  name: z.string().min(2),
  imageName: z.object({ imageName: z.string(), url: z.string().optional() }).array(),
  sizingSystem: z.string(),
});

type CategoryFormValues = z.infer<typeof formSchema> | Category;

type CategoryFormProps = {
  initialData: Category & { imageName: Array<{ imageName: string, url?: string }> } | null;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  if (initialData) {
    initialData.imageName[0].url = `https://dams-images.s3.eu-central-1.amazonaws.com/${initialData.imageName[0].imageName}`
  }

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit category" : "Create category";
  const description = initialData ? "Edit a category." : "Add a new category";
  const toastMessage = initialData ? "Category updated." : "Category created.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      imageName: [],
      sizingSystem: "",
    },
  });

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/categories/${params.categoryId}`, { data, initialData })
          .then(res => {
            if (res.status == 200) {
              toast.success('Category updated succesffuly', { duration: 2000 });
              router.refresh();
              router.push(`/dashboard/categories`);
            }
          })
          .catch(e => console.log('server error', e))
      } else {
        await axios
          .post(
            "/api/categories",
            data,
            { headers: { "Content-Type": `application/json` } }
          )
          .then(res => {
            if (res.status == 200) {
              toast.success(toastMessage, { duration: 2000 });
              router.refresh();
              router.push(`/dashboard/categories`);
            }
          })
          .catch(async (e) => {
            console.log("post error", e);
            toast.error("Something went wrong.", { duration: 3000 });
          })
      }
    } finally {
      console.log("going to revalidate");
      await axios.get("/api/revalidate-data");
      await fetch("https://dams-shop.vercel.app/api/revalidate-data", { cache: "no-cache" }).then(res => console.log("revalidated successfully", res.status))
        .catch(e => toast.error("home page is not refreshed"))
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/categories/${params.categoryId}`);
      router.refresh();
      router.push(`/dashboard/categories`);
      toast.success("Category deleted.");
    } catch (error: any) {
      toast.error(
        "Make sure you removed all products using this category first."
      );
    } finally {
      await fetch("https://dams-shop.vercel.app/api/revalidate-data", { cache: "no-cache" }).then(res => console.log("revalidated successfully", res.status))
        .catch(e => toast.error("home page is not refreshed"))
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Category name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sizingSystem"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sizing System</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a sizing system"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={"letters"}>
                        Letters: S, M, L...
                      </SelectItem>
                      <SelectItem value={"numbers"}>
                        Numbers: 40, 41, 42...
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="imageName"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value}
                      disabled={loading}
                      onChange={(imageName) => {
                        field.onChange([{ imageName }]);
                      }}
                      onRemove={() =>
                        field.onChange([])
                      }
                      isMultiple={false}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
