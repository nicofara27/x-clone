"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Textarea } from "../ui/textarea";
import { usePathname, useRouter } from "next/navigation";
import { PostValidation } from "@/lib/validations/post";
import { addPost } from "@/lib/actions/post.actions";

const Post = ({ userId, userImg }: { userId: string, userImg: string }) => {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      post: "",
      accountId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof PostValidation>) => {
    await addPost({
      text: values.post,
      author: userId,
      communityId: null,
      path: pathname,
    });

    router.push("/");
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col justify-start gap-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="post"
          render={({ field }) => (
            <FormItem className="flex w-full flex-row gap-3">
              <div>
                <Image
                  className="rounded-full"
                  src={userImg}
                  alt="Logo"
                  width={48}
                  height={48}
                />
              </div>
              <FormControl>
                <Textarea
                  rows={2}
                  className="bg-black border-none text-xl resize-none no-focus"
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

export default Post;