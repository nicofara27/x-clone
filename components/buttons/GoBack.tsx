"use client"
import Image from "next/image"
import { useRouter } from "next/navigation";

const GoBack = ({ title, postsNumber }: { title: string, postsNumber?: number }) => {
    const router = useRouter();
    
    return (
        <section className="flex gap-8 items-baseline p-3 hover:cursor-pointer" >
            <button className="hover:bg-gray-500 opacity-80 rounded-full p-2 self-start" onClick={() => router.back()}>
                <Image src="/assets/back.svg" alt="back" width={16} height={16} />
            </button>
            <div className="pt-1 font-bold">
                <h2>{title}</h2>
            {
                postsNumber && (
                    <p className="text-gray-500 text-xs font-light">{postsNumber} posts</p>
                )
            }
            </div>
        </section>
    )
}

export default GoBack