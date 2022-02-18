// galement, si l'utilisateur s'est déconnecté, il a accès à une page /login, où celui-ci peut se connecter s'il a déjà un compte.
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../../pages/Register/Register.index";
import { LOGOUT_SUCCESS } from "../../../redux/actions/login.actions";

export const useLogout = () => {
  const dispatch = useDispatch();

  const logout = () => dispatch({ type: LOGOUT_SUCCESS });

  return logout;
};

const Navbar = () => {
  const currentUser = useCurrentUser();
  const logout = useLogout();

  return (
    <header className="Navbar">
      <nav className="flex justify-around">
        <h1>LOGO</h1>
        <ul className="flex w-[70%] justify-around flex-row">
          <li>
            <Link to="/">Accueil</Link>
          </li>

          {!!currentUser ? (
            <>
              <li>
                <Link to="profile">Profile</Link>
              </li>

              <li>
                <button onClick={logout}>Log out</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="login">Login</Link>
              </li>
              <li>
                <Link to="register">Registration</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
