import AccountProfile from "@/components/forms/AccountProfile";
import { currentUser } from "@clerk/nextjs";

export default async function Page() {
    const user = await currentUser();
  return(
    <main className="px-40 py-20 tracking-wide">
        <h1 className="text-5xl font-bold mb-2 ">Ultimo paso</h1>
        <p className="text-xl font-semibold">Completa tu perfil para poder continuar con X-clone</p>
        <section className="my-10 p-10 bg-[#16181C]"> 
            <AccountProfile/>
        </section>
    </main>
  );
}