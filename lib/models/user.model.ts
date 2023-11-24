import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id:{type:String, required:true},
    username:{type:String, required:true, unique:true},
    name:{type:String, required:true},
    img: String,
    bio: String,
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ],
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
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