export const LOGIN_SUBMIT_REQUSET = "auth/LOGIN_SUBMIT_REQUSET";
export const LOGIN_SUBMIT_SUCCESS = "auth/LOGIN_SUBMIT_SUCCESS";
export const LOGIN_SUBMIT_FAILURE = "auth/LOGIN_SUBMIT_FAILURE";

export const LOGOUT_REQUSET = "auth/LOGOUT_REQUSET";
export const LOGOUT_SUCCESS = "auth/LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "auth/LOGOUT_FAILURE";

export const GET_AUTH_TWITT_REQUEST = "auth/GET_AUTH_TWITT_REQUEST";
export const GET_AUTH_TWITT_SUCCESS = "auth/GET_AUTH_TWITT_SUCCESS";
export const GET_AUTH_TWITT_FAILURE = "auth/GET_AUTH_TWITT_FAILURE";

export const GET_AUTH = "auth/GET_AUTH";

const initialState = {
  login: { email: "", password: "" },
  isLogin: false,
  isLoading: false,
  hasTwitts: false,
  error: "",
  user: {
    id: "",
    email: "",
    username: "",
    profile: "",
    twitts: [],
    like: [],
  },
};

export const loginSubmit = (value) => ({
  type: LOGIN_SUBMIT_REQUSET,
  payload: { email: value.email, password: value.password },
});

export const logOut = () => ({
  type: LOGOUT_REQUSET,
});

export const getAuth = (user) => ({
  type: GET_AUTH,
  payload: user,
});

export const getAuthTwitt = (twitts) => ({
  type: GET_AUTH_TWITT_REQUEST,
  payload: twitts,
});

function auth(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUBMIT_REQUSET:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_SUBMIT_SUCCESS:
      return {
        ...state,
        isLogin: true,
        isLoading: false,
        error: "",
        user: {
          ...state.user,
          email: action.payload.user.email,
          id: action.payload.user.uid,
          username:
            action.payload.user.displayName ||
            action.payload.user.email.split("@")[0],
          profile: action.payload.user.photoUrl || "",
        },
      };
    case LOGIN_SUBMIT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case LOGOUT_REQUSET:
      return {
        ...state,
        isLoading: true,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLogin: false,
        user: action.payload,
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    case GET_AUTH:
      return {
        ...state,
        isLogin: true,
        user: {
          ...state.user,
          email: action.payload.email,
          id: action.payload.uid,
          username:
            action.payload.displayName || action.payload.email.split("@")[0],
          profile: action.payload.photoUrl || "",
        },
      };

    case GET_AUTH_TWITT_REQUEST:
      return {
        ...state,
        hasTwitts: false,
        isLoading: true,
      };
    case GET_AUTH_TWITT_SUCCESS:
      return {
        ...state,
        hasTwitts: true,
        isLoading: false,
        user: {
          ...state.user,
          twitts: action.payload,
        },
      };
    case GET_AUTH_TWITT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

export default auth;
