"use client"
import Image from "next/image"
import { Button } from "../ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Props {
    id: string
    name: string
    username: string
    img: string
}
const UserCard = ({id, name, username, img}:Props) => {
    const router = useRouter();
    return (
        <article className="flex justify-between items-center py-2 px-4 hover:bg-gray-800 hover:cursor-pointer" onClick={()=>router.push(`/profile/${id}`)}>
            <div className="flex flex-1 items-start justify-start gap-3">
                <Image src={img} alt="Foto de perfil" width={48} height={48} className="rounded-full"/>
                <div>
                    <Link href={`/profile/${id}`} className="font-semibold hover:underline">{name}</Link>
                    <p className="text-sm text-gray-500">@{username}</p>
                </div>
            </div>
            <Button className="bg-white text-black rounded-full hover:bg-gray-200 ">Seguir</Button>
        </article>
    )
}

export default UserCard;