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

    await Post.updateMany({ parentId: { $in: [null, undefined] } }
        , {
            $inc: { "stats.views": 1 }
        }
    )

    return response;
}

export async function fetchPostsById(id: string) {
    connectToDB();
    try {
        const response = await Post.findById(id)
            .populate({ path: "author", model: User, select: "_id id name username img" })
            .populate({
                path: "children",
                populate: [{
                    path: "author",
                    model: User,
                    select: "_id id name username parentId img"
                },
                {
                    path: "children",
                    model: Post,
                    populate: {
                        path: "author",
                        model: User,
                        select: "_id id name username parentId img"
                    }
                }
                ]
            })

        await Post.findByIdAndUpdate(id, {
            $inc: { "stats.inDetail": 1, "stats.views": 1, "stats.interactions": 1 }
        });

        return response;
    } catch (error: any) {
        throw new Error(`Error al traer el post: ${error}`)
    }
}

export const addComment = async (postId: string, commentText: string, userId: string, path: string) => {
    connectToDB();
    try {
        const originalPost = await Post.findById(postId);
        if (!originalPost) {
            throw new Error("Post no encontrado");
        }
        const userComment = await User.findById(userId);

        const commentPost = await Post.create({
            text: commentText,
            author: userId,
            parentId: postId
        })

        const savedCommentPost = await commentPost.save();
        originalPost.children.push(savedCommentPost._id);
        userComment.comments.push(savedCommentPost._id);

        await originalPost.save();
        await userComment.save();

        await Post.findByIdAndUpdate(postId, {
            $inc: { "stats.interactions": 1 }
        })

        revalidatePath(path);
    } catch (error) {
        throw new Error(`Error al crear el comentario: ${error}`)
    }
}
export const addRepost = async (postId: string, repostText: string, userId: string, path: string) => {
    connectToDB();
    try {
        const originalPost = await Post.findById(postId);
        if (!originalPost) {
            throw new Error("Post no encontrado");
        }
        const userPost = await User.findById(userId);
        if (!userPost) {
            throw new Error("Autor del post no encontrado");
        }

        if (userPost.reposts.includes(originalPost._id)) {
            throw new Error("El post ya ha sido repostado")

        }

        userPost.reposts.push({
            repost: originalPost._id,
        });
        originalPost.reposts.push(postId);

        await originalPost.save();
        await userPost.save();

        await Post.findByIdAndUpdate(postId, {
            $inc: { "stats.interactions": 1 }
        })

        revalidatePath(path);
    } catch (error) {
        throw new Error(`Error al crear el repost: ${error}`)
    }
}

export const addLike = async (postId: string, userId: string, path: string) => {
    connectToDB();
    try {
        await Post.findByIdAndUpdate(postId, {
            $addToSet: { likes: userId }
        })
        await User.findByIdAndUpdate(userId, {
            $addToSet: { likes: postId }
        })

        await Post.findByIdAndUpdate(postId, {
            $inc: { "stats.interactions": 1 }
        })

        revalidatePath(path)
    } catch (error) {
        throw new Error(`Error al dar like: ${error}`)
    }
}

export const fetchPostData = async (postId: string) => {
    try {
        connectToDB();
        const response = await Post.findById(postId)
            .select("id likes reposts")
            .populate({
                path: "likes",
                model: User,
                select: "id name img"
            })
        return response;
    } catch (error) {
        throw new Error(`Error al traer los likes: ${error}`)
    }
}