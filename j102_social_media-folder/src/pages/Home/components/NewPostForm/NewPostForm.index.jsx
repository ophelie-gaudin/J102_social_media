import React from "react";
import { useState } from "react";
import Cookies from "js-cookie";
import { useCurrentUser } from "../../../Register/Register.index";

const NewPostForm = () => {
  const [content, setContent] = useState("");
  const me = useCurrentUser();

  const handleSubmit = (e) => {
    // axios
    //   .post("https://localhost:1337/auth/local", {
    //     email: email,
    //     password: password,
    //   })
    e.preventDefault();
    const data = {
      text: content,
      user: me.id,
    };

    fetch("http://localhost:1337/posts", {
      method: "post",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log("Content", response);
      })
      .catch((error) => {
        console.log("An error occurred:", error);
      });
  };

  return (
    <div className="NewPostForm">
      <h1>Poster un nouveau message :</h1>

      <form id="new-post-form" onSubmit={handleSubmit}>
        <label htmlFor="password">
          Votre message: <br />
          <textarea
            id="content"
            type="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />{" "}
          <br />
        </label>
        <button type="submit">Je publie</button>
      </form>
    </div>
  );
};

export default NewPostForm;
