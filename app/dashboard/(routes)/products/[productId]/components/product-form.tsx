"use client"

import * as z from "zod"
import axios from "axios"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { Trash } from "lucide-react"
import { Product, Category } from "@prisma/client"
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
  name: z.string().min(1),
  imagesNames: z.object({ imageName: z.string(), url: z.string().optional() }).array().min(1),
  price: z.coerce.number().min(1),
  categoryName: z.string().min(1),
  isAvailable: z.boolean().default(false),
  isNewArrival: z.boolean().default(true),
  isForMen: z.boolean().default(false),
  isForWomen: z.boolean().default(false),
  isComingSoon: z.boolean().default(false),
  isTrending: z.boolean().default(false),
  model: z.string().optional(),
  fit: z.string().optional(),
  design: z.string().optional(),
});

type ProductFormValues = z.infer<typeof formSchema>

interface ProductFormProps {
  initialData: Product & { imagesNames: Array<{ imageName: string, url: string }> } | null;
  categories: Category[];
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
  console.log(initialData);
  if (initialData) {
    initialData.imagesNames = initialData.imagesNames.map(({ imageName }) =>
      ({ imageName: imageName, url: `/images/${initialData.categoryName}/${initialData.name}/${imageName}` }))
  }

  const defaultValues = initialData ? {
    ...initialData,
  } : {
    imagesNames: [],
    isAvailable: true,
    isNewArrival: true,
    isForMen: true,
    isForWomen: false,
    isComingSoon: false,
    isTrending: false,
    name: 'product',
    price: 3500,
    model: 'Einstein',
    fit: '',
    design: '',
    categoryName: '',
  }

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: ProductFormValues) => {
    console.log('hello')
    try {
      setLoading(true);
      if (initialData) {
        console.log(initialData)
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
          .then(res => {
            if (res.status == 200) {
              router.refresh();
              router.push(`/dashboard/products`);
              toast.success(toastMessage);
            }
          })
          .catch(e => {
            toast.error("server error");
            console.log(e)
          }
          )
      }
    } catch (error: any) {
      toast.error('Something went wrong.');
    } finally {
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
                    isMultiple={true}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
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
              name="design"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Design</FormLabel>
                  <FormControl>
                    <Input type="text" disabled={loading} placeholder="Brief description of the design (optional)." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fit</FormLabel>
                  <FormControl>
                    <Input type="text" disabled={loading} placeholder="For ex: oversize (optional)." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Model</FormLabel>
                  <FormControl>
                    <Input type="text" disabled={loading} placeholder="info about model (optional)." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryName"
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
                        <SelectItem key={category.id} value={category.name}>{category.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isAvailable"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Available
                    </FormLabel>
                    <FormDescription>
                      Make product public to everyone.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isTrending"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Trending
                    </FormLabel>
                    <FormDescription>
                      Show in the trending tab
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isNewArrival"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      New Arrival
                    </FormLabel>
                    <FormDescription>
                      Show product in New Arrival page. (default true)
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isForMen"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Men
                    </FormLabel>
                    <FormDescription>
                      Show product in Men page
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isForWomen"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Women
                    </FormLabel>
                    <FormDescription>
                      Show product in women page
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isComingSoon"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Coming Soon
                    </FormLabel>
                    <FormDescription>
                      Show in the coming soon tab
                    </FormDescription>
                  </div>
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
