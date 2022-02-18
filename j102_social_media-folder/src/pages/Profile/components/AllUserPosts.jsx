import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const AllUserPosts = (props) => {
  const [posts, setPosts] = useState([]);
  const [postsCount, setPostsCount] = useState(0);
  const fetchUserPosts = () => {
    fetch(`http://localhost:1337/posts?user=${props.user.id}`, {
      method: "get",
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setPosts(response);
      });
  };

  useEffect(() => {
    fetch(`http://localhost:1337/posts/count?user=${props.user.id}`, {
      method: "get",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("COUNTER", response);
        setPostsCount(response);
      })
      .catch((error) => {
        console.log("An error occurred: in count", error);
      });
  }, []);

  useEffect(() => {
    fetchUserPosts();
  }, []);

  return (
    <>
      Auteur de {postsCount} poste(s).
      {posts.map((post) => (
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
    </>
  );
};

// const t  = {
//   loading: false,
//   posts: {
//     "/posts": [],
//     "/posts?user=4": [3],
//     "/posts?page=2": [{id: 3, likes: 4}]
//   },

//   normalizedPosts: {
//     3: {
//       id: 3,
//       likes: 4
//     }
//   }
// }
