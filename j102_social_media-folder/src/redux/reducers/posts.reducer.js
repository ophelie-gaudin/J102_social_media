import {
  POSTS_START_FETCH,
  POSTS_SUCCESS_FETCH,
} from "../actions/posts.actions";

export const postsInitialState = {
  posts: [],
  loading: false,
};

// state est le contenu précédent de la const login

export const posts = (state = postsInitialState, action) => {
  switch (action.type) {
    case POSTS_START_FETCH:
      return { ...state, loading: true };
    // prend l'état précédent et modifie ce qui suit (ici loggongIn)

    case POSTS_SUCCESS_FETCH:
      return { ...state, loading: false, posts: action.payload.posts };

    default:
      return state;
  }
};
