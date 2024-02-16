import PostCard from "@/components/cards/PostCard";
import Post from "@/components/forms/Post";
import { fetchPosts } from "@/lib/actions/post.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchPosts();

  return (
    <>
      <section className="flex flex-col">
        <div>
          <Post userId={JSON.stringify(userInfo._id)} userImg={userInfo.img} />
        </div>
        <div>
          {result.length === 0 ? (
            <p className="no-result">No threads found</p>
          ) : (
            <>
              {result.map((post) => (
                <PostCard
                  key={post._id}
                  id={post._id}
                  userId={userInfo._id}
                  content={post.text}
                  author={post.author}
                  likes={post.likes}
                  reposts={post.reposts}
                  stats={post.stats}
                  createdAt={post.createdAt}
                  comments={post.children}
                />
              ))}
            </>
          )}
        </div>
      </section>
    </>
  );
}
