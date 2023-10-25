import Image from "next/image";
import Link from "next/link";

const Menu = () => {
    return (
        <nav className="fixed top-0 z-30 w-full flex items-center justify-between px-4 py-2">
          <button className="md:hidden w-[33%] text-start">
            usuario
          </button>
          <Link href="/" >
            <Image src="/assets/logo.svg" alt="Logo" width={72} height={72} />
          </Link>
          <div className="w-[33%]">
          </div>
        </nav>
    );
};

export default Menu;