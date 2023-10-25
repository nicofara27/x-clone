import Image from "next/image";
import Link from "next/link";

const Menu = () => {
    return (
        <nav className="md:hidden fixed top-0 z-30 w-full px-4 flex items-center justify-between border-b">
          <button className="w-[33%] text-start">
            usuario
          </button>
          <Link href="/" >
            <Image src="/assets/logo.svg" alt="Logo" width={60} height={60} />
          </Link>
          <div className="w-[33%]">
          </div>
        </nav>
    );
};

export default Menu;