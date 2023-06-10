import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContextProvider";

const ProtectedRoute = ({ children, editor = false, admin = false }) => {
  // Authentication context hook
  const { user } = useAuth();

  // Check if user is authenticated
  if (!user) {
    // Redirect to sign-up page if user is not authenticated
    return <Navigate to="/sign-up-plans" />;
  }

  // Check if admin access is required and user is an admin
  if (admin && user.role === "web-admin") {
    // Render the protected content for admin
    return children;
  }

  // Check if editor access is required and user is an editor or admin
  if (editor && (user.role === "editor" || user.role === "web-admin")) {
    // Render the protected content for editor
    return children;
  } else {
    // Redirect to home page for unauthorized access
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
