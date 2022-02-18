// galement, si l'utilisateur s'est déconnecté, il a accès à une page /login, où celui-ci peut se connecter s'il a déjà un compte.
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useSuccessLogin } from "../Register/Register.index";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const successLogin = useSuccessLogin();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:1337/auth/local",
      data: {
        identifier: email,
        password: password,
      },
      // headers: {
      //   Authorization: `Bearer ${token}`
      // }
    })
      .then((response) => {
        const me = response.data.user;
        const token = response.data.jwt;

        console.log("User profile", response.data.user);
        console.log("User token", response.data.jwt);

        successLogin(me, token);

        navigate("/");
      })
      .catch((error) => {
        console.log("An error occurred:", error.response);
      });
  };

  return (
    <div className="Login mb-2 bg-yellow-100 rounded p-4 w-[40%] mx-auto flex flex-col items-center justify-center">
      <h1 className="font-land text-3xl text-blue-300 my-6">Je me connecte</h1>

      <form id="register-form" onSubmit={handleSubmit}>
        <label htmlFor="email">
          Blazz' de poussin dans la place : <br />
          <input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />{" "}
          <br />
        </label>
        <br />
        <label htmlFor="password">
          Cuicui secret : <br />
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />{" "}
          <br />
        </label>

        <button
          type="submit"
          className="py-2 px-6 bg-blue-300 text-white my-8 rounded-xl font-land text-xl"
        >
          éclore
        </button>
      </form>
    </div>
  );
};

export default Login;
