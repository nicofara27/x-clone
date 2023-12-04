import mongoose from "mongoose";
import { number } from "zod";

const postSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  stats: {
    views: {
      type: Number,
      default: 0
    },
    interactions: {
      type: Number,
      default: 0
    },
    inDetail: {
      type: Number,
      default: 0
    }
  },
  parentId: {
    type: String,
  },
  originalPost: {
    type: String,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",

    },
  ],
  reposts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    }

  ],
  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});


const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;