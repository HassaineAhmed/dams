"use client"

import * as z from "zod"
import axios from "~/axios"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { Trash } from "lucide-react"
import { Formation, FormationCategory } from "@prisma/client"
import { useParams, useRouter } from "next/navigation"

import { Input } from "@/_components/ui/input"
import { Button } from "@/_components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/_components/ui/form"
import { Separator } from "@/_components/ui/separator"
import { Heading } from "@/_components/ui/heading"
import { AlertModal } from "@/_components/modals/alert-modal"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/_components/ui/select"
import ImageUpload from "@/_components/ui/image-upload"
import { Checkbox } from "@/_components/ui/checkbox"




const formSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  imagesNames: z.object({ imageName: z.string(), url: z.string().optional() }).array().min(1),
  price: z.coerce.number().min(1),
  revenue: z.coerce.number().min(1),
  point1: z.string().min(1),
  point2: z.string().min(0),
  point3: z.string().min(0),
  point4: z.string().min(0),
  point5: z.string().min(0),
  point6: z.string().min(0),
  category: z.string().min(1)
});

type ProductFormValues = z.infer<typeof formSchema>

interface ProductFormProps {
  initialData: Formation & { imagesNames: Array<{ imageName: string, url?: string }> } | null;
  categories: FormationCategory[];
};

export const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  categories,
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit product' : 'Create product';
  const description = initialData ? 'Edit a product.' : 'Add a new product';
  const toastMessage = initialData ? 'Product updated.' : 'Product created.';
  const action = initialData ? 'Save changes' : 'Create';
  if (initialData) {
    initialData.imagesNames = initialData.imagesNames.map(({ imageName }) =>
      ({ imageName: imageName, url: `https://dams-images.s3.eu-central-1.amazonaws.com/${imageName}` }))

  }

  const defaultValues = initialData ? {
    ...initialData,
  } : {
    imagesNames: [],
    title: '',
    description: '',
    point1: '',
    point2: '',
    point3: '',
    point4: '',
    point5: '',
    point6: '',
    price: 0,
    revenue: 0,
    category: '',
  }

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: ProductFormValues) => {
    console.log("submitted")
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/products/${params.productId}`, { data, initialData })
          .then(res => {
            if (res.status == 200) {
              router.refresh();
              router.push(`/dashboard/products`);
              toast.success(toastMessage);
            }
          })
          .catch(e => {
            toast.error("Incorrect data");
            console.log(e)
          }
          )
      } else {
        await axios.post(`/api/products`, data)
          .then(async (res) => {
            if (res.status == 200) {
              router.refresh();
              router.push(`/dashboard/products`);
              toast.success(toastMessage);
            }
          })
          .catch(e => {
            toast.error("server error");
            console.log(e)
          })
      }
    } catch (error: any) {
      toast.error('Something went wrong.');
    } finally {
      await fetch(`/api/revalidate-data`, { cache: "no-cache" }).then(res => console.log("revalidated successfully", res.status))
        .catch(e => toast.error("home page is not refreshed"))
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/products/${params.productId}`);
      router.refresh();
      router.push(`/dashboard/products`);
      toast.success('Product deleted.');
    } catch (error: any) {
      toast.error('Something went wrong.');
    } finally {
      await fetch(`/api/revalidate-data`, { cache: "no-cache" }).then(res => console.log("revalidated successfully", res.status))
        .catch(e => toast.error("home page is not refreshed"))
      setLoading(false);
      setOpen(false);
    }
  }

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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <FormField
            control={form.control}
            name="imagesNames"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value}
                    disabled={loading}
                    onChange={(imageName) => field.onChange([...field.value, { imageName: imageName }])}
                    onRemove={(imageName) => field.onChange([...field.value.filter((current) => current.imageName !== imageName)])}
                    isMultiple={false}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" disabled={loading} placeholder="9.99" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="revenue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Revenue</FormLabel>
                <FormControl>
                  <Input type="number" disabled={loading} placeholder="9.99" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue defaultValue={field.value} placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.title}>{category.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <FormField
              control={form.control}
              name="point1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Point 1</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="point" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="point2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Point 2</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="point" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="point3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Point 3</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="point" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="point4"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Point 1</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="point" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="point5"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Point 1</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="point" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="point6"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Point 1</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="point" {...field} />
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
