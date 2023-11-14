import { fetchUser, getNotifications } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const notifications = await getNotifications(userInfo._id);

  return (
    <section>
      <h2 className="py-8 px-4 text-xl font-semibold border-b">Notificaciones</h2>
      <section>
        {notifications.length === 0 ? (
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
            {notifications.map((notification) => (
              <Link
                key={notification._id}
                href={`/post/${notification.parentId}`}
              >
                <article className="flex p-4 border-b hover:bg-gray-800">
                  <Image
                    src={notification.author.img}
                    alt="Foto de perfil"
                    width={20}
                    height={20}
                    className="rounded-full me-2"
                  />
                  <p className="text-gray-500">
                    <span className="text-sky-500 font-bold">{notification.author.name}</span>{" "}
                    respondio a tu publicación
                  </p>
                </article>
              </Link>
            ))}
          </>
        )}
      </section>
    </section>
  );
}

export default Page;
