export const LOGIN_SUBMIT_REQUSET = "auth/LOGIN_SUBMIT_REQUSET";
export const LOGIN_SUBMIT_SUCCESS = "auth/LOGIN_SUBMIT_SUCCESS";
export const LOGIN_SUBMIT_FAILURE = "auth/LOGIN_SUBMIT_FAILURE";

export const LOGOUT_REQUSET = "auth/LOGOUT_REQUSET";
export const LOGOUT_SUCCESS = "auth/LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "auth/LOGOUT_FAILURE";

export const GET_AUTH = "auth/GET_AUTH";
export const GET_AUTH_TWITT = "auth/GET_AUTH_TWITT";

const initialState = {
  login: { email: "", password: "" },
  isLogin: false,
  isLoading: false,
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

export const getAuthTwitt = (twitt) => ({
  type: GET_AUTH_TWITT,
  payload: twitt,
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
          username: action.payload.user.email.split("@")[0],
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
          username: action.payload.email.split("@")[0],
        },
      };
    case GET_AUTH_TWITT:
      return {
        ...state,
        user: {
          ...state.user,
          twitts: action.payload.map((twitt) =>
            twitt.filter((t) => t.data.creatorId === state.user.id)
          ),
        },
      };

    default:
      return state;
  }
}

export default auth;
