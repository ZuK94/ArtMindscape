import { NavLink } from "react-router-dom";
import { useAuth } from "../context/authContextProvider";
import { useEffect, useState } from "react";
import { getUserInfos } from "../services/userServices";
import { toast } from "react-toastify";

const Navbar = () => {
  // Authentication context hook
  const { user } = useAuth();

  // State for user information
  const [userInfo, setUserInfo] = useState({});

  // Destructure avatar from userInfo
  const { avatar } = userInfo;

  // Effect to fetch user information
  useEffect(() => {
    const getUser = async () => {
      try {
        if (user) {
          const response = await getUserInfos({ users: [user._id] });
          setUserInfo({ ...response.data[0] });
        } else {
          setUserInfo({});
        }
      } catch (error) {
        toast.error("An error has occurred", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    };
    getUser();
  }, [user]);

  return (
    <>
      <nav className="px-3 py-2 navbar navbar-dark navbar-expand-lg bg-dark">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <NavLink to={"/"} className="navbar-brand text-white">
              <h3 className="app-heading px-3">
                Art Mind<span className="purple">S</span>cape
              </h3>
            </NavLink>

            <ul className="nav navbar-nav ms-auto my-2 justify-content-center my-md-0 text-small">
              <li>
                <NavLink to={"/"} className="nav-link">
                  <i className="bi purple bi-house d-block  mb-1"></i>
                  <span className="purple">Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/about"} className="nav-link">
                  <i className="bi purple bi-info-circle d-block  mb-1"></i>
                  <span className=" purple">About</span>
                </NavLink>
              </li>
              {user?.role === "web-admin" && (
                <li>
                  <NavLink to={"/dashboard"} className="nav-link">
                    <i className="bi purple bi-gear d-block mx-auto mb-1"></i>
                    <span className=" purple">Dashboard</span>
                  </NavLink>
                </li>
              )}
              <li>
                <NavLink to={"/collections"} className="nav-link">
                  <i className="bi purple bi-speedometer2 d-block mx-auto mb-1"></i>
                  <span className="purple">Collection</span>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/ai-art"} className="nav-link">
                  <i className="bi purple bi-columns-gap d-block mx-auto mb-1"></i>
                  <span className="purple">Art Generator</span>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/album"} className="nav-link ">
                  <i className="bi purple bi-columns-gap d-block mx-auto mb-1"></i>
                  <span className="purple">Album</span>
                </NavLink>
              </li>
              <li className="nav-item my-auto ms-4 dropdown ">
                <a
                  className="d-block link-light text-decoration-none dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={
                      avatar ||
                      "https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_1280.png"
                    }
                    alt="user avatar"
                    style={{ width: 32, height: 32 }}
                    className="rounded-circle"
                  />
                </a>
                <ul className="dropdown-menu text-small">
                  <li>
                    <NavLink className="dropdown-item" to={"/ai-art"}>
                      New project
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to={"/profile"}>
                      Profile
                    </NavLink>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  {user ? (
                    <li>
                      <NavLink to={"/log-out"} className="dropdown-item">
                        Sign out
                      </NavLink>
                    </li>
                  ) : (
                    <>
                      <li>
                        <NavLink to={"/log-in"} className="dropdown-item">
                          Login
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to={"/sign-up-plans"}
                          className="dropdown-item"
                        >
                          Sign up
                        </NavLink>
                      </li>
                    </>
                  )}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
