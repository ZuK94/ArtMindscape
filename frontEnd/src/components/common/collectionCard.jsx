import { useState } from "react";
import useElapsedTimeCalc from "../../hooks/useElapsedTimeCalc";
import { publishArt } from "../../services/artServices";

const CollectionCard = ({ artInfo, onEditClick, onDeleteClick }) => {
  // Destructure artInfo object
  const { _id, base64Image, imageName, createdAt, isPublic, likes } = artInfo;

  // State for public status
  const [publicStatus, setPublicStatus] = useState(isPublic);

  // Calculate elapsed time since creation
  let createdAtDisplay = useElapsedTimeCalc(createdAt);

  // Function to share/unshare art
  const shareArt = async () => {
    // Toggle public status
    let newPublicStatus = !publicStatus;
    setPublicStatus(newPublicStatus);

    try {
      // Call API to update art's public status
      await publishArt(_id, newPublicStatus);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="col">
        <div className="card shadow-sm art-card">
          <img src={base64Image} className="card-img-top" alt={imageName} />
          <div className="card-body p-0">
            <div className="d-flex py-1">
              {/* Display elapsed time */}
              <div className="ps-2 pe-1 text-small me-auto text-body-secondary created-at-display">
                {createdAtDisplay}
              </div>
              <div className="mx-auto vr" />
              {/* Display like count */}
              <div className="text-small like-btn">
                {likes.length} &nbsp;
                <i className="bi bi-hand-thumbs-up"></i>
              </div>
            </div>
            <div>
              {/* Display image name */}
              <div className="text-small px-1 overflow-hidden">{imageName}</div>
            </div>
            <div className="my-1 p-2 d-flex justify-content-between align-items-center">
              <div className="btn-group">
                {/* Button to share/unshare art */}
                <button
                  onClick={shareArt}
                  type="button"
                  className={`btn btn-sm ${
                    publicStatus
                      ? "btn-outline-danger"
                      : "btn-outline-secondary"
                  }`}
                >
                  {publicStatus ? "unshare" : "Share"}
                </button>
                {/* Button to edit art */}
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => onEditClick(artInfo)}
                >
                  Edit
                </button>{" "}
              </div>
              {/* Button to delete art */}
              <button
                type="button"
                className="btn btn-sm btn-outline-danger"
                onClick={() => onDeleteClick(artInfo)}
              >
                <i className="bi bi-trash3"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CollectionCard;
