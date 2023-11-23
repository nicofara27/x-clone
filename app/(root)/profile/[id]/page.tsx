import PostsTab from "@/components/shared/PostsTab";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(params.id);
  if (!userInfo?.onboarded) redirect("/onboarding");
  
  return (
    <>
      <ProfileHeader
        accountId={params.id}
        authUserId={user.id}
        name={userInfo.name}
        username={userInfo.username}
        img={userInfo.img}
        bio={userInfo.bio}
      />
      <div>
        <Tabs defaultValue="posts" className="mt-4 border-b">
            <TabsList className="w-full bg-[#000] justify-between px-4 border-b rounded-none" >
                {profileTabs.map((tab, i) => (
                    <TabsTrigger key={i} value={tab.value}>
                        {tab.label}
                    </TabsTrigger>
                ))}
            </TabsList>
            {profileTabs.map((tab) => (
                <TabsContent key={`tab-${tab.label}`} value={tab.value} className="mt-0">
                    <PostsTab currentUserId={userInfo._id} accountId={userInfo.id} accountType="user"/>
                </TabsContent>
            ))}
        </Tabs>
      </div>
    </>
  );
}

export default Page;
