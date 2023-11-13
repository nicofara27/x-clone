import { fetchUserPosts } from "@/lib/actions/user.actions";
import PostCard from "../cards/PostCard";

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}
const PostsTab = async ({ currentUserId, accountId, accountType }: Props) => {
  const result = await fetchUserPosts(accountId);

  return (
    <section>
      {result.posts.map((post: any) => (
        <PostCard
          key={post._id}
          id={post._id}
          currentUserId={currentUserId}
          parentId={post.parentId}
          content={post.text}
          author={
            accountType === "user"
              ? { name: result.name, img: result.img, id: result.id,}
              : {name: post.author.name, img: post.author.image, id: post.author.id,
                }
          }
          community={post.community}
          createdAt={post.createdAt}
          comments={post.children}
        />
      ))}
    </section>
  );
};

export default PostsTab;
