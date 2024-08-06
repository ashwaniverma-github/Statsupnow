'use client';
import PopupModel from "./sm-components/popUpModel";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import prisma from "../../prisma/db";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";


const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" })
});

export default function TesterForm() {
  const [isTesterFormOpen, setIsTesterFormOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async(data: any) => {
    try{
        const createTester = fetch('api/get-tester',{
            method:'POST',
            body:JSON.stringify(data)
        })
    }catch(err){
        console.error(err)
    }


    setIsTesterFormOpen(false);
  };

  useEffect(() => {
    setIsTesterFormOpen(true);
  }, []);

  function close() {
    setIsTesterFormOpen(false);
  }

  return (
    <div>
      <PopupModel isOpen={isTesterFormOpen} onClose={close}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                    <h2 className="mb-5 text-center font-semibold text-lg " >Enter your mail to be part of out beta Testing program</h2>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@example.com"  {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your email address.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </PopupModel>
    </div>
  );
}
