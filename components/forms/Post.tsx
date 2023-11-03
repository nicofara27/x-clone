// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
// } from "@/components/ui/form";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import Image from "next/image";
// import { Textarea } from "../ui/textarea";
// import { usePathname, useRouter } from "next/navigation";
// import { PostValidation } from "@/lib/validations/post";
// import { addPost } from "@/lib/actions/post.actions";




// const Post = ({ userId }: { userId: string }) => {
//   const router = useRouter();
//   const pathname = usePathname();

//   const form = useForm({
//     resolver: zodResolver(PostValidation),
//     defaultValues: {
//       post: "",
//       image: "",
//       accountId: userId,
//     },
//   });
//   const onSubmit = async (values: z.infer<typeof PostValidation>) => {
//     await addPost({
//       text: values.post,
//       author: userId,
//       image: values.image,
//       comunityId: null,
//       path: "/",
//     });

//     form.reset();
//   };

//   return (
//     <Form {...form}>
//       <form
//         className="flex flex-col justify-start gap-10"
//         onSubmit={form.handleSubmit(onSubmit)}
//       >
//         <FormField
//           control={form.control}
//           name="post"
//           render={({ field }) => (
//             <FormItem className="flex w-full flex-row gap-3">
//               <div>
//                 <Image
//                   className="rounded-full"
//                   src="/assets/logo.svg"
//                   alt="Logo"
//                   width={48}
//                   height={48}
//                 />
//               </div>
//               <FormControl>
//                 <Textarea
//                   rows={2}
//                   className="bg-black border-none text-xl resize-none no-focus"
//                   {...field}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="image"
//           render={({ field }) => (
//             <FormItem className="flex w-full flex-row gap-3">
//               <div>
//                 <Image
//                   className="rounded-full"
//                   src="/assets/logo.svg"
//                   alt="Logo"
//                   width={48}
//                   height={48}
//                 />
//               </div>
//               <FormControl>
//                 <Textarea
//                   rows={2}
//                   className="bg-black border-none text-xl resize-none no-focus"
//                   {...field}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <Button type="submit" className="bg-sky-500 hover:bg-sky-600">
//           Submit
//         </Button>
//       </form>
//     </Form>
//   );
// };

// export default Post;


"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { addPost } from "@/lib/actions/post.actions";
import { PostValidation } from "@/lib/validations/post";

interface Props {
  userId: string;
}

function Post({ userId }: Props) {
  const router = useRouter();
  const pathname = usePathname();


  const form = useForm({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      post: "",
      accountId: userId,
    },
  });

  const onSubmit =  () => {
    // await addPost({
    //   text: values.post,
    //   author: userId,
    //   communityId: null,
    //   path: pathname,
    // });

    // router.push("/");
  
  };

  return (
    <Form {...form}>
      <form
        className='mt-10 flex flex-col justify-start gap-10'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name='post'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
                Content
              </FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
                <Textarea rows={15} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='bg-primary-500'>
          Post Thread
        </Button>
      </form>
    </Form>
  );
}

export default Post;