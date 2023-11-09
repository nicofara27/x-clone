import Image from "next/image";
import Link from "next/link";

interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    img: string;
    id: string;
  };
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
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
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment,
}: Props) => {

  return (
    <article className={`flex border-b hover:bg-gray-800 p-4 ${!isComment && "pt-10"}`}>
        <div className="w-full flex flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative w-11 h-11">
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
            <div className="w-3/4 flex justify-between mt-3">
              <Image
                className="cursor-pointer rounded-full p-1 hover:bg-sky-500 duration-200"
                src="/assets/likes.svg"
                alt="likes"
                width={28}
                height={28}
              />
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
          </div>  

      </div>
    </article>
  );
};

export default PostCard;
