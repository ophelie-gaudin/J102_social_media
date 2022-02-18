// ur celle-ci, l'utilisateur pourra s'enregistrer grâce à un formulaire. Dès qu'il est enregistré, l'utilisateur est directement connecté avec son compte, il n'a pas besoin de passer par l'étape de connexion.
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  LOGIN_ATTEMPT,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
} from "../../redux/actions/login.actions";

const url = "http://localhost:1337/auth/local/register";

export const useCurrentUser = () =>
  useSelector((state) => {
    return state.login.user;
  });

export const useIsLoggingIn = () =>
  useSelector((state) => {
    return state.login.loggingIn;
  });

export const useAttemptLogin = () => {
  const dispatch = useDispatch();
  const attemptLogin = () => dispatch({ type: LOGIN_ATTEMPT });

  return attemptLogin;
};

export const useSuccessLogin = () => {
  const dispatch = useDispatch();

  const successLogin = (user, token) =>
    dispatch({ type: LOGIN_SUCCESS, payload: { user: user, token: token } });

  return successLogin;
};

export const useFailLogin = () => {
  const dispatch = useDispatch();

  const failLogin = () => {
    dispatch({ type: LOGIN_FAIL });
  };

  return failLogin;
};

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isLoggingIn = useIsLoggingIn();
  // const currentUser = useCurrentUser();
  const attemptLogin = useAttemptLogin();
  const successLogin = useSuccessLogin();
  const failLogin = useFailLogin();
  const navigate = useNavigate();

  console.log("isLoggingIn", isLoggingIn);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      username: name,
      email: email,
      password: password,
    };

    attemptLogin();

    fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((data) => data.json())
      .then((result) => {
        const me = result.user;
        const token = result.jwt;

        console.log("user", me);
        console.log("token", token);

        successLogin(me, token);

        // Redirect to home page
        navigate("/");

        alert(`Submitting Name ${name}`);
      })
      .catch((err) => {
        console.error(err);
        // TODO : dispatch a LOGIN_FAILED
        failLogin();
      });
  };

  return (
    <div className="Register">
      <h1>Je m'enregistre</h1>

      {isLoggingIn ? (
        "Chargement"
      ) : (
        <form id="register-form" onSubmit={handleSubmit}>
          <label htmlFor="name">
            Votre nom: <br />
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />{" "}
            <br />
          </label>
          <label htmlFor="email">
            Votre email: <br />
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />{" "}
            <br />
          </label>
          <label htmlFor="password">
            Votre password: <br />
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />{" "}
            <br />
          </label>
          <button type="submit">Je m'enregistre</button>
        </form>
      )}
    </div>
  );
};

export default Register;

// {
//   login: {
//     currentUser: null,
//     loggingIn: false,
//   }
// }
