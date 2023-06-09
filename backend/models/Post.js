import mongoose from "mongoose"

const PostSchema = mongoose.Schema(
    {
        userID:{
            type: String,
            required: true,

        },
        firstName:{
            type: String,
            required: true,

        },
        lastName:{
            type: String,
            required: true,

        },
        location: String,
        description: String,
        picturePath:{
            public_id: String,
            url: String
        },
        userPicturePath: String,
        likes:{
            type: Map,
            of: Boolean
        },
        comments:{
            types: Array,
            default: []
        },

    },
    {timestamps: true}
);

const Post = mongoose.model("Post", PostSchema);

export default Post
