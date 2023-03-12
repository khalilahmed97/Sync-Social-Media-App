import React, { useState } from 'react'
import axios from "axios"
import { Box, Button, TextField, useMediaQuery, Typography, useTheme } from "@mui/material"

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setLogin } from ".././states/context.js"
import Dropzone from "react-dropzone"
import FlexBetween from './FlexBetween.jsx'


const Form = () => {

  const [formType, setFormType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isDesktopScreen = useMediaQuery("(min-width:600px")

  const isLogin = (formType === "login");
  const isRegister = (formType === "register");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [location, setLocation] = useState("");
  const [occupation, setOccupation] = useState("");
  const [picture, setPicture] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const URL = "http://127.0.0.1:5000"

  const login = async () => {
    const config = {
      headers: {
        'content-type': 'application/json',
      }
    }
    const userData = JSON.stringify({
      email: email,
      password: password,
    })
    try{
      const api = axios.create({
        baseURL: URL,
      })
  
      const {data} = await api.post("/auth/login", userData, config)
      if(data){
        dispatch(
          setLogin({
            user: data.user,
            token: data.token
          })
        )
        navigate("/home")
      }
     
      
  
      
    }
    catch(error){
      console.log(error.message)
    }

  }


  const register = async () => {
    setPicture(document.getElementById("image").files[0].name);
    const config = {
      headers: {
        'content-type': 'application/json',
      }
    }
   const formData = new FormData();

   formData.append("firstName", firstName)
   formData.append("lastName", lastName)
   formData.append("location", location)
   formData.append("occupation", occupation)
   formData.append("picturePath", picture)
   formData.append("email", email)
   formData.append("password", password)
    
    try{
      const api = axios.create({
        baseURL: URL,
      })
  
      const data= await api.post("/register",formData, config)
  
      console.log(data)
    }
    catch(error){
      console.log(error.response.data)
    }
  }

  const submitForm = () => {


    if (isLogin){
       login();
    } 
    if(isRegister){
       register();

  }
}


  return (
  
        <form action="/register" encType='multipart/form-data' onSubmit={(e) => e.preventDefault()}>
          <Box
            width={"100%"}
            display="flex"
            flexDirection={"column"}
            gap="1rem"
          >
            {isRegister && (

            <Box>

            <Box
            display={"flex"}
            justifyContent="space-between"
            marginBottom={2}>
              
              <TextField
                label="First Name"
                value={firstName}      
                onChange={(e) => setFirstName(e.target.value)}          
                sx={{ width: "49%" }}
                required
              />
              <TextField
                label="Last Name"
                value={lastName}   
                onChange={(e) => setLastName(e.target.value)}    
                sx={{ width: "49%" }}
                required
              />
              </Box>


              
            <Box
            display={"flex"}
            justifyContent="space-between"
            marginBottom={2}>
                <TextField
                  label="Location"
                  onChange={(e) => setLocation(e.target.value)}    
                value={location}
                  sx={{ width: "49%" }}
                  required
                />
                <TextField
                  label="Occupation"
                  onChange={(e) => setOccupation(e.target.value)}    
                value={occupation}
                  sx={{ width: "49%" }}
                  required
                />
              </Box>


              <Box
                width={"100%"}
                gridColumn="span"
                border={`1px solid ${palette.neutral.medium}`}
                borderRadius="5px"
                p="1rem"
              >
                {/* <Dropzone
                  acceptedFiles=".jpg,.jpeg,.png"
                  multiple={false}
                  
                  onDrop={(acceptedFiles) =>
                    setPicture(["picture", acceptedFiles[0]])
                  }
                > */}
                <input type="file" id="image" name='image'/>
                  {/* {({ getRootProps, getInputProps }) => (
                    <Box
                      {...getRootProps()}
                      border={`2px dashed ${palette.primary.main}`}
                      p="1rem"
                      sx={{ "&:hover": { cursor: "pointer" } }}
                    >
                      {!picture ? (
                        <p>Add Picture Here</p>
                      ) : (
                        <FlexBetween>
                          <Typography>{picture["pic"]}</Typography>
                          <EditOutlinedIcon />
                        </FlexBetween>
                      )}
                    </Box>
                  )} */}
                {/* </Dropzone> */}
              </Box>
            </Box>
            )}


            <TextField
              sx={{ width: "100%" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}    
              label="Email"
              required
          
            />
            <TextField
              sx={{ width: "100%" }}
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}    
              type="password"
              required
       
            />
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
                
              }}
              onClick={submitForm}
            >
              {isLogin ? "login" : "register"}
            </Button>
            <Typography
              onClick={() => {
                setFormType(isLogin ? "register" : "login");
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
  )
}

export default Form