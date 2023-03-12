import React from 'react'
import { Box, Typography, useTheme, useMediaQuery} from "@mui/material";
import Form from '../../components/Form';
const LoginPage = () => {
  const theme = useTheme();
  const isDesktopScreen = useMediaQuery("(min-width: 1000px)") 
  return (
    <Box
      display={"flex"}
      flexDirection="column"
      alignItems={"center"}
    >
      <Box
        width={"100%"}
        backgroundColor={theme.palette.background.alt}
        padding="1rem 6%"
        textAlign={"center"}
      >
        <Typography fontWeight={"bold"} fontSize="32px" color={"primary"}>Sync Social</Typography>
      </Box>
      <Box
        display={"flex"}
        flexDirection="column"
        alignItems={"center"}
        width={isDesktopScreen ? "70%": "90%"}
        padding="2rem"
        margin={"2rem"}
        borderRadius="1rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography sx={{marginBottom:"1rem"}} fontWeight="500" variant='h5'>
          Welcome to Sync Social !
        </Typography>
        <Form />
      </Box>
    </Box>
  )
}

export default LoginPage