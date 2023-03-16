import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
  } from "@mui/icons-material";
  import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
  
  import FlexBetween from "../../components/FlexBetween.jsx";
  import Friend from "../../pages/widgets/Friend.jsx"
  import { useEffect, useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setPost } from "../../states/context.js";
  import axios from "axios"
  const SinglePost = ({
    postID,
    postUserID,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
  }) => {
    const [isComments, setIsComments] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const loggedInUser = useSelector((state) => state.auth.user);
    const isLiked = Boolean(likes[loggedInUser._id]);
    const likeCount = Object.keys(likes).length;
  
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;
    const URL = "http://127.0.0.1:5000";
  
    const changeLikeOption = async () => {
      const likeData = JSON.stringify({
        userID: loggedInUser._id
      })
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      try{
        const api = axios.create({
          baseURL: URL
        })
  
        const {data} = await api.patch(`/posts/${postID}/like`,likeData ,config)
        if(data){
          dispatch(setPost({post: data}))
        }
      }
      catch(error){
        console.log(error.message)
      }
  

    }


    return (
      <div style={{margin:"2rem"}}>
        <Friend
          friendID={postUserID}
          name={name}
          subtitle={location}
          userPicturePath={userPicturePath}
        />
        <Typography color={main} sx={{ mt: "1rem" }}>
          {description}
        </Typography>
        {picturePath && (
          <img
            width="100%"
            height="auto"
            alt="post"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            src={picturePath.url}
          />
        )}
        <FlexBetween mt="0.25rem">
          <FlexBetween gap="1rem">
            <FlexBetween gap="0.3rem">
              <IconButton onClick={changeLikeOption}>
                {isLiked ? (
                  <FavoriteOutlined sx={{ color: primary }} />
                ) : (
                  <FavoriteBorderOutlined />
                )}
              </IconButton>
              <Typography>{likeCount}</Typography>
            </FlexBetween>
  
            <FlexBetween gap="0.3rem">
              <IconButton onClick={() =>{
                setIsComments(!isComments)  
              }}>
              
                <ChatBubbleOutlineOutlined />
              </IconButton>
              <Typography>{comments.length}</Typography>
            </FlexBetween>
          </FlexBetween>
  
          <IconButton>
            <ShareOutlined />
          </IconButton>
        </FlexBetween>
 
        {isComments && (
          
          <Box mt="0.5rem">
            
            {comments.map((comment, i) => (
                     
              <Box key={`${name}-${i}`}>
                <Divider />
                <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                  {comment}
                </Typography>
              </Box>
            ))}
            <Divider />
          </Box>
        )}
      </div>
    );
  };
  
  export default SinglePost;