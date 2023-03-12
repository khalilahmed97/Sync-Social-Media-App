import { Box, Typography, useTheme } from "@mui/material";
import Friend from "./Friend.jsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../../states/context.js";

const FriendListWidget = ({ userID }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.auth.token);
  const friends = useSelector((state) => state.auth.user.friends);

  const getFriends = async () => {

    try{
      const response = await fetch(
        `http://localhost:5000/user/${userID}/friends`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      dispatch(setFriends({ friends: data }));
    }
    catch(err){
      console.log(err.response.data)
    }
    console.log(friends)
    
  };

  useEffect(() => {
    getFriends();
  }, []);

  return (
    <>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
    </>
  );
};

export default FriendListWidget;