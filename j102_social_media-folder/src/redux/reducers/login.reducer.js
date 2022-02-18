import Cookies from "js-cookie";

import {
  LOGIN_SUCCESS,
  LOGIN_ATTEMPT,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
} from "../actions/login.actions";

export const loginInitialState = {
  user: null,
  loggingIn: false,
};

// state est le contenu précédent de la const login

export const login = (state = loginInitialState, action) => {
  switch (action.type) {
    case LOGIN_ATTEMPT:
      return { ...state, loggingIn: true };
    // prend l'état précédent et modifie ce qui suit (ici loggongIn)

    case LOGIN_SUCCESS:
      Cookies.set("token", action.payload.token);
      return { ...state, user: action.payload.user, loggingIn: false };

    case LOGIN_FAIL:
      return { ...state, loggingIn: false };

    case LOGOUT_SUCCESS:
      Cookies.remove("token");
      return loginInitialState;

    default:
      return state;
  }
};
