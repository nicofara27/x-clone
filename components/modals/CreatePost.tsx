import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import Post from "../forms/Post";

const CreatePost = ({ userId }: { userId: string }) => {
  return (
    <Dialog>
      <DialogTrigger className="w-3/4 flex justify-center gap-2 bg-sky-500 rounded-full py-3 hover:bg-sky-600 text-xl">
        <Image src="/assets/add.svg" alt="Logo" width={24} height={24} />
        <p className="max-lg:hidden">Postear</p>
      </DialogTrigger>
      <DialogContent className="bg-black">
        <DialogHeader>
          <DialogTitle>
            <button className="text-sky-500">Borradores</button>
          </DialogTitle>
        </DialogHeader>
        <div>
          <Post userId={userId} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
