export const SIGN_UP_REQUEST = "signup/SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "signup/SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "signup/SIGN_UP_FAILURE";

const initialState = {
  email: "",
  password: "",
  isLoading: false,
  isDone: false,
  error: "",
};

export const signUpSubmit = (value) => ({
  type: SIGN_UP_REQUEST,
  payload: { email: value.email, password: value.password },
});

function signUp(state = initialState, action) {
  switch (action.type) {
    case SIGN_UP_REQUEST:
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password,
        isLoading: true,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isDone: true,
        error: "",
      };
    case SIGN_UP_FAILURE:
      return {
        ...state,
        isLoading: false,
        email: "",
        password: "",
        error: action.payload,
      };

    default:
      return state;
  }
}

export default signUp;
