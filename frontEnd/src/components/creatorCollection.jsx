import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCreatorArt } from "../services/artServices";
import CreatorCard from "./common/creatorCard";
import { getUserInfos } from "../services/userServices";
import PageHeader from "./common/pageHeader";
import { toast } from "react-toastify";

const CreatorCollection = () => {
  // Get the creator_id from the URL parameters
  const { creator_id } = useParams();

  // State variables
  const [creatorArt, setCreatorArt] = useState([]);
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    // Fetch creator's art collection and user information
    const getCollection = async () => {
      try {
        // Fetch creator's art collection
        const response = await getCreatorArt(creator_id);
        setCreatorArt(response.data);

        // Fetch user information
        const userResponse = await getUserInfos({ users: [creator_id] });
        setUserInfo(userResponse.data);
      } catch (error) {
        console.error(error);
        // Display an error toast if an error occurs during fetching
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

    getCollection();
  }, [creator_id]);

  // If user information is not available, return null
  if (userInfo.length === 0) {
    return null;
  }

  // Parameters for the PageHeader component
  const headerParams = {
    header: `Art by ${userInfo[0].name}`,
    pTextDirection: "text-start",
  };

  return (
    <>
      <section className="py-5 text-center container">
        <PageHeader params={headerParams} />

        <div className="album py-lg-5 py-sm-2">
          <div className="row row-cols-1 row-cols-xs-2 row-cols-md-3 row-cols-lg-5 g-4">
            {/* Render creator's art cards */}
            {creatorArt && userInfo ? (
              creatorArt.map((art) => {
                return <CreatorCard key={art._id} artInfo={art} />;
              })
            ) : (
              // Display a message if the user collection is empty
              <>
                <h2>This user collection is empty</h2>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default CreatorCollection;
