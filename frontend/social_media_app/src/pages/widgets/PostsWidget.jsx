import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import SinglePost from './SinglePost.jsx'
import { setPosts } from '../../states/context.js'
import axios from "axios"


const PostsWidget = ({ userID, isProfile = false }) => {
  const URL = "http://127.0.0.1:5000"
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.auth.posts)
  const token = useSelector((state) => state.auth.token)

  const getUserPosts = async () => {

    const config = {
      headers:{
        Authorization: `Bearer ${token}`
      }
    }
    const api = axios.create({
      baseURL: URL,

    })

    const {data} = await api.get(`/posts/${userID}/posts`, config)

    if(data) {
      console.log(data)
      dispatch(setPosts({posts: data}))
    }
  }


  const getPosts = async () => {

    const config = {
      headers:{
        Authorization: `Bearer ${token}`
      }
    }
    const api = axios.create({
      baseURL: URL,

    })

    const {data} = await api.get(`/posts`, config)

    if(data) {
      console.log(data)
      dispatch(setPosts({posts: data}))
    }
  }

  
  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []);

  return (
    <div>
      {posts.map(({
        _id, 
        userID,
        firstName,
        lastName,
        description,
        location,
        picturePath,
        likes,
        comments,
      }) => (
        <SinglePost 

        key={_id}
        postID={_id}
        postUserID={userID}
        name={`${firstName} ${lastName}`}
        description={description}
        location={location}
        picturePath={picturePath}
        userPicturePath={picturePath}
        likes={likes}
        comments={comments}

        />
      ))}
    </div>
  )
}

export default PostsWidget