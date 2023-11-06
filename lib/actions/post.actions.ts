"use server";
import { revalidatePath } from "next/cache";
import Post from "../models/post.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose"

interface Params {
    text: string,
    author: string,
    communityId: string | null,
    path: string
}
export async function addPost({ text, author, communityId, path }: Params) {
    try {
        connectToDB();

        const addPost = await Post.create({
            text,
            author,
            community: null
        })
        await User.findByIdAndUpdate(author, {
            $push: { posts: addPost._id }
        })

        revalidatePath(path);
    } catch (error: any) {
        throw new Error(`Error al crear el post: ${error}`)
    }
}

export async function fetchPosts() {
    connectToDB();

     const response = await Post.find({ parentId: { $in: [null, undefined] } })
        .sort({ createdAt: "desc" })
        .populate({ path: "author", model: User })
        .populate({
            path: "children",
            populate: {
                path: "author",
                model: User,
                select: "_id name parentId image"
            }
        })

        return response;
}