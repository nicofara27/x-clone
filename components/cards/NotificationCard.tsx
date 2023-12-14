import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import "dayjs/locale/es";

interface Params {
  _id?: string;
  parentId?: string;
  author?: {
    name: string;
    img: string;
    id: string;
    _id: string;
  };
  img?: string;
  name?: string;
  type?: string;
  post?: string;
  createdAt?: Date;
  id?: string;
}

const NotificationCard = ({ not }: { not: Params }) => {
  dayjs.locale("es");
  let relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime);
  let timeSince: Date = new Date();
  if (not.createdAt) {
    if (
      Math.floor((timeSince.getDate() - not.createdAt.getDate()) / 1000) <=
      86400
    ) {
      timeSince = (dayjs(not.createdAt) as any).fromNow();
    }
  }

  return (
    <Link
      key={not._id}
      href={`/post/${not.parentId ? not.parentId : not.post}`}
    >
      <article className="flex justify-between items-center px-4 py-8 border-b hover:bg-gray-800">
        <div className="flex">
          <Image
            src={not.author?.img || not.img || ""}
            alt="Foto de perfil"
            width={20}
            height={20}
            className="rounded-full me-2"
          />
          <p className="text-gray-500">
            <Link
              href={`/profile/${not.author?.id || not.id}`}
              className="text-sky-500 font-bold hover:underline"
            >
              {not.author?.name ? not.author.name : not.name}
            </Link>{" "}
            {not.type}
          </p>
        </div>
        <div>
          <p className="text-gray-500 text-xs">{timeSince.toString()}</p>
        </div>
      </article>
    </Link>
  );
};

export default NotificationCard;
