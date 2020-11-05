export const ADD_TWITT_REQUEST = "twit/ADD_TWITT_REQUEST";
export const ADD_TWITT_SUCCESS = "twit/ADD_TWITT_SUCCESS";
export const ADD_TWITT_FAILURE = "twit/ADD_TWITT_FAILURE";

export const ADD_COMMENT_REQUEST = "twit/ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "twit/ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "twit/ADD_COMMENT_FAILURE";

const initialState = {
  isLoading: false,
  isDone: false,
  error: null,
  twitt: { twitt: "", creator: "", creatorId: "", createAt: "", imgUrl: "" },
  comment: {
    creator: "",
    comment: "",
    createAt: "",
  },
};

export const addTwitt = (twitt) => ({
  type: ADD_TWITT_REQUEST,
  payload: twitt,
});

export const addComment = (comment) => ({
  type: ADD_COMMENT_REQUEST,
  payload: comment,
});

function twit(state = initialState, action) {
  switch (action.type) {
    case ADD_TWITT_REQUEST:
      return {
        ...state,
        isLoading: true,
        isDone: false,
        error: null,
        twitt: {
          ...state.twitt,
          twitt: action.payload.twitt,
          creator: action.payload.creator,
          createAt: action.payload.createAt,
          creatorId: action.payload.creatorId,
          imgUrl: action.payload.imgUrl,
        },
      };
    case ADD_TWITT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isDone: true,
      };
    case ADD_TWITT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        isLoading: true,
        isDone: false,
        error: null,
        comment: {
          ...state.comment,
          creator: action.payload.id,
          comment: action.payload.comment,
          createAt: new Date().toLocaleString("ko-KR"),
        },
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isDone: true,
      };
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

export default twit;
