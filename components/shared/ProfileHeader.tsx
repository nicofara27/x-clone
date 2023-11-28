"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { followUser, unfollowUser } from "@/lib/actions/user.actions";
import { usePathname } from "next/navigation";

interface Props {
  profileUserId: string;
  currentUserId: string;
  name: string;
  username: string;
  img: string;
  bio: string;
  isFollowing: boolean;
}
const ProfileHeader = ({
  profileUserId,
  currentUserId,
  name,
  username,
  img,
  bio,
  isFollowing,
}: Props) => {
  const path = usePathname();
  const follow = async () => {
    if (!isFollowing) {
      await followUser(
        JSON.parse(currentUserId),
        JSON.parse(profileUserId),
        path
      );
    } else {
      await unfollowUser(
        JSON.parse(currentUserId),
        JSON.parse(profileUserId),
        path
      );
    }
  };
  return (
    <div className="w-full">
      <div className="relative">
        <div className="absolute h-48 w-full ">
          <Image src={img} alt="Profile" fill />
        </div>
        <div className="relative h-32 w-32 -right-4 top-32">
          <Image
            className="rounded-full border-4 border-gray-100 "
            src={img}
            alt="Profile"
            fill
          />
        </div>
      </div>
      <div className="flex justify-end mt-20 me-4">
        <Button
          className={`rounded-full font-semibold ${
            isFollowing
              ? "before:content-['Siguiendo'] hover:before:content-['Dejar'] bg-[#000] border w-[144px] hover:bg-[#190304] hover:text-red-500 hover:border-red-500 "
              : "before:content-['Seguir'] bg-gray-100 hover:bg-gray-200 text-[#111]"
          }`}
          onClick={follow}
        ></Button>
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
