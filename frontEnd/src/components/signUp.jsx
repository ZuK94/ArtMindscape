import Joi from "joi";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Input } from "./common/inputs";
import formikValidationUsingJoi from "../utils/formikValidationUsingJoi";
import { signUp } from "../services/userServices";
import { useAuth } from "../context/authContextProvider";
import { useEffect } from "react";
import PageHeader from "./common/pageHeader";
import { toast } from "react-toastify";

const SignUp = () => {
  // React Router hooks
  const navigate = useNavigate();
  const location = useLocation();

  // Authentication context hooks
  const { user, userLogin } = useAuth();

  // Get the selected plan from the location state or default to "viewer"
  const plan = location.state ? location.state.plan : "viewer";

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Navigate back home if user is logged in
  useEffect(() => {
    if (user !== null) navigate("/");
  }, [user]);

  // Formik form setup
  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: plan,
    },
    validate: formikValidationUsingJoi({
      name: Joi.string().min(2).max(40).required(),
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .min(6)
        .max(255)
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i)
        .messages({
          "string.pattern.base": "You must enter a valid email address",
        })
        .required(),
      password: Joi.string()
        .required()
        .min(8)
        .max(56)
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d{4,})(?=.*[*\-_*&^$#@!])[A-Za-z\d*\-_*&^$#@!]{8,56}$/
        )
        .messages({
          "string.pattern.base":
            "Password must contain an uppercase and lowercase letter, at least 4 numbers, and one special character",
        }),
      confirmPassword: Joi.string()
        .valid(Joi.ref("password"))
        .required()
        .messages({ "any.only": "Passwords must match" }),
      role: Joi.string(),
    }),
    async onSubmit(values) {
      const { name, email, password, role } = values;
      try {
        // Sign up the user
        await signUp({ name, email, password, role });

        // Log in the user
        await userLogin({ email, password });

        // Display success message and navigate to home page
        toast.success("Your account has been created", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/");
      } catch ({ response }) {
        if (response.status === 400) setError(response.data);
      }
    },
  });

  const headerParams = {
    header: "Sign up",
    pTextDirection: "text-center",
  };

  return (
    <>
      <section className="py-5 text-center container">
        <PageHeader params={headerParams} />
        <form
          onSubmit={form.handleSubmit}
          autoComplete="off"
          noValidate
          name="signUp"
          className="form-floating px-5 form d-grid gap-3 col-lg-6 mx-auto"
        >
          <Input
            name="name"
            type="text"
            label="Full Name"
            error={form.touched.name && form.errors.name}
            {...form.getFieldProps("name")}
          />
          <Input
            name="email"
            type="email"
            label="Email Address"
            error={form.touched.email && form.errors.email}
            {...form.getFieldProps("email")}
          />
          <div>
            <Input
              name="password"
              type="password"
              label="Password"
              error={form.touched.password && form.errors.password}
              autoComplete="new-password"
              {...form.getFieldProps("password")}
            />
          </div>
          <div className="input-wrapper">
            <Input
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              label="Re-enter Password"
              error={
                form.touched.confirmPassword && form.errors.confirmPassword
              }
              autoComplete="new-password"
              {...form.getFieldProps("confirmPassword")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {!showPassword ? (
                <i className="bi bi-eye-slash"></i>
              ) : (
                <i className="bi bi-eye"></i>
              )}
            </button>
          </div>
          <button className="btn btn-dark" type="submit">
            Sign Up
          </button>
          <button
            onClick={() => {
              navigate("/log-in");
            }}
            className="btn btn-dark"
            type="button"
          >
            Log In
          </button>
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
      </section>
    </>
  );
};

export default SignUp;
