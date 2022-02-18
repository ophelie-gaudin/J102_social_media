import { createStore, combineReducers } from "redux";
import { login } from "./reducers/login.reducer";
import { posts } from "./reducers/posts.reducer";

// (6) création d'un store Redux avec comme reducer TodoReducer
// 2e argument : permet de faire fonctionner l'outil de
// débug Redux DevTools sur le navigateur
export default createStore(
  combineReducers({ login, posts }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
