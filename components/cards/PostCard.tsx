import Image from "next/image";
import Link from "next/link";
import GiveLike from "../buttons/GiveLike";
import { fetchPostData } from "@/lib/actions/post.actions";
import Repost from "../buttons/Repost";
import dayjs from "dayjs";
import "dayjs/locale/es";

interface Props {
  id: string;
  userId: string;
  content: string;
  stats: {
    views: number;
    interactions: number;
    inDetail: number;
  };
  author: {
    name: string;
    username: string;
    img: string;
    id: string;
  };
  likes: number;
  reposts: {}[];
  createdAt: number;
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
  likes,
  reposts,
  stats,
  createdAt,
  comments,
  isComment,
}: Props) => {
  dayjs.locale("es");
  let relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime);
  let timeSince = new Intl.DateTimeFormat("es-Ar").format(createdAt);

  if (Math.floor((new Date() - createdAt) / 1000) <= 86400) {
    timeSince = (dayjs(createdAt) as any).fromNow();
  }

  return (
    <article className="border-b hover:bg-gray-800 p-4">
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
            className="w-fit flex gap-2 text-sm"
          >
            <h4 className="hover:underline font-semibold">{author.name}</h4>
            <p className="text-gray-500">
              @{author.username} ‧ {timeSince}
            </p>
          </Link>
          <p className="text-sm">{content}</p>
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
          postLikes={JSON.stringify(likes)}
        />
        <Repost
          text={content}
          author={JSON.stringify(userId)}
          postId={JSON.stringify(id)}
          reposts={JSON.stringify(reposts)}
        />
        <Link href={`/post/${id}`} className="flex items-center gap-1">
          <Image
            className="cursor-pointer rounded-full p-1 hover:bg-sky-500 duration-200"
            src="/assets/comments.svg"
            alt="comments"
            width={28}
            height={28}
          />
          <p className="text-xs">{comments.length > 0 && comments.length}</p>
        </Link>
        <div className="flex items-center gap-1">
          <Image
            className="cursor-pointer rounded-full p-1 hover:bg-blue-500 duration-200"
            src="/assets/stats.svg"
            alt="stats"
            width={28}
            height={28}
          />
          <p className="text-xs">{stats.views}</p>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
