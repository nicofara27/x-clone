import Image from "next/image";
import { Button } from "../ui/button";

interface Props {
    accountId: string;
    authUserId: string;
    name: string;
    username: string;
    img: string;
    bio: string;
}
const ProfileHeader = ({ accountId, authUserId, name, username, img, bio }:Props) => {
  return (
    <div className="w-full">
      <div className="relative">
        <div className="absolute h-48 w-full ">
          <Image src={img} alt="Profile" fill />
        </div>
        <div className="relative h-32 w-32 -right-4 top-32">
          <Image className="rounded-full border-4 border-gray-100 " src={img} alt="Profile" fill />
        </div>
      </div>
      <div className="flex justify-end mt-20 me-4">
        <Button className=" bg-gray-100 rounded-full text-[#111] font-semibold hover:bg-gray-200">Seguir</Button>
      </div>
      <div className="mt-8 mx-4">
        <h2 className="text-xl font-bold">{name}</h2>
        <p className="text-sm text-gray-500">@{username}</p>  
      </div>
      <div className="mt-4 mx-4">
        <p>{bio}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
