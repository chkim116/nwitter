export const GET_TWITT_REQUEST = "get/GET_TWITT_REQUEST";
export const GET_TWITT_SUCCESS = "get/GET_TWITT_SUCCESS";
export const GET_TWITT_FAILURE = "get/GET_TWITT_FAILURE";

const initialState = {
  isLoading: false,
  isDone: false,
  error: "",
  twitts: [],
};

export const getTwitt = (twittList) => ({
  type: GET_TWITT_REQUEST,
  payload: twittList,
});

function get(state = initialState, action) {
  switch (action.type) {
    case GET_TWITT_REQUEST:
      return {
        ...state,
        isLoading: true,
        isDone: false,
        error: "",
      };
    case GET_TWITT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isDone: true,
        twitts: action.payload.map((list) => list),
      };
    case GET_TWITT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

export default get;
