"use client";
import { addRepost } from "@/lib/actions/post.actions";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Repost = ({
  postData,
  text,
  author,
}: {
  postData: string;
  text: string;
  author: string;
}) => {
  const pathname = usePathname();
  const pReposts = JSON.parse(postData);

  const repost = async () => {
    await addRepost(pReposts._id, text, JSON.parse(author), pathname);
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
      <p className="text-xs">{pReposts.reposts.length>0 && pReposts.reposts.length}</p>
    </button>
  );
};

export default Repost;
