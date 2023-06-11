import "../src/styles/App.scss";
import "../src/styles/Cards.scss";
import "../src/styles/Heading.scss";
import { Route, Routes } from "react-router-dom";
import "./components/navbar";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap-icons/font/bootstrap-icons.css";
import Home from "./components/home";
import LogIn from "./components/logIn";
import SignUp from "./components/signUp";
import About from "./components/about";
import Layout from "./components/layout";
import ArtGenerator from "./components/artGenerator";
import LogOut from "./components/logOut";
import Dashboard from "./components/dashboard";
import Collections from "./components/collections";
import MainAlbum from "./components/mainAlbum";
import CreatorCollection from "./components/creatorCollection";
import ProtectedRoute from "./components/protectedRoute";
import SignUpPlans from "./components/signUpPlan";
import UserProfile from "./components/userProfile";

function App() {
  return (
    <div className="App d-flex flex-column min-vh-100">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="/ai-art"
            element={
              <ProtectedRoute editor>
                <ArtGenerator />
              </ProtectedRoute>
            }
          />
          <Route path="/about" element={<About />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute admin>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/log-in" element={<LogIn />} />
          <Route path="/log-out" element={<LogOut />} />
          <Route path="/sign-up-plans" element={<SignUpPlans />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route
            path="/collections"
            element={
              <ProtectedRoute editor>
                <Collections />
              </ProtectedRoute>
            }
          />
          <Route path="/album" element={<MainAlbum />} />
          <Route
            path="/creator-collection/:creator_id"
            element={<CreatorCollection />}
          />
          <Route path="/profile" element={<UserProfile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
