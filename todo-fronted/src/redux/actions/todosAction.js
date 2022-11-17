import axios from "axios";
import {
  todoAppConstant
} from "../constants/todosConstant";

// make a action to gets all todos
export const getAllTodos = async (dispatch) => {
  dispatch({ type: todoAppConstant.GET_TODOS_REQUEST });

  try {
    const res = await axios.get(process.env.REACT_APP_API_BASE_URL + "/api/v1/todos-all");
    dispatch({ type: todoAppConstant.GET_TODOS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: todoAppConstant.GET_TODOS_FAILURE, payload: error });
  }
};

// make a action to create a todo
export const createTodo = (payload) => async (dispatch) => {
  dispatch({ type: todoAppConstant.POST_TODOS_REQUEST });
  try {
    const res = await axios.post(process.env.REACT_APP_API_BASE_URL + "/api/v1/todo/new", payload);
    dispatch({ type: todoAppConstant.POST_TODOS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: todoAppConstant.POST_TODOS_FAILURE, payload: error });
  }
};

// make a action to delete a todo
export const deleteTodo = (payload) => async (dispatch) => {
  dispatch({ type: todoAppConstant.DELETE_TODOS_REQUEST });

  try {
    const res = await axios.delete(process.env.REACT_APP_API_BASE_URL + "/api/v1/todo/" + payload.todoId);
    dispatch({ type: todoAppConstant.DELETE_TODOS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: todoAppConstant.DELETE_TODOS_FAILURE, payload: error });
  }
};
