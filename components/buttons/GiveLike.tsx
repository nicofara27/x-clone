"use client";
import { addLike } from "@/lib/actions/post.actions";
import Image from "next/image";

const GiveLike = ({
  postId,
  userId,
  postLikes,
}: {
  postId: string;
  userId: string;
  postLikes: any;
}) => {
  const uId = JSON.parse(userId);
  const pId = JSON.parse(postId);
  const pLikes = JSON.parse(postLikes);

  const giveLike = async (pId: string, uId: string) => {
    await addLike(pId, uId)
  };

  return (
    <button className="flex items-center gap-1">
      <Image
        className={`cursor-pointer rounded-full p-1 ${
          pLikes.likes.includes(userId) && "bg-pink-500"
        } hover:bg-pink-500 duration-200`}
        src="/assets/likes.svg"
        alt="likes"
        width={28}
        height={28}
        onClick={() => giveLike(pId, uId)}
      />
      <p className="text-xs">{pLikes.likes.length>0 && pLikes.likes.length}</p>
    </button>
  );
};

export default GiveLike;
