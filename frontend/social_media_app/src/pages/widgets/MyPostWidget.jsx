import React,{useState} from 'react'
import axios from 'axios';
import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";

import FlexBetween from '../../components/FlexBetween.jsx';
import Dropzone from "react-dropzone"
import UserImage from '../../components/UserImage.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setPost, setPosts } from '../../states/context.js';


const MyPostWidget = ({picturePath}) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");

  const {palette} = useTheme();
  const {_id} = useSelector((state) => state.auth.user)
  const token = useSelector((state) => state.auth.token)

  const isDesktopScreen = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;
  const URL = "http://127.0.0.1:5000"


  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      if (file && file.type.match('image.*')) {
        fileReader.readAsDataURL(file);
      }

      fileReader.onload = () => {
        resolve(fileReader.result)
      }

      
      fileReader.onerror = (error) => {
        reject(error)
      }

    })
  }

  const handlePost = async () => {
    const config = {
      headers:{
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }
    
    const pictureData = image ? image : image.name;
    const base64 = await convertBase64(pictureData)

    const postData = JSON.stringify({
      userID: _id,
      description: post,
      image: base64,
    })

    try{
      const api = axios.create({
        baseURL: URL,
      })
   
      const {data} = await api.post("/post", postData, config)
      if(data){
        console.log(data)
        dispatch(setPosts({posts: data }));
        setImage(null);
        setPosts("")
      }
    }
    catch(error){
      console.log(error.response.data)
    }
    
  }
  return (
    <div>
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Image
          </Typography>
        </FlexBetween>

        {isDesktopScreen ? (
          <>
            <FlexBetween gap="0.25rem">
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Clip</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attachment</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Audio</Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )}

        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "5px",
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </div>
  )
}

export default MyPostWidget