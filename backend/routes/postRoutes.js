import express from "express"
import verifyToken from "../middleware/tokenAuth.js";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/postController.js";
const router = express.Router()

// RETRIEVE POSTS
router.route("/", verifyToken).get(getFeedPosts)
router.route("/:userID/posts", verifyToken).get(getUserPosts)

// UPDATE POSTS

router.route("/:id/like", verifyToken).patch(likePost)

export default router;