import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { Feedback } from "@prisma/client";

import { Input } from "./input";
import { Button } from "@/_components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/_components/ui/form";

const formSchema = z.object({
  name: z.string().min(4),
  email: z.string().email(),
  phoneNumber: z.number().optional(),
  message: z.string().min(4),
});
type FormValues = z.infer<typeof formSchema> | Feedback;

export function FeedbackForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: null,
      message: "",
    },
  });

  async function onSubmit(data: FormValues) {
    //await axios.post("/give-feedbac", data);
    console.log(data);
  }

  const [loading, setLoading] = useState(false);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full"
      >
        <div className="md:grid mt-4 md:grid-cols-3 gap-4 grid ">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Full Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }
            }
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Phone Number (optional)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Message"
                    className="pb-8"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='w-full flex justify-end px-4'>
          <button disabled={loading} className="font-bold text-17 text-formGreen border-[1.5px] justify-self-end border-formGreen py-1 px-12" type="submit" >
            Send
          </button >
        </div>
      </form >
    </Form >
  )
}

