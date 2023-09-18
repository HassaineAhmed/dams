"use client"
import { useSearchParams } from "next/navigation";
import * as z from "zod";
import axios from "~/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react"
import { QuantityCounter } from "./quantityCounter";

import { Input2 as Input } from "./input";

import { Button } from "@/_components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel, FormMessage,
} from "@/_components/ui/form";
import { Separator } from "@/_components/ui/separator";
import { Heading } from "@/_components/ui/heading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/_components/ui/select";
import { SizerPicker } from "./sizesPicker";

const wilayas = ["Adrar - 01", "Chlef - 02", "Laghouat - 03", "Oum El Bouaghi - 04", "Batna - 05", "Béjaïa - 06", "Biskra - 07", "Béchar - 08", "Blida - 09", "Bouira - 10", "Tamanghasset - 11", "Tébessa - 12", "Tlemcen - 13", "Tiaret - 14", "Tizi Ouzou - 15", "Algiers - 16", "Djelfa - 17", "Jijel - 18", "Sétif - 19", "Saïda - 20", "Skikda - 21", "Sidi Bel Abbès - 22", "Annaba - 23", "Guelma - 24", "Constantine - 25", "Médéa - 26", "Mostaganem - 27", "M'Sila - 28", "Mascara - 29", "Ouargla - 30", "Oran - 31", "El Bayadh - 32", "Illizi - 33", "Bordj Bou Arréridj - 34", "Boumerdès - 35", "El Tarf - 36", "Tindouf - 37", "Tissemsilt - 38", "El Oued - 39", "Khenchela - 40", "Souk Ahras - 41", "Tipaza - 42", "Mila - 43", "Aïn Defla - 44", "Naâma - 45", "Aïn Témouchent - 46", "Ghardaïa - 47", "Relizane - 48",];

const formSchema = z.object({
  name: z.string().min(2),
  phoneNumber: z.coerce.number().min(10).refine((val) => val !== null, {
    message: 'Please enter a phone number',
  }),
  address: z.string().min(8),
  wilaya: z.string().min(8),
  price: z.number().min(8),
});
type BuyFormValues = z.infer<typeof formSchema>;

export function BuyForm2({ product, params }: any) {
  const queryList = useSearchParams();
  const router = useRouter();
  const querySize = queryList.get('size')
  const nullableQuantity = queryList.get("quantity");
  //const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(nullableQuantity ? parseInt(nullableQuantity) : 1);
  const [size, setSize] = useState(querySize ? querySize : "");
  const [loading, setLoading] = useState(false);

  const title = "Complete purchase details";
  const description = "";
  const toastMessage = "Purchase Confirmed";
  const action = "Confirm";

  const form = useForm<BuyFormValues & { size: typeof size, quantity: typeof quantity }>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
      size: size,
      quantity: quantity,
      wilaya: "",
      price: product.price,
    },
  });

  const onSubmit = async (data: BuyFormValues) => {
    try {
      setLoading(true);
      await axios
        .post(
          "/api/order",
          { ...data, productName: product.name, size, quantity, productId: product.id },
          { headers: { "Content-Type": `application/json` } }
        )
        .then((res) => {
          toast.success(toastMessage, { duration: 3000 });
          router.refresh();
          setTimeout(() => { router.push(`/shop`) }, 3000)
        })
        .catch(async (e) => {
          console.log(e);
          toast.error("Something went wrong.", { duration: 2000 });
        })
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-10 lg:px-[80px] grid gap-4 py-8">
      <Toaster />
      <div className="flex items-start justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="md:grid gap-4 justify-start">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[20px] uppercase font-bold">Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[20px] uppercase font-bold">Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="Phone Number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="wilaya"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-[20px] uppercase font-bold">Wilaya</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger disabled={loading} className="focus-visible:ring-0 border-gold bg-pr rounded-none border-[2px] text-whitish h-[60px] outline-none !important">
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Wilaya"
                            className="text-whitish text-[20px] font-bold"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="ring-0 focus-visible:ring-0 outline-0">
                        {
                          wilayas.map((wilaya, index): any => <SelectItem className="rounded-none py-2 focus:bg-sd bg-pr border-[1px] focus-visible:ring-0 text-whitish outline-none border-gold" key={index} value={wilaya}>
                            {wilaya}
                          </SelectItem>
                          )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )
              }
              }
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[20px] uppercase font-bold">Address</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <QuantityCounter disabled={loading} variation={2} quantity={quantity} setQuantity={setQuantity} />
                  </FormControl>
                </FormItem>
              )} />
            <FormField
              control={form.control}
              name="size"
              render={({ field }) => (
                <FormItem>
                  <FormControl >
                    <SizerPicker disabled={loading} size={size} setSize={setSize} variation={2} />
                  </FormControl>
                </FormItem>
              )} />
          </div>
          <Button disabled={loading} variant={"shop"} className="py-[30px] font-bold font-lora ml-auto bg-pr" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </div>
  );

}

