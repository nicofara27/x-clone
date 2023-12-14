import NotificationCard from "@/components/cards/NotificationCard";
import { fetchUser, getNotifications } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface Notification {
  _id?: string;
  parentId?: string;
  author?: {
    name: string;
    img: string;
    _id: string;
  };
  img?: string;
  name?: string;
  type?: string;
  post?: string;
  createdAt?: Date;
}

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const notifications = await getNotifications(userInfo._id);
  let not: Notification[] = [];

  notifications.replies.map((notification: Notification) => {
    notification.type = "respondio a tu publicación";
    not.push(notification);
  });
  notifications.likes.map((notification) => {
    notification.type = "le dio un like a tu publicación";
    notification.likes.map((post: { like: string; likedAt: Date }) => {
      notification.post = post.like;
      notification.createdAt = post.likedAt;
    });
    not.push(notification);
  });
  notifications.reposts.map((notification) => {
    notification.type = "reposteo tu publicación";
    notification.reposts.map((post: { repost: string; repostedAt: Date }) => {
      notification.post = post.repost;
      notification.createdAt = post.repostedAt;
    });
    not.push(notification);
  });

  return (
    <section>
      <h2 className="py-8 px-4 text-xl font-semibold border-b">
        Notificaciones
      </h2>
      <div>
        {not.length === 0 ? (
          <div className="py-8 px-32">
            <h1 className="text-3xl font-bold">
              No hay nada que ver aquí. Por ahora.
            </h1>
            <p className="text-gray-500 mt-2">
              Desde los Me gusta hasta los reposts y mucho más: aquí es donde
              transcurre toda la acción.
            </p>
          </div>
        ) : (
          <>
            {not.map((notification) => (
              <NotificationCard
                key={notification._id}
                not={notification}
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
}

export default Page;
