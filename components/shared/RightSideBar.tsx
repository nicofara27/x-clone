import { fetchTrendingHashtags } from "@/lib/actions/post.actions";
import Link from "next/link";

const RightSideBar = async() => {

  const trendingHashtags= await fetchTrendingHashtags();
  return (
    <aside className="hidden md:block sticky right-0 top-0 w-[10%] lg:w-[35%] border-l border-gray-700 py-4 pl-8">
      <section className="bg-gray-800 rounded-lg ">
        <h2 className="text-xl font-bold p-4">Qué está pasando</h2>
        <div>
          {
            trendingHashtags?.map((hashtag, i) => (
            <article key={i} className=" p-4 hover:bg-gray-600 hover:cursor-pointer">
                <p className="text-xs text-gray-400 ">Tendecia</p>
                <h4 className="font-semibold leading-4 mb-1">{Object.entries(hashtag)[0][0]}</h4>
                <p className="text-xs text-gray-400">{Object.entries(hashtag)[0][1]} posts</p>
            </article>
            ))
          }
        </div>
        <div className=" p-4 hover:bg-gray-600 hover:cursor-pointer ">
        <Link href="/explore" className="text-blue-500 ">Mostrar más</Link>
        </div>
      </section>
    </aside>
  );
};

export default RightSideBar;
