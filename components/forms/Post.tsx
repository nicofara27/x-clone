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
import { useState, ChangeEvent } from "react";
import { useUploadThing } from "@/lib/uploadthing";
import MediaInput from "../inputs/ImgInput";
import { isBase64Img } from "@/lib/utils";

const Post = ({ userId, userImg }: { userId: string; userImg: string }) => {
  const [pImg, setPImg] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing("media");
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      post: "",
      accountId: JSON.parse(userId),
    },
  });

  function handleMedia(
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (e) => {
        const imgDataUrl = e.target?.result?.toString() || "";
        fieldChange(imgDataUrl);
        setPImg(imgDataUrl);
      };
      fileReader.readAsDataURL(file);
    }
  }

  const onSubmit = async (values: z.infer<typeof PostValidation>) => {
    if (values.media) {
      const blob = values.media;
      const hasImgChange = isBase64Img(blob);
      if (hasImgChange) {
        const imgRes = await startUpload(files);
        if (imgRes && imgRes[0].url) {
          values.media = imgRes[0].url;
        }
      }
    }
    await addPost({
      text: values.post,
      media: values.media,
      author: JSON.parse(userId),
      path: pathname,
    });

    router.push("/");

    form.reset();
  };

  return (
    <Form {...form}>
      <form
        className="flex justify-start gap-1 py-2 px-4  border-b-2 border-gray-700"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div>
          <Image
            className="rounded-full mt-2"
            src={userImg}
            alt="Logo"
            width={44}
            height={44}
          />
        </div>
        <div className="flex-1">
          <FormField
            control={form.control}
            name="post"
            render={({ field }) => (
              <FormItem className=" w-full px-4 space-y-1 ">
                <FormControl>
                  <Textarea
                    rows={1}
                    className="bg-black border-none text-xl resize-none no-focus scrollbar-none px-0 "
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                {pImg && (
                  <div className="relative w-[100%] h-[35rem] ">
                    <Image
                      src="/assets/close.svg"
                      alt=""
                      width={32}
                      height={32}
                      className="absolute z-10 right-2 top-2 p-1 bg-gray-900 rounded-full  hover:bg-gray-800 hover:cursor-pointer"
                      onClick={() => setPImg("")}
                    />
                    <Image
                      src={pImg}
                      alt=""
                      fill
                      className="rounded-3xl object-cover"
                    />
                  </div>
                )}
              </FormItem>
            )}
          />
          <div className="flex justify-between mx-4 pt-2 border-t border-gray-700">
            <div className="flex items-center gap-2">
              <MediaInput form={form} handleMedia={handleMedia} />
            </div>
            <Button
              type="submit"
              className="bg-sky-500 hover:bg-sky-600 rounded-full"
            >
              Postear
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default Post;
