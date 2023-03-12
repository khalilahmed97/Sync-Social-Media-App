import express from "express"
import {getUser, getUserFriends, addRemoveFriend} from "../controllers/userController.js"
import verifyToken from "../middleware/tokenAuth.js"
const router = express.Router()

// ROUTES FOR RETRIEVING DATA

router.route("/:id").get(verifyToken, getUser)
router.route("/:id/friends").get(verifyToken,getUserFriends)

// ROUTES FOR UPDATING DATA

router.route("/:id/:friendID").patch(verifyToken, addRemoveFriend)

export default router;