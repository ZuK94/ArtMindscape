import PageHeader from "./common/pageHeader";
import { useAuth } from "../context/authContextProvider";
import { useEffect, useState } from "react";
import { getUserInfos, userProfileUpdate } from "../services/userServices";
import { useFormik } from "formik";
import formikValidationUsingJoi from "../utils/formikValidationUsingJoi";
import formikFileValidation from "../utils/formikFileValidation";
import { FileInput, Input } from "./common/inputs";
import Joi from "joi";
import imageToBase64 from "../utils/imageToBase64";
import useElapsedTimeCalc from "../hooks/useElapsedTimeCalc";
import { getUserImages } from "../services/artServices";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Define the main UserProfile component
const UserProfile = () => {
  // Initial state and context hooks
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editAvatar, setEditAvatar] = useState(false);
  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [base64Image, setBase64Image] = useState(null);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [artAmount, setArtAmount] = useState(Number);

  // Navigation hook
  const navigate = useNavigate();

  // Destructuring the user information
  const { name, email, role, _id, createdAt, avatar } = userInfo;
  const allowedFileExtensions = ["jpg", "jpeg", "png", "gif"];

  // Use custom hook to calculate time elapsed since user joined
  const memberSince = useElapsedTimeCalc(createdAt);

  // Formik form configurations
  // Form for updating the user's name
  const nameForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: name,
    },
    validate: formikValidationUsingJoi({
      name: Joi.string().min(2).max(40).required(),
    }),
    async onSubmit(values) {
      try {
        await handleSubmit(values);
        setEditName(!editName);
      } catch (error) {
        console.log(error);
      }
    },
  });

  // Form for updating the user's email
  const emailForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: email,
    },
    validate: formikValidationUsingJoi({
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .min(6)
        .max(255)
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i)
        .messages({
          "string.pattern.base": "you must enter a valid Email address",
        })
        .required(),
    }),
    async onSubmit(values) {
      await handleSubmit(values);
      setEditEmail(!editEmail);
    },
  });

  // Form for updating the user's avatar
  const avatarForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      avatar: "",
    },
    validate: formikFileValidation({
      allowedFileExtensions,
    }),
    async onSubmit(values) {
      try {
        let newValues = {};

        newValues[Object.keys(values)[0]] = base64Image;
        await handleSubmit(newValues);
        setEditAvatar(!editAvatar);
      } catch (error) {
        setError(error);
      }
    },
  });

  // Function for handling the submission of the form data
  const handleSubmit = async (values) => {
    try {
      const response = await userProfileUpdate(values);
      setUserInfo(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to handle the conversion of the image to base64
  const handleFileInput = async (file) => {
    if (file) {
      const base64Image = await imageToBase64(file);
      setBase64Image(base64Image);
    } else {
      setBase64Image(avatar);
    }
  };

  // Fetch user data on component mount
  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      !user && navigate("/sign-up-plans");
      try {
        const response = await getUserInfos({ users: [user._id] });
        const userArtResponse = await getUserImages();
        setUserInfo(response.data[0]);
        setBase64Image(response.data[0].avatar);
        setArtAmount(userArtResponse.data.length);
      } catch (error) {
        setError(error);
        toast.error("an error has occurred", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, []);

  // Update new name and email when form values change
  useEffect(() => {
    setNewName(nameForm.values.name);
    setNewEmail(emailForm.values.email);
  }, [nameForm.values, emailForm.values]);

  // Set the header parameters
  const headerParams = {
    header: `View and edit your profile`,
    pTextDirection: "text-start",
  };

  return (
    <>
      <section className="py-5 text-center container">
        <PageHeader params={headerParams} />

        {/* {error && <span>{error}</span>} */}
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : (
          <div className="py-lg-5 py-sm-2">
            <div className="row row-cols-1 row-cols-xs-2 row-cols-md-3 row-cols-lg-5 g-4 justify-content-center">
              <div className="card user-card">
                <div className="card-img-top row">
                  <div className="col-sm-4" id="profile-img">
                    <img
                      src={
                        !base64Image || avatarForm.errors.avatar
                          ? "https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_1280.png"
                          : base64Image
                      }
                      alt="user avatar"
                    />
                  </div>
                  <div id="user-info" className="col-sm-8">
                    <h5 className="card-title">{name}</h5>
                    <div>
                      <span className="key">member since : &nbsp;&nbsp;</span>
                      {memberSince}
                    </div>
                    <div>
                      <span className="key">art created : &nbsp;&nbsp;</span>
                      {artAmount}
                    </div>
                  </div>
                </div>

                <ul className="list-group list-group-flush ">
                  <form
                    name="profile-avatar-update"
                    onChange={(e) => {
                      handleFileInput(e.target.files[0]);
                    }}
                    onSubmit={(e) => {
                      e.preventDefault();

                      avatarForm.handleSubmit();
                    }}
                    autoComplete="off"
                    noValidate
                  >
                    <li className="list-group-item d-flex">
                      {editAvatar ? (
                        <>
                          <FileInput
                            name="avatar"
                            buttonText="Update"
                            error={
                              avatarForm.touched.avatar &&
                              avatarForm.errors.avatar
                            }
                            {...avatarForm.getFieldProps("avatar")}
                          />{" "}
                          <i
                            className="bi bi-x-circle"
                            onClick={() => setEditAvatar(!editAvatar)}
                          ></i>
                        </>
                      ) : (
                        <button
                          onClick={() => {
                            setEditAvatar(!editAvatar);
                          }}
                          type="button"
                          className="btn btn-secondary"
                        >
                          Change avatar
                        </button>
                      )}
                    </li>
                  </form>
                  <form
                    name="profile-name-update"
                    onSubmit={(e) => {
                      e.preventDefault();
                      nameForm.handleSubmit();
                    }}
                    autoComplete="off"
                    noValidate
                  >
                    <li className="list-group-item">
                      {editName ? (
                        <>
                          <div className="start">
                            <Input
                              name="name"
                              type="text"
                              label="Full Name"
                              error={
                                nameForm.touched.name && nameForm.errors.name
                              }
                              {...nameForm.getFieldProps("name")}
                            />
                          </div>
                          <button
                            className={`save-btn btn btn-sm ${
                              name === newName
                                ? "disabled btn-outline-secondary"
                                : "btn-outline-danger"
                            }
                          `}
                            type="submit"
                            id="name-select"
                          >
                            save
                          </button>
                        </>
                      ) : (
                        <div className="start">
                          <span className="key">name : &nbsp;&nbsp;</span>
                          {name}
                        </div>
                      )}

                      <i
                        className={`bi ${
                          editName ? "bi-x-circle" : "bi-pencil-square"
                        }`}
                        onClick={() => setEditName(!editName)}
                      ></i>
                    </li>
                  </form>
                  <form
                    name="profile-email-update"
                    onSubmit={(e) => {
                      e.preventDefault();
                      emailForm.handleSubmit();
                    }}
                    autoComplete="off"
                    noValidate
                  >
                    <li className="list-group-item">
                      {editEmail ? (
                        <>
                          <div className="start">
                            <Input
                              name="email"
                              type="email"
                              label="Email Address"
                              error={
                                emailForm.touched.email &&
                                emailForm.errors.email
                              }
                              {...emailForm.getFieldProps("email")}
                            />
                          </div>
                          <button
                            className={`save-btn btn btn-sm ${
                              email === newEmail
                                ? "disabled  btn-outline-secondary"
                                : "btn-outline-danger"
                            }`}
                            type="submit"
                            id="email-select"
                          >
                            save
                          </button>
                        </>
                      ) : (
                        <div className="start">
                          <span className="key">email : &nbsp;&nbsp;</span>
                          {email}
                        </div>
                      )}

                      <i
                        className={`bi ${
                          editEmail ? "bi-x-circle" : "bi-pencil-square"
                        }`}
                        onClick={() => setEditEmail(!editEmail)}
                      ></i>
                    </li>
                    <li className="list-group-item">
                      <div className="description">
                        <span className="key">
                          current subscription : &nbsp;&nbsp;
                        </span>
                        {role}
                      </div>
                    </li>
                  </form>
                </ul>
                <div className="card-body">
                  <a
                    onClick={() => {
                      navigate(`/creator-collection/${_id}`);
                    }}
                    role="button"
                    className="btn btn-sm btn-outline-primary"
                  >
                    Go to my art
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};
export default UserProfile;
