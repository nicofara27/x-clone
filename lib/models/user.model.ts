import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    img: String,
    bio: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ],
    likes: [
        {
            _id: false,
            like: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Post"
            },
            likedAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ],
    reposts: [
        {
            _id: false,
            repost: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Post"
            },
            repostedAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    onboarded: {
        type: Boolean,
        default: false
    },
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]

});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;