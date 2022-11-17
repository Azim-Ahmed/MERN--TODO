import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import TextField from "./TextField";

const EditTodoForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [singleData, setSingleData] = useState({});
  const [defaulty, setDefaulty] = useState({});
  const [validationError, setValidationError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!searchParams.get("id")) {
      navigate("/");
    } else {
      axios
        .get(
          process.env.REACT_APP_API_BASE_URL +
            "/api/v1/todo/" +
            searchParams.get("id")
        )
        .then((res) => {
          if (res.data) {
            setSingleData(res.data.todo);
          }
        })
        .catch((err) => {
          setValidationError("Error: " + err.message);
        });
    }
  }, [searchParams, navigate]);
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm({
    mode: "all",
    defaultValues: { ...singleData },
  });
  useEffect(() => {
    if (singleData && searchParams.get("id")) {
      setDefaulty({ ...singleData });
      reset(singleData);
    }
  }, [singleData, reset]);

  const onSubmit = (data) => {
    axios
      .put(
        process.env.REACT_APP_API_BASE_URL +
          "/api/v1/todo/" +
          searchParams.get("id"),
        data
      )
      .then((res) => {
        if (res.status === 200) {
          setSuccessMessage("Todo updated successfully");
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
          setValidationError("Error: " + res.message);
        }
      })
      .catch((err) => {
        setValidationError("Error: " + err.message);
      });
  };
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
      <form
        className="flex flex-col items-center justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField register={register} name="title" errors={errors} />
        <TextField
          register={register}
          name="description"
          textarea
          errors={errors}
        />
        <TextField register={register} name="steps" select errors={errors} />
        <div className="w-full flex flex-row items-center justify-start">
          <button
            type="submit"
            className="bg-green-500
             text-white
              rounded-sm
              shadow-md
               w-[150px]
                my-2
                 py-2
                  mr-2
                   transition-all
                    duration-100
                     hover:bg-green-600
                     "
          >
            Update Todo
          </button>

          <Link
            to="/"
            className="bg-blue-500   w-[220px] text-white text-center rounded-sm shadow-md my-2 py-2 ml-2 transition-all duration-100 hover:bg-blue-600"
          >
            Go Back Homepage
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditTodoForm;
