import React from 'react'
import {PersonAddOutlined, PersonRemoveOutlined} from "@mui/icons-material"
import { Box, IconButton, Typography, useTheme } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import {setFriends} from "../../states/context.js"
import FlexBetween from "../../components/FlexBetween.jsx"
import UserImage from "../../components/UserImage.jsx"
import {useNavigate} from "react-router-dom"
const Friend = ({ friendID, name, subtitle, userPicturePath}) => {
    const URL = "http://127.0.0.1:5000";

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { _id } = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);
    const friends = useSelector((state) => state.auth.user.friends);

    const {palette} = useTheme();
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;
    
    // console.log(friendID)
    let isFriend;
    //  = friends.find((friend) => friend._id === friendID);
    for(let i=0; i<friends.length; i++){
      if(friends[i]._id === friendID){
        isFriend = friends[i];
      }
    }
    // console.log(friends)
    


    const updateFriend = async () => {

      try{
        const response = await fetch(
          `http://127.0.0.1:5000/user/${_id}/${friendID}`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        console.log(data)
        dispatch(setFriends({ friends: data }));
       
      }
      catch(error){
        console.log(error.response.data)
      }
      
  
    }
    

  return (
    <div>
<FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendID}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      <IconButton
        onClick={() => updateFriend()}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
        {isFriend ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        ) : (
          <PersonAddOutlined sx={{ color: primaryDark }} />
        )}
      </IconButton>
    </FlexBetween>
    </div>
  )
}

export default Friend