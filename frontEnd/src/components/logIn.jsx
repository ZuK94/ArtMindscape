import Joi from "joi";
import { useFormik } from "formik";
import { Input } from "./common/inputs";
import formikValidationUsingJoi from "../utils/formikValidationUsingJoi";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContextProvider";
import { useState, useEffect } from "react";
import PageHeader from "./common/pageHeader";
import { toast } from "react-toastify";

const LogIn = () => {
  // React Router navigation hook
  const navigate = useNavigate();

  // Authentication context hook
  const { user, userLogin } = useAuth();

  // State for storing error messages
  const [error, setError] = useState("");

  // Redirect to home if user is already logged in
  useEffect(() => {
    if (user !== null) navigate("/");
  }, [user]);

  // Formik form configuration
  const form = useFormik({
    validateOnMount: true,
    initialValues: { email: "", password: "" },

    // Form validation schema using Joi
    validate: formikValidationUsingJoi({
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .min(6)
        .max(255)
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i)
        .messages({
          "string.pattern.base": "You must enter a valid email address",
        })
        .required(),
      password: Joi.string().min(8).max(56).required(),
    }),

    async onSubmit(values) {
      try {
        // Call the userLogin function to log in the user
        await userLogin(values);
        navigate("/");
        toast.success("Welcome back!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } catch ({ response }) {
        if (response.status === 400 || 401 || 500 || 404)
          setError(response.data);
      }
    },
  });

  // Page header parameters
  const headerParams = {
    header: "Log in",
    pTextDirection: "text-center",
    paragraph: <>Log in to your account and continue your adventure</>,
  };

  return (
    <>
      <section className="py-5 text-center container">
        <PageHeader params={headerParams} />
        <form
          onSubmit={form.handleSubmit}
          autoComplete="off"
          noValidate
          name="logIn"
          className="form-floating px-5 form d-grid gap-3 col-lg-6 mx-auto"
        >
          {/* Email input */}
          <Input
            name="email"
            type="email"
            label="Email Address"
            error={form.touched.email && form.errors.email}
            {...form.getFieldProps("email")}
          />
          {/* Password input */}
          <Input
            name="password"
            type="password"
            label="Password"
            error={form.touched.password && form.errors.password}
            {...form.getFieldProps("password")}
          />
          {/* Log In button */}
          <button className="btn btn-dark" type="submit">
            Log In
          </button>
          {/* Display error message if present */}
          {error && (
            <div
              className="alert alert-danger d-flex justify-content-center align-items-center"
              role="alert"
            >
              <i className="bi bi-exclamation-triangle flex-shrink-0 me-2"></i>
              <div>{error}</div>
            </div>
          )}
        </form>
        {/* Sign Up card */}
        <div className="card log-in-card mt-5">
          <div className="card-body row">
            <h5 className="card-title col-sm-8">Don't have an account?</h5>
            {/* Sign Up button */}
            <NavLink to={"/sign-up-plans"} className="btn btn-primary col-sm-4">
              Sign Up!
            </NavLink>
          </div>
        </div>
      </section>
    </>
  );
};

export default LogIn;
