import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
} from "../ui/dialog";
import { postStats } from "@/constants";

const Stats = ({
  stats,
  user,
  text,
  likes,
  reposts,
  comments,
  timeSince,
}: {
  stats: {
    views: number;
    interactions: number;
    inDetail: number;
  };
  user: {
    name: string;
    username: string;
    img: string;
  };
  text: string;
  likes: number;
  reposts: number;
  comments: number;
  timeSince: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-1 group">
          <Image
            className="cursor-pointer rounded-full p-1 group-hover:bg-blue-500 duration-200"
            src="/assets/stats.svg"
            alt="stats"
            width={28}
            height={28}
          />
          <p className="text-xs group-hover:text-blue-500">{stats.views}</p>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-[#000]">
        <DialogHeader>
          <DialogTitle className="tracking-wide font-bold">
            Estadísticas del post
          </DialogTitle>
        </DialogHeader>
        <section className="grid gap-4 py-4">
          <div className="border rounded-xl p-3 mt-1 text-sm hover:cursor-pointer">
            <div className="flex gap-1">
              <Image
                className="rounded-full"
                src={user.img}
                alt={user.name}
                width={20}
                height={20}
              />
              <p className="font-bold">{user.name}</p>
              <p className="text-gray-500">
                @{user.username} ‧ {timeSince}
              </p>
            </div>
            <div>
              <p className="text-sm mt-1">{text}</p>
            </div>
          </div>
          <div className="border rounded-xl px-2 py-4 mt-1 flex justify-around">
            <article>
              <Image
                src={"/assets/likes.svg"}
                alt="likes"
                width={20}
                height={20}
              />
              <p className="text-center">{likes}</p>
            </article>
            <article>
              <Image
                src={"/assets/repost.svg"}
                alt="repost"
                width={20}
                height={20}
              />
              <p className="text-center">{reposts}</p>
            </article>
            <article>
              <Image
                src={"/assets/comments.svg"}
                alt="comments"
                width={20}
                height={20}
              />
              <p className="text-center">{comments}</p>
            </article>
          </div>
        </section>
        <section className="flex justify-around">
          {postStats.map((stat, index) => (
            <article key={index}>
              <div className="flex text-gray-500 text-sm items-center gap-1">
                <p>{stat.title}</p>
                <div className="group relative hover:cursor-pointer">
                  <Image
                    src={"/assets/info.svg"}
                    alt="asd"
                    width={14}
                    height={14}
                    
                  />
                  <div className="w-60 hidden p-4 absolute bottom-4 -left-28 bg-[#000] border rounded-xl shadow shadow-white group-hover:block">
                    <h4 className="text-xl font-bold text-white mb-2">{stat.title}</h4>
                    <p >{stat.description}</p>
                  </div>
                </div>
              </div>
              <p className="text-4xl font-bold">
                {Object.values(stats)[index]}
              </p>
            </article>
          ))}
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default Stats;
