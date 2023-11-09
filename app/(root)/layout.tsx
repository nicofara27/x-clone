import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Menu from "@/components/shared/Menu";
import LeftSideBar from "@/components/shared/LeftSideBar";
import RightSideBar from "@/components/shared/RightSideBar";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="es">
        <body className={inter.className}>
          <Menu />
          <main className="px-2 lg:px-24 py-20 md:py-0 flex justify-between">
            <LeftSideBar />
            <section className="w-full md:w-[75%] lg:w-[50%]">
              <div>{children}</div>
            </section>
            <RightSideBar />
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
