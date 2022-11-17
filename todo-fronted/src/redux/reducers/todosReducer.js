
import {
  todoAppConstant
} from "../constants/todosConstant";
const initialState = {
  isLoading: false,
  todos: [],
  error: null,
  isLoadingPost: false,
  successPost: null,
  errorPost: null,
  isLoadingDelete: false,
  successDelete: null,
  errorDelete: null,
};

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    // all todo gets reducers
    case todoAppConstant.GET_TODOS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case todoAppConstant.GET_TODOS_SUCCESS:
      return {
        isLoading: false,
        todos: action.payload,
        error: null,
      };
    case todoAppConstant.GET_TODOS_FAILURE:
      return {
        isLoading: false,
        todos: [],
        error: action.payload,
      };

    // single todo create reducers
    case todoAppConstant.POST_TODOS_REQUEST:
      return {
        ...state,
        isLoadingPost: true,
      };
    case todoAppConstant.POST_TODOS_SUCCESS:
      return {
        ...state,
        isLoadingPost: false,
        successPost: action.payload,
        errorPost: null,
      };
    case todoAppConstant.POST_TODOS_FAILURE:
      return {
        ...state,
        isLoadingPost: false,
        successPost: null,
        errorPost: action.payload,
      };

    // single todo delete reducers
    case todoAppConstant.DELETE_TODOS_REQUEST:
      return {
        ...state,
        isLoadingDelete: true,
      };
    case todoAppConstant.DELETE_TODOS_SUCCESS:
      return {
        ...state,
        isLoadingDelete: false,
        successDelete: action.payload,
        errorDelete: null,
      };
    case todoAppConstant.DELETE_TODOS_FAILURE:
      return {
        ...state,
        isLoadingDelete: false,
        successDelete: null,
        errorDelete: action.payload,
      };

    default:
      return state;
  }
};

export default todosReducer;
