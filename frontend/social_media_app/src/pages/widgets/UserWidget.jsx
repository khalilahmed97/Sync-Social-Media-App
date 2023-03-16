import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
  } from "@mui/icons-material";

import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "../../components/UserImage";
import FlexBetween from "../../components/FlexBetween";

  import { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { useSelector } from "react-redux";
  import axios from "axios";
  
  const UserWidget = ({ userId, picturePath }) => {
    const [user, setUser] = useState(null);
    const { palette } = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token);
    const userData = useSelector((state) => state.auth.user);
    const friends = useSelector((state) => state.auth.user.friends);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;

    const URL = "http://127.0.0.1:5000"


  
    const getUser = async () => {
      
      const config = {
        headers: {
          "content-type":"application/json",
            Authorization: `Bearer ${token}`
        }
      }
      try{
        const api = axios.create({
          baseURL: URL,
        })
    
        const response = await api.get(`user/${userData._id}`, config);
        if(response.data){
          console.log(response.data)
          setUser(response.data)
        
        }
      }
      catch(error){
        console.log(error.response.data)
      }

}
useEffect(() => {
  getUser();
  
}, [])

if(!user){
  return null;
}


return (
      <>
        {/* FIRST ROW */}
        <FlexBetween
          gap="0.5rem"
          pb="1.1rem"
          onClick={() => navigate(`/profile/${userId}`)}
        >
          <FlexBetween gap="1rem">
            <UserImage image={picturePath} />
            <Box>
              <Typography
                variant="h4"
                color={dark}
                fontWeight="500"
                sx={{
                  "&:hover": {
                    color: palette.primary.light,
                    cursor: "pointer",
                  },
                }}
              >
                {user.firstName} {user.lastName}
              </Typography>
              <Typography color={medium}>{friends.length} friends</Typography>
            </Box>
          </FlexBetween>
          <ManageAccountsOutlined />
        </FlexBetween>
  
        <Divider />
  
        {/* SECOND ROW */}
        <Box p="1rem 0">
          <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
            <LocationOnOutlined fontSize="large" sx={{ color: main }} />
            <Typography color={medium}>{user.location}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap="1rem">
            <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
            <Typography color={medium}>{user.occupation}</Typography>
          </Box>
        </Box>
  
        <Divider />
  
        {/* THIRD ROW */}
        <Box p="1rem 0">
          <FlexBetween mb="0.5rem">
            <Typography color={medium}>Who's viewed your profile</Typography>
            <Typography color={main} fontWeight="500">
              {user.viewedProfile}
            </Typography>
          </FlexBetween>
          <FlexBetween>
            <Typography color={medium}>Impressions of your post</Typography>
            <Typography color={main} fontWeight="500">
              {user.impressions}
            </Typography>
          </FlexBetween>
        </Box>
  
        <Divider />
  
        {/* FOURTH ROW */}
        <Box p="1rem 0">
          <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
            Social Profiles
          </Typography>
  
          <FlexBetween gap="1rem" mb="0.5rem">
            <FlexBetween gap="1rem">
            <TwitterIcon/> 
            <Box>
                <Typography color={main} fontWeight="500">
                  Twitter
                </Typography>
                <Typography color={medium}>Social Network</Typography>
              </Box>
            </FlexBetween>
            <EditOutlined sx={{ color: main }} />
          </FlexBetween>
  
          <FlexBetween gap="1rem">
            <FlexBetween gap="1rem">
              <LinkedInIcon />
              <Box>
                <Typography color={main} fontWeight="500">
                  Linkedin
                </Typography>
                <Typography color={medium}>Network Platform</Typography>
              </Box>
            </FlexBetween>
            <EditOutlined sx={{ color: main }} />
          </FlexBetween>
        </Box>
      </>
    );
  };
  
  export default UserWidget;