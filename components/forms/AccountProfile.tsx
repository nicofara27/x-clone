"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { userValidation } from "@/lib/validations/user";
import Image from "next/image";
import { ChangeEvent } from "react";
import { Textarea } from "../ui/textarea";

const AccountProfile = () => {
  const form = useForm({
    resolver: zodResolver(userValidation),
    defaultValues: {
      profile_photo: "",
      name: "",
      username: "",
      bio: "",
    },
  });

  function onSubmit(values: z.infer<typeof userValidation>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col justify-start gap-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel className="flex items-center justify-center rounded-full ">
                {field.value ? (
                  <Image
                    src={field.value}
                    alt="Foto de perfil"
                    width={96}
                    height={96}
                    priority
                    className="rounded-full object-contain"
                  />
                ) : (
                  <Image
                    src="/assets/user.svg"
                    alt="Foto de perfil"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                )}
              </FormLabel>
              <FormControl className="flex-1 font-semibold text-gray-200">
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="Sube tu foto de perfil"
                  className="cursor-pointer border-none bg-transparent outline-none file:text-blue-500 "
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="font-semibold text-gray-200">
                Nombre
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="border border-gray-700 bg-neutral-950 no-focus"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="font-semibold text-gray-200">
                Username
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="border border-gray-700 bg-neutral-950 no-focus"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="font-semibold text-gray-200">Bio</FormLabel>
              <FormControl>
                <Textarea
                  rows={10}
                  className="border border-gray-700 bg-neutral-950 no-focus"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-sky-500 hover:bg-sky-600">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default AccountProfile;
