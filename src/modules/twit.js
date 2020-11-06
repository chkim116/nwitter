export const ADD_TWITT_REQUEST = "twit/ADD_TWITT_REQUEST";
export const ADD_TWITT_SUCCESS = "twit/ADD_TWITT_SUCCESS";
export const ADD_TWITT_FAILURE = "twit/ADD_TWITT_FAILURE";

export const ADD_COMMENT_REQUEST = "twit/ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "twit/ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "twit/ADD_COMMENT_FAILURE";

export const ADD_LIKES_REQUEST = "twit/ADD_LIKES_REQUEST";
export const ADD_LIKES_SUCCESS = "twit/ADD_LIKES_SUCCESS";
export const ADD_LIKES_FAILURE = "twit/ADD_LIKES_FAILURE";

export const ADD_UNLIKES_REQUEST = "twit/ADD_UNLIKES_REQUEST";
export const ADD_UNLIKES_SUCCESS = "twit/ADD_UNLIKES_SUCCESS";
export const ADD_UNLIKES_FAILURE = "twit/ADD_UNLIKES_FAILURE";

const initialState = {
  isLoading: false,
  isDone: false,
  isLike: false,
  error: null,
  twitt: {
    id: "",
    twitt: "",
    creator: "",
    creatorId: "",
    createAt: "",
    imgUrl: "",
    comments: [],
    likes: [],
  },
  comment: {
    comment: "",
    id: "",
    creator: "",
    creatorId: "",
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

export const addLikes = (id) => ({
  type: ADD_LIKES_REQUEST,
  payload: id,
});

export const addUnLikes = (id) => ({
  type: ADD_UNLIKES_REQUEST,
  payload: id,
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
          id: action.payload.id,
          comments: [],
          likes: [],
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
          creator: action.payload.username,
          creatorId: action.payload.id,
          comment: action.payload.comment,
          createAt: new Date().toLocaleString("ko-KR"),
          profile: action.payload.profile,
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

    case ADD_LIKES_REQUEST:
      return {
        ...state,
        error: null,
        isLike: false,
        isLoading: true,
      };
    case ADD_LIKES_SUCCESS:
      return {
        ...state,
        isLike: true,
        isLoading: false,
      };
    case ADD_LIKES_FAILURE:
      return {
        ...state,
        isLike: false,
        isLoading: false,
        error: action.payload,
      };

    case ADD_UNLIKES_REQUEST:
      return {
        ...state,
        error: null,
      };
    case ADD_UNLIKES_SUCCESS:
      return {
        ...state,
        isLike: false,
      };
    case ADD_UNLIKES_FAILURE:
      return {
        ...state,
        isLike: true,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default twit;
