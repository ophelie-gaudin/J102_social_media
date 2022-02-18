// galement, si l'utilisateur s'est déconnecté, il a accès à une page /login, où celui-ci peut se connecter s'il a déjà un compte.
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import Navbar from "./Navbar/Navbar.index";
import { useSuccessLogin } from "../../pages/Register/Register.index";

const Layout = (props) => {
  const successLogin = useSuccessLogin();

  // * permet l'authentification auto lors d'une nouvelle visite de l'user
  useEffect(() => {
    // check si cookie existe
    const token = Cookies.get("token");

    if (token) {
      // si oui, fetch me

      fetch("http://localhost:1337/users/me", {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          successLogin(response, token);
        })
        .catch((error) => {
          // si marche pas, delete cookie et go login

          console.log("An error occurred:", error.response);
          Cookies.remove("token");
        });
    }
  }, []);

  return (
    <div className="Layout flex flex-col">
      <Navbar />
      <div className="bg-blue-200 !min-h-[100vh]">{props.children}</div>
    </div>
  );
};

export default Layout;
