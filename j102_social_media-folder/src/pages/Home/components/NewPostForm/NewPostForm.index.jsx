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
    <div className="NewPostForm my-6 w-[50%]">
      <h3 className="mb-4 font-land text-white text-lg">
        Poster un nouveau message :
      </h3>

      <form id="new-post-form" onSubmit={handleSubmit} className="w-full">
        <textarea
          id="content"
          type="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-[50%]"
        />{" "}
        <br />
        <button
          type="submit"
          className="py-2 px-6 bg-yellow-200 text-white my-8 rounded-xl font-land text-xl"
        >
          Je publie
        </button>
      </form>
    </div>
  );
};

export default NewPostForm;
