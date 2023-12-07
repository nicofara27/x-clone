"use server"

import { revalidatePath } from "next/cache"
import User from "../models/user.model"
import { connectToDB } from "../mongoose"
import Post from "../models/post.model";
import { FilterQuery, SortOrder } from "mongoose";

interface Params {
  userId: string;
  username: string;
  name: string;
  bio: string;
  img: string;
  path: string;
}
export async function updateUser({
  userId,
  bio,
  name,
  path,
  username,
  img,
}: Params): Promise<void> {
  try {
    connectToDB();

    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        name,
        bio,
        img,
        onboarded: true,
      },
      { upsert: true }
    );

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Error al crear o editar el usuario: ${error.message}`);
  }
}

export async function fetchUser(userId: string) {
  try {
    connectToDB();

    return await User.findOne({ id: userId });
  } catch (error) {
    throw new Error(`Error al traer el usuario: ${error}`);
  }
}

export async function fetchUserPosts(userId: string, category: string) {

  try {
    connectToDB();

    const posts = await User.findOne({ id: userId })
      .populate({
        path: "posts",
        model: Post,
        populate: ({
          path: "children",
          model: Post,
          populate: ({
            path: "author",
            model: User,
            select: "id name img"
          })
        })
      })
      .populate({
        path: "reposts",
        populate: ({
          path: "repost",
          model: Post,
          populate: ({
            path: "children",
            model: Post,
            populate: ({
              path: "author",
              model: User,
              select: "id name img"
            })
          })
        })
      })
      .populate({
        path: "comments",
        model: Post,
        populate: ({
          path: "children",
          model: Post,
          populate: ({
            path: "author",
            model: User,
            select: "id name img"
          })
        })
      })

    return posts;
  } catch (error) {
    throw new Error(`Error al traer los posts del usuario: ${error}`);
  }
}

export async function fetchUsers({
  userId,
  searchString = "",
  sortBy = "desc"
}: {
  userId: string;
  searchString?: string;
  sortBy?: SortOrder
}) {
  try {
    connectToDB();

    const regex = new RegExp(searchString, "i");

    const query: FilterQuery<typeof User> = {
      id: { $ne: userId },
    }

    if (searchString.trim() !== "") {
      query.$or = [
        { username: { $regex: regex } },
        { name: { $regex: regex } }
      ]
    }

    const users = await User.find(query).sort({ createdAt: sortBy })

    return users;
  } catch (error: any) {
    throw new Error(`Error al traer los usuarios: ${error}`);
  }
}

export async function getNotifications(userId: string) {
  try {
    connectToDB();

    const userPosts = await Post.find({ author: userId });

    const childPostsIds = userPosts.reduce((acc, userPost) => {
      return acc.concat(userPost.children)
    }, [])


    const replies = await Post.find({
      _id: { $in: childPostsIds },
      author: { $ne: userId }
    }).populate({
      path: "author",
      model: User,
      select: "_id name img"
    })

    return replies;

  } catch (error: any) {
    throw new Error(`Error al traer las notificaciones: ${error}`);
  }
}

export async function followUser(currentUser: string, targetUser: string, path: string) {

  try {
    connectToDB();
    await User.findByIdAndUpdate(currentUser, {
      $addToSet: { following: targetUser }
    })
    await User.findByIdAndUpdate(targetUser, {
      $addToSet: { followers: currentUser }
    })
    revalidatePath(path);
  } catch (error) {
    throw new Error(`Error al intentar seguir al usuario: ${error}`)
  }
}

export async function unfollowUser(currentUser: string, targetUser: string, path: string) {
  try {
    connectToDB();
    await User.findByIdAndUpdate(currentUser, {
      $pull: { following: targetUser }
    })
    await User.findByIdAndUpdate(targetUser, {
      $pull: { followers: currentUser }
    })
    revalidatePath(path);
  } catch (error) {
    throw new Error(`Error al intentar dejar de seguir al usuario: ${error}`)
  }
}