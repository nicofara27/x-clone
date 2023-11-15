"use client";
import { addLike } from "@/lib/actions/post.actions";
import Image from "next/image";

const GiveLike = ({ postId, userId }: { postId: string; userId: string }) => {
  const giveLike = async (postId: string, userId: string) => {
    await addLike(JSON.parse(postId), JSON.parse(userId));
  };
  return (
    <Image
      className="cursor-pointer rounded-full p-1 hover:bg-sky-500 duration-200"
      src="/assets/likes.svg"
      alt="likes"
      width={28}
      height={28}
      onClick={() => giveLike(postId, userId)}
    />
  );
};

export default GiveLike;
