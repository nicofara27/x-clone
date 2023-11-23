"use client";
import { addRepost } from "@/lib/actions/post.actions";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Repost = ({
  postId,
  text,
  author,
}: {
  postId: string;
  text: string;
  author: string;
}) => {
  const pathname = usePathname();

  const repost = async () => {
    await addRepost(JSON.parse(postId), text, JSON.parse(author), pathname);
  };

  return (
    <button className="flex items-center gap-1">
      <Image
        className="cursor-pointer rounded-full p-1 hover:bg-emerald-500 duration-200"
        src="/assets/repost.svg"
        alt="reposts"
        width={28}
        height={28}
        onClick={repost}
      />
      <p className="text-xs">{}</p>
    </button>
  );
};

export default Repost;
