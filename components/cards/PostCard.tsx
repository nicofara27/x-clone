import Image from "next/image";
import Link from "next/link";
import GiveLike from "../buttons/GiveLike";
import { fetchLikes } from "@/lib/actions/post.actions";
import Repost from "../buttons/Repost";

interface Props {
  id: string;
  userId: string;
  content: string;
  author: {
    name: string;
    img: string;
    id: string;
  };
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
}

const PostCard = async ({
  id,
  userId,
  content,
  author,
  createdAt,
  comments,
  isComment,
}: Props) => {
  const postLikes = await fetchLikes(id);

  return (
    <article
      className={`border-b hover:bg-gray-800 p-4 ${!isComment && "pt-8"}`}
    >
      <div className="w-full flex flex-row gap-2 md:gap-4">
        <div className="flex flex-col">
          <Link href={`/profile/${author.id}`} className="relative w-10 h-10">
            <Image
              src={author.img}
              alt="Foto de perfil"
              fill
              className="cursor-pointer rounded-full hover:opacity-80 duration-200"
            />
          </Link>
        </div>
        <div className="w-full flex flex-col">
          <Link
            href={`/profile/${author.id}`}
            className="w-fit hover:underline font-semibold"
          >
            <h4 className="text-lg">{author.name}</h4>
          </Link>
          <p>{content}</p>
        </div>
      </div>
      <div
        className={`w-full md:w-3/4 flex justify-between pt-3 ${
          !isComment && "border-t md:border-0 mt-4"
        }`}
      >
        <GiveLike
          userId={JSON.stringify(userId)}
          postId={JSON.stringify(id)}
          postLikes={JSON.stringify(postLikes)}
        />
        <Repost text={content} author={JSON.stringify(userId)} postId={JSON.stringify(id)} />
        <Link href={`/post/${id}`} className="flex items-center gap-2">
          <Image
            className="cursor-pointer rounded-full p-1 hover:bg-sky-500 duration-200"
            src="/assets/comments.svg"
            alt="comments"
            width={28}
            height={28}
          />
          <p className="text-xs">{comments.length > 0 && comments.length}</p>
        </Link>
        <Image
          className="cursor-pointer rounded-full p-1 hover:bg-blue-500 duration-200"
          src="/assets/stats.svg"
          alt="stats"
          width={28}
          height={28}
        />
      </div>
    </article>
  );
};

export default PostCard;
