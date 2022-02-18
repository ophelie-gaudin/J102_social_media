import React from "react";
// import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  POSTS_START_FETCH,
  POSTS_SUCCESS_FETCH,
} from "../../../../redux/actions/posts.actions";

const Feed = () => {
  const dispatch = useDispatch();

  const postsStore = useSelector((state) => {
    return state.posts;
  });

  const loadPosts = () => {
    dispatch({ type: POSTS_START_FETCH });

    fetch("http://localhost:1337/posts", {
      method: "get",
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch({ type: POSTS_SUCCESS_FETCH, payload: { posts: response } });
        console.log(response);
      });
  };

  useEffect(() => {
    loadPosts();
    // fetchAPI();
    // getPosts();
  }, []);

  // const getProfile = () => {
  //   fetch("http://localhost:1337/posts", {
  //     method: "get",
  //     headers: {
  //       Authorization: `Bearer ${userCookie}`,
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((response) => {
  //       data(response);
  //       console.log(response);
  //       const posts = response;
  //     });
  // };

  console.log("postsStore", postsStore);
  return (
    <div>
      {postsStore.loading && "Chargement"}
      {postsStore.posts.map((post) => (
        <div key={post.id}>
          <h3>
            <Link to={"profile/" + post.user.id}>{post.user.username}</Link> a
            partagé :
          </h3>
          <p>{post.text}</p>
          <p>
            Le {post.updated_at} et a obtenu {post.like} pioupious
          </p>
        </div>
      ))}
    </div>
  );
};

export default Feed;

// const fetchAPI = () => {
//   fetch("http://localhost:1337/", {
//     method: "get",
//     headers: {
//       Authorization: `Bearer ${userCookie}`,
//       "Content-Type": "application/json",
//     },
//   })
//     .then((response) => response.json())
//     .then((response) => {
//       data(response);
//       console.log(response);
//     });
// };
