import PostCard from "@/components/cards/PostCard";
import Comment from "@/components/forms/Comment";
import { fetchPostsById } from "@/lib/actions/post.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";

async function Page({ params }: { params: { id: string } }) {
  if (!params.id) return null;

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const post = await fetchPostsById(params.id);


  return (
    <section>
      <div>
        <PostCard
          id={post._id}
          userId={userInfo._id}
          currentUserId={user.id}
          content={post.text}
          parentId={post.parentId}
          author={post.author}
          createdAt={post.createdAt}
          comments={post.children}
        />
      </div>
      <div>
        <h4 className="ms-[84px] text-sm text-gray-500 mt-1">
          Respondiendo a{" "}
          <Link href={`/profile/${post.author.id}`} className="text-sky-500">
            @{post.author.name}
          </Link>
        </h4>
        <Comment
          postId={params.id}
          userImg={userInfo.img}
          currentUserId={JSON.stringify(userInfo._id)}
        />
      </div>
      <div>
        {post.children.reverse().map((comment: any) => (
          <PostCard
            key={comment._id}
            id={comment._id}
            userId={userInfo._id}
            currentUserId={user.id}
            parentId={comment.parentId}
            content={comment.text}
            author={comment.author}
            createdAt={comment.createdAt}
            comments={comment.children}
            isComment
          />
        ))}
      </div>
    </section>
  );
}

export default Page;
