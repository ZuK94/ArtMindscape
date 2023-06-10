import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContextProvider";
import { toast } from "react-toastify";

const LogOut = () => {
  // React Router navigation hook
  const navigate = useNavigate();

  // Authentication context hook
  const { userLogOut } = useAuth();

  // Effect to log out the user and redirect to home
  useEffect(() => {
    userLogOut();
    navigate("/");
    toast.success("See you next time!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }, []);
};

export default LogOut;
