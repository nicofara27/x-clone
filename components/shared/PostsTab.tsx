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
  function compareByDate(a: { createdAt: number }, b: { createdAt: number }) {
    return a.createdAt - b.createdAt;
  }
  let posts = result.posts.concat(result.reposts);

  switch (tab) {
    case "replies": {
      posts = posts.concat(result.comments).sort(compareByDate).reverse();
    } break;
    case "posts": {
      posts = posts.sort(compareByDate).reverse();
    }
  }

  return (
    <section>
      {posts.map((post: any, index: number) => (
        <PostCard
          key={post._id || post.repost._id}
          id={post._id || post.repost._id}
          userId={currentUserId}
          content={post.text || post.repost.text}
          author={
            accountType === "user"
              ? {
                  name: result.name,
                  img: result.img,
                  id: result.id,
                  username: result.username,
                }
              : {
                  name: post.author.name,
                  img: post.author.image,
                  id: post.author.id,
                  username: post.author.username,
                } ||
              {
                  name: post.repost.author.name,
                  img: post.repost.author.image,
                  id: post.repost.author.id,
                  username: post.repost.author.username,
                } 
          }
          likes={post.likes || post.repost.likes}
          reposts={post.reposts || post.repost.reposts}
          stats={post.stats || post.repost.stats}
          createdAt={post.repostedAt || post.createdAt}
          comments={post.children || post.repost.children}
        />
      ))}
    </section>
  );
};

export default PostsTab;
