import { menuLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";

const LeftSideBar = () => {
  return (
    <section className="sticky left-0 top-0 z-20 h-[calc(100vh-2rem)] w-[15%] lg:w-[25%] pt-8 flex flex-col border-r border-r-dark-4 max-md:hidden">
      <Image
        className="rounded-full hover:bg-gray-800 mx-auto lg:mx-0"
        src="/assets/logo.svg"
        alt="Logo"
        width={72}
        height={72}
      />
      <div className="w-full flex flex-col items-center lg:items-start gap-6 p-3 text-xl">
        {menuLinks.map((item, index) => (
          <Link
            href={item.url}
            key={index}
            className="flex gap-2 p-2 rounded-full hover:bg-gray-800"
          >
            <Image src={item.logo} alt={item.nombre} width={24} height={24} />
            <p className="max-lg:hidden">{item.nombre}</p>
          </Link>
        ))}
        <Link
          href="/"
          className="flex gap-2 bg-lime-500 rounded-full p-2 hover:bg-lime-600"
        >
          <Image src="/assets/add.svg" alt="Logo" width={24} height={24} />
          <p className="max-lg:hidden">Postear</p>
        </Link>
      </div>
    </section>
  );
};

export default LeftSideBar;
