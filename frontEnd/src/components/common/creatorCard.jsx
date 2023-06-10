import { useState } from "react";
import useElapsedTimeCalc from "../../hooks/useElapsedTimeCalc";
import { useAuth } from "../../context/authContextProvider";
import { manageLike } from "../../services/artServices";
import LoginModal from "./LoginModal";

const CreatorCard = ({ artInfo }) => {
  // Access user information from auth context
  const { user } = useAuth();

  // Destructure art information
  const { base64Image, imageName, createdAt, _id, likes } = artInfo;

  // State for login modal visibility, like status, and like counter
  const [loginModalShow, setLoginModalShow] = useState(false);
  const [like, setLike] = useState(likes.includes(user?._id));
  const [likeCounter, setLikeCounter] = useState(likes.length);

  // Functions to handle login modal visibility
  const handleLoginModalClose = () => setLoginModalShow(false);
  const handleLoginModalShow = () => setLoginModalShow(true);

  // Calculate elapsed time since creation
  let createdAtDisplay = useElapsedTimeCalc(createdAt);

  // Function to handle like/dislike action
  const handleLike = async () => {
    try {
      if (user) {
        const response = await manageLike(_id, like);
        setLike(!like);
        setLikeCounter(response.data.likes.length);
      } else {
        handleLoginModalShow();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="col">
        <div className="card art-card shadow-sm">
          <img src={base64Image} className="card-img-top" alt={imageName} />

          <div className="card-body ">
            <div className="d-flex py-1 ">
              {/* Elapsed time since creation */}
              <div className="ps-2 pe-1 text-small me-auto text-body-secondary created-at-display">
                {createdAtDisplay}
              </div>
              <div className="mx-auto vr" />

              {/* Like button */}
              <div
                role="button"
                onClick={handleLike}
                className="text-small like-btn px-2  "
              >
                {likeCounter} &nbsp;
                <i
                  className={`bi like-btn ${
                    like ? "bi-hand-thumbs-up-fill" : "bi-hand-thumbs-up"
                  } `}
                ></i>
              </div>
            </div>
            <div>
              {/* Image name */}
              <div className="text-small px-1 overflow-hidden">{imageName}</div>
            </div>
          </div>
        </div>

        {/* Login modal */}
        <LoginModal show={loginModalShow} handleClose={handleLoginModalClose} />
      </div>
    </>
  );
};

export default CreatorCard;
