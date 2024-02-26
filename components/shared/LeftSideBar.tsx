"use client";
import { menuLinks } from "@/constants";
import { SignedIn, UserButton, useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CreatePost from "../modals/CreatePost";

const LeftSideBar = () => {
  const pathname = usePathname();
  const { userId } = useAuth();
  return (
    <section className="sticky left-0 top-0 z-20 h-[calc(100vh-2rem)] w-[15%] lg:w-[22.5%] py-4 flex flex-col border-r border-gray-700 max-md:hidden">
      <Link href="/">
        <Image
          className="rounded-full mx-auto lg:mx-0"
          src="/assets/logo.svg"
          alt="Logo"
          width={72}
          height={72}
        />
      </Link>
      <div className="w-full flex flex-col items-center lg:items-start gap-6 p-3 text-xl">
        {menuLinks.map((link, index) => {
          const isActive =
            (pathname.includes(link.url) && link.url.length > 1) ||
            pathname === link.url;

          if (link.url === "/profile") link.url = `${link.url}/${userId}`;

          return (
            <Link
              href={link.url}
              key={index}
              className={`flex gap-2 p-2 rounded-full hover:font-semibold ${
                isActive && "bg-gray-800 tracking-wider"
              }`}
            >
              <Image src={link.logo} alt={link.nombre} width={24} height={24} />
              <p className="max-lg:hidden">{link.nombre}</p>
            </Link>
          );
        })}
        {/* <CreatePost /> */}
      </div>
      <div className="mt-auto mb-2 lg:ps-4 text-center">
        <SignedIn>
          <UserButton
            showName={true}
            afterSignOutUrl="/"
            appearance={{
              elements: {
                rootBox: "max-lg:mx-auto",
                userButtonBox: {
                  flexDirection: "row-reverse",
                },
                userButtonOuterIdentifier:
                  "max-lg:hidden  text-slate-200 font-bold",
              },
            }}
          />
        </SignedIn>
      </div>
    </section>
  );
};

export default LeftSideBar;
