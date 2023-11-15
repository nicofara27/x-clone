import Image from "next/image";
import Link from "next/link";
import GiveLike from "../buttons/GiveLike";

interface Props {
  id: string;
  userId: string;
  currentUserId: string;
  content: string;
  parentId: string;
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

const PostCard = ({
  id,
  currentUserId,
  userId,
  content,
  author,
  parentId,
  createdAt,
  comments,
  isComment,
}: Props) => {

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
        <GiveLike userId={JSON.stringify(userId)} postId={JSON.stringify(id)} />
        <Image
          className="cursor-pointer rounded-full p-1 hover:bg-emerald-500 duration-200"
          src="/assets/repost.svg"
          alt="likes"
          width={28}
          height={28}
        />
        <Link href={`/post/${id}`}>
          <Image
            className="cursor-pointer rounded-full p-1 hover:bg-pink-500 duration-200"
            src="/assets/comments.svg"
            alt="likes"
            width={28}
            height={28}
          />
        </Link>
        <Image
          className="cursor-pointer rounded-full p-1 hover:bg-blue-500 duration-200"
          src="/assets/stats.svg"
          alt="likes"
          width={28}
          height={28}
        />
      </div>
    </article>
  );
};

export default PostCard;
