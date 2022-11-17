import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteTodo, getAllTodos } from "../redux/actions/todosAction";

const TodosList = () => {
  const dispatch = useDispatch();
  const { isLoading, todos, error, isLoadingPost, isLoadingDelete } =
    useSelector((state) => state.todos);
  useEffect(() => {
    dispatch(getAllTodos);
  }, [dispatch, isLoadingPost, isLoadingDelete]);
  const handleDeleteTodo = (todoId) => {
    dispatch(deleteTodo({ todoId }));
  };
  console.log({ todos });
  return (
    <div className=" w-[70%] md:w-[80%] lg:w-[100%] my-5">
      {/* Loading & Error Redux State */}
      {isLoading && (
        <h2 className="text-black text-2xl font-bold my-2">Loading ... !!!</h2>
      )}
      {error && (
        <h2 className="text-red-500 text-2xl font-bold my-2">
          Error: {error.message}
        </h2>
      )}
      <div>
        {/* Todos List */}
        {todos.length === 0 ? (
          <h2 className="text-black text-2xl font-bold my-2">
            Sorry! No Todos Found.
          </h2>
        ) : (
          <div className="flex justify-evenly mt-4">
            <div className="shadow-lg border-2 rounded border-solid border-gray-500 p-5 ">
              <div className="w-[300px] text-center">TODO</div>
              <div className="max-h-[450px] overflow-y-auto">
                {todos?.todos?.map(
                  (todo, index) =>
                    todo.steps === "todo" && (
                      <div
                        key={index}
                        className="bg-gray-100 w-full rounded-sm shadow-md p-5 my-2 transition-all duration-100 hover:shadow-lg"
                      >
                        <h2 className="text-black text-2xl font-bold my-2">
                          <span className="text-blue-500 font-bold">
                            Title:{" "}
                          </span>
                          <span
                            className={
                              todo.steps === "done"
                                ? "line-through decoration-green-500"
                                : "none"
                            }
                          >
                            {todo?.title}
                          </span>
                        </h2>

                        <p className="text-black text-lg  max-w-[240px] font-normal text-justify my-2">
                          <span className="text-blue-500 font-bold">
                            Description:{" "}
                          </span>
                          {todo?.description}
                        </p>

                        <div className="flex flex-row items-center justify-center mt-2">
                          <Link
                            to={`edit-todo/?id=${todo._id}`}
                            className="bg-blue-500 text-white text-center rounded-sm shadow-md w-full my-2 py-2 mr-2 transition-all duration-100 hover:bg-blue-600"
                          >
                            Edit
                          </Link>

                          <button
                            className="bg-red-500 text-white rounded-sm shadow-md w-full my-2 py-2 ml-2 transition-all duration-100 hover:bg-red-600"
                            onClick={() => handleDeleteTodo(todo._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>

            <div className="shadow-lg border-2 rounded border-solid border-gray-500 p-5">
              <div className="w-[300px] text-center">In Progress</div>
              <div className="max-h-[450px] overflow-y-auto">
                {todos?.todos?.map(
                  (todo, index) =>
                    todo.steps === "inProgress" && (
                      <div
                        key={index}
                        className="bg-gray-100 w-full rounded-sm shadow-md p-5 my-2 transition-all duration-100 hover:shadow-lg"
                      >
                        <h2 className="text-black text-2xl font-bold my-2">
                          <span className="text-blue-500 font-bold">
                            Title:{" "}
                          </span>
                          <span
                            className={
                              todo?.steps === "inProgress"
                                ? " text-green-600"
                                : "none"
                            }
                          >
                            {todo?.title}
                          </span>
                        </h2>

                        <p className="text-black text-lg max-w-[240px] font-normal text-justify my-2">
                          <span className="text-blue-500 font-bold">
                            Description:{" "}
                          </span>
                          {todo.description}
                        </p>

                        <div className="flex flex-row items-center justify-center mt-2">
                          <Link
                            to={`edit-todo/?id=${todo?._id}`}
                            className="bg-blue-500 text-white text-center rounded-sm shadow-md w-full my-2 py-2 mr-2 transition-all duration-100 hover:bg-blue-600"
                          >
                            Edit
                          </Link>

                          <button
                            className="bg-red-500 text-white rounded-sm shadow-md w-full my-2 py-2 ml-2 transition-all duration-100 hover:bg-red-600"
                            onClick={() => handleDeleteTodo(todo?._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>
            <div className="shadow-lg border-2 rounded border-solid border-gray-500 p-5">
              <div className="w-[300px] text-center">Done</div>
              <div className="max-h-[450px] overflow-y-auto">
                {todos?.todos?.map(
                  (todo, index) =>
                    todo.steps === "done" && (
                      <div
                        key={index}
                        className="bg-gray-100 w-full rounded-sm shadow-md p-5 my-2 transition-all duration-100 hover:shadow-lg"
                      >
                        <h2 className="text-black text-2xl font-bold my-2">
                          <span className="text-blue-500 font-bold">
                            Title:{" "}
                          </span>
                          <span
                            className={
                              todo?.steps === "done"
                                ? "line-through decoration-green-500"
                                : "none"
                            }
                          >
                            {todo?.title}
                          </span>
                        </h2>

                        <p className="text-black text-lg max-w-[240px] font-normal text-justify my-2">
                          <span className="text-blue-500 font-bold">
                            Description:{" "}
                          </span>
                          {todo.description}
                        </p>

                        <div className="flex flex-row items-center justify-center mt-2">
                          <Link
                            to={`edit-todo/?id=${todo?._id}`}
                            className="bg-blue-500 text-white text-center rounded-sm shadow-md w-full my-2 py-2 mr-2 transition-all duration-100 hover:bg-blue-600"
                          >
                            Edit
                          </Link>

                          <button
                            className="bg-red-500 text-white rounded-sm shadow-md w-full my-2 py-2 ml-2 transition-all duration-100 hover:bg-red-600"
                            onClick={() => handleDeleteTodo(todo?._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodosList;
