import UserCard from "@/components/cards/UserCard";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function Page() {
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    if(!userInfo?.onboarded) redirect('/onboarding');

    const result = await fetchUsers({
        userId: user.id,
        searchString: '',
    });
    return (
        <section className="my-4">
            {result.length === 0 ? (
                <h2>No se encontro ningun usuario</h2>
            ): (
                <>
                {result.map((user) => (
                    <UserCard
                        key={user.id}
                        id={user.id}
                        name={user.name}
                        username={user.username}
                        img={user.img}
                    />
                ))}
                </>
            )}
        </section>
    )
}

export default Page;