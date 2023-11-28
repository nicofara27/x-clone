import { fetchUserPosts } from "@/lib/actions/user.actions";
import PostCard from "../cards/PostCard";

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
  tab: string;
}
const PostsTab = async ({
  currentUserId,
  accountId,
  accountType,
  tab,
}: Props) => {
  const result = await fetchUserPosts(accountId, tab);
  let posts = result.posts.concat(result.reposts);

  switch (tab) {
    case "replies": {
      posts = posts.concat(result.comments);
    }
  }
  return (
    <section>
      {posts.map((post: any, index: number) => (
        <PostCard
          key={post._id}
          id={post._id}
          userId={currentUserId}
          content={post.text}
          author={
            accountType === "user"
              ? { name: result.name, img: result.img, id: result.id }
              : {
                  name: post.author.name,
                  img: post.author.image,
                  id: post.author.id,
                }
          }
          createdAt={post.createdAt}
          comments={post.children}
        />
      ))}
    </section>
  );
};

export default PostsTab;
