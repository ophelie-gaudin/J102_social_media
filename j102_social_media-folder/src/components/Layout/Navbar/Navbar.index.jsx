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
    <header className="Navbar w-full">
      <nav className="flex justify-around py-4 items-center">
        <h1 className="text-center font-piou text-blue-300 text-3xl">
          Piou Piou <br />
          <span className="font-land text-yellow-200">LAND</span>
        </h1>
        <ul className="flex w-[70%] justify-around flex-row">
          <li>
            <Link
              className="text-blue-300 hover:text-yellow-200 font-land "
              to="/"
            >
              Accueil
            </Link>
          </li>

          {!!currentUser ? (
            <>
              <li>
                <Link
                  to="profile"
                  className="text-blue-300 hover:text-yellow-200 font-land "
                >
                  Profile
                </Link>
              </li>

              <li>
                <button
                  className="text-blue-300 hover:text-yellow-200 font-land "
                  onClick={logout}
                >
                  Log out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="login"
                  className="text-blue-300 hover:text-yellow-200 font-land "
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="register"
                  className="text-blue-300 hover:text-yellow-200 font-land "
                >
                  Registration
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
