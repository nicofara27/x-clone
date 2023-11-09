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
import { CommentValidation } from "@/lib/validations/post";
import { addComment } from "@/lib/actions/post.actions";

interface Props {
  postId: string;
  userImg: string;
  currentUserId: string;
}

const Comment = ({ postId, userImg, currentUserId }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof CommentValidation>>({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      post: "",
    },
  });


  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    
    await addComment(postId,
      values.post,
      JSON.parse(currentUserId),
      pathname)
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col justify-start"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="post"
          render={({ field }) => (
            <FormItem className="flex w-full gap-3 px-4">
              <div className="mt-3">
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
                  rows={1}
                  className="bg-black border-none text-xl resize-none no-focus"
                  placeholder="Postea tu respuesta"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between pb-4 border-b">
          <div className="flex flex-row gap-2 ps-[80px]">
            <Image src="/assets/img.svg" alt="Logo" width={20} height={20} />
            <Image src="/assets/gif.svg" alt="Logo" width={20} height={20} />
            <Image src="/assets/map.svg" alt="Logo" width={20} height={20} />
            <Image src="/assets/smile.svg" alt="Logo" width={20} height={20} />
          </div>
          <Button
            type="submit"
            className="w-1/4 me-4 rounded-full font-bold text-lg bg-sky-500 hover:bg-sky-600 "
          >
            Responder
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Comment;
