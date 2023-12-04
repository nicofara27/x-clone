"use client";
import { addRepost } from "@/lib/actions/post.actions";
import { ObjectId } from "mongoose";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Repost = ({
  postId,
  text,
  author,
  reposts
}: {
  postId: string;
  text: string;
  author: string;
  reposts: string;
}) => {
  const pathname = usePathname();
  const pId = JSON.parse(postId);
  const pReposts = JSON.parse(reposts);

  const repost = async () => {
    await addRepost(pId, text, JSON.parse(author), pathname);
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
      <p className="text-xs">{pReposts.length>0 && pReposts.length}</p>
    </button>
  );
};

export default Repost;
