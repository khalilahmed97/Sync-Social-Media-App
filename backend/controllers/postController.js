import Post from "../models/Post.js"
import User from "../models/User.js";
import cloudinary from "cloudinary"

const createPost = async (req, res) => {

    try{
        
        const { userID, description, image } = req.body;
        const user = await User.findById(userID);
        const cloud = await cloudinary.uploader.upload(image)
        const newPost = new Post({
            userID,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            picturePath: {
                public_id: cloud.public_id,
                url: cloud.secure_url,
            },
            likes: {},
            comments: []
        });

        await newPost.save();

        const post = await Post.find();
        res.status(200).json(post);
    }
    catch(error){
        res.status(400).json({message: error.message})
    }

}

const getFeedPosts = async (req, res) => {
    try{

        const post = await Post.find();
        res.status(200).json(post);
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
}

const getUserPosts = async (req, res) => {
    try{
        const { userID } = req.params;
        const post = await Post.find({ userID });
        res.status(200).json(post);
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
}

const likePost = async (req, res) => {
    try{
        const { id } = req.params;
        const { userID }= req.body;

        const post = await Post.findById(id);
        const isLiked = post.likes.get(userID);

        if(isLiked){
            post.likes.delete(userID);
        }
        else{
            post.likes.set(userID, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {likes: post.likes},
            { new: true}
        );

        res.status(200).json(updatedPost);
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
}
export {createPost, getFeedPosts, getUserPosts, likePost}