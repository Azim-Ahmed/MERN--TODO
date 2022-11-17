import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTodo } from "../redux/actions/todosAction";
import { useForm } from "react-hook-form";
import TextField from "./TextField";
import Button from "./Button";

const AddNewTodoForm = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm();
  const dispatch = useDispatch();
  const { isLoadingPost, successPost, errorPost } = useSelector(
    (state) => state.todos
  );
  const [validationError, setValidationError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = (data) => {
    dispatch(createTodo(data));
    reset();
  };

  useEffect(() => {
    if (successPost) {
      setSuccessMessage(successPost.message);
    } else if (errorPost) {
      setValidationError("Error: " + errorPost.message);
    }
  }, [successPost, errorPost]);

  useEffect(() => {
    setTimeout(() => {
      setSuccessMessage("");
      setValidationError("");
    }, 3000);
  }, [successMessage, validationError]);

  return (
    <div className="bg-gray-100 w-[90%] md:w-[80%] lg:w-[50%] p-5 rounded-sm shadow-md">
      {/* Form Validation Message */}
      {validationError && (
        <div className="w-full h-[40px] bg-red-500 text-center py-2 rounded-sm">
          <p className="text-white text-md">{validationError}</p>
        </div>
      )}

      {/* Form Success Message */}
      {successMessage && (
        <div className="w-full h-[40px] bg-green-500 text-center py-2 rounded-sm">
          <p className="text-white text-md">{successMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center justify-center">
          <TextField register={register} name="title" errors={errors} />
          <TextField
            register={register}
            name="description"
            textarea
            errors={errors}
          />
          <TextField register={register} name="steps" select errors={errors} />
        </div>

        <div className="flex justify-start">
          {" "}
          <Button isLoadingPost={isLoadingPost} />
        </div>
      </form>
    </div>
  );
};

export default AddNewTodoForm;
