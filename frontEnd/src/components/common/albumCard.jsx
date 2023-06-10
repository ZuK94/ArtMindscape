import { useNavigate } from "react-router-dom";
import useElapsedTimeCalc from "../../hooks/useElapsedTimeCalc";
import { useState } from "react";
import { manageLike } from "../../services/artServices";
import { useAuth } from "../../context/authContextProvider";
import LoginModal from "./LoginModal";

// AlbumCard component
const AlbumCard = ({ artInfo, onLikeDisLike }) => {
  // Defining hooks and services
  const navigate = useNavigate();
  const { user } = useAuth();

  // Destructuring the props
  const { user_name, base64Image, imageName, createdAt, user_id, _id, likes } =
    artInfo;

  // Defining state for liking functionality
  const [like, setLike] = useState(likes.includes(user?._id));
  const [likeCounter, setLikeCounter] = useState(likes.length);

  // Defining state for login modal
  const [loginModalShow, setLoginModalShow] = useState(false);

  // Handlers for opening and closing the login modal
  const handleLoginModalClose = () => setLoginModalShow(false);
  const handleLoginModalShow = () => setLoginModalShow(true);

  // Calculating elapsed time
  let createdAtDisplay = useElapsedTimeCalc(createdAt);

  // Handler for liking an album
  const handleLike = async () => {
    try {
      if (user) {
        const response = await manageLike(_id, like);
        setLike(!like);
        setLikeCounter(response.data.likes.length);
        onLikeDisLike(_id, !like);
      } else {
        handleLoginModalShow();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function for navigation on click
  function click() {
    navigate(`/creator-collection/${user_id}`);
  }

  // Rendering the AlbumCard component
  return (
    <>
      <div className="col">
        <div className="card shadow-sm art-card">
          {/* Image of the album */}
          <img src={base64Image} className="card-img-top" alt={imageName} />
          <div className="card-body py-0">
            {/* Display creation time and username */}
            <div className="d-flex py-1">
              <small className="ps-2 text-small me-auto text-body-secondary">
                {createdAtDisplay}
              </small>
              <a
                className="ms-auto pe-2 link-underline link-underline-opacity-0 creator-link"
                onClick={click}
              >
                {user_name}
              </a>
            </div>

            {/* Display like button and image name */}
            <div className=" d-flex pb-3">
              <div
                role="button"
                onClick={handleLike}
                className="text-small like-btn px-2"
              >
                {likeCounter} &nbsp;
                <i
                  className={`bi like-btn ${
                    like ? "bi-hand-thumbs-up-fill" : "bi-hand-thumbs-up"
                  } `}
                ></i>
              </div>
              <div className="me-auto  vr" />
              <div className="text-small px-2 image-name-display  ms-auto">
                {imageName}
              </div>
            </div>
          </div>
        </div>

        {/* Login modal */}
        <LoginModal show={loginModalShow} handleClose={handleLoginModalClose} />
      </div>
    </>
  );
};

// Exporting the AlbumCard component
export default AlbumCard;
