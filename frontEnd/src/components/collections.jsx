import { useEffect, useState, useMemo } from "react";
import artServices from "../services/artServices";
import { Link } from "react-router-dom";
import CollectionCard from "./common/collectionCard";
import ArtModal from "./common/artModal";
import DeleteModal from "./common/deleteModal";
import PageHeader from "./common/pageHeader";
import Pagination from "./common/pagination";
import { toast } from "react-toastify";

const Collections = () => {
  const [userCollection, setUserCollection] = useState([]);
  const [selectedArt, setSelectedArt] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(Number);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Pagination items per page definition
  const itemsPerPage = 25;

  // Fetch all user art from the database
  useEffect(() => {
    const getUserCollections = async () => {
      setLoading(true);

      try {
        const response = await artServices.getUserImages();
        setUserCollection(response.data);

        // Calculate the last page number
        setLastPage(
          Math.max(Math.ceil(response.data.length / itemsPerPage), 1)
        );
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

    // Start the data fetching
    getUserCollections();
  }, []);

  // --Handlers START--

  // card controls
  const handleEditClick = (art) => {
    setSelectedArt(art);
    setModalShow(true);
  };
  const handleDeleteClick = (art) => {
    setSelectedArt(art);
    setDeleteModalShow(true);
  };

  // modal controls
  const handleClose = () => setModalShow(false);
  const handleDeleteClose = () => setDeleteModalShow(false);

  // --Handlers END--

  // Divide the data into pages
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return userCollection.slice(start, start + itemsPerPage);
  }, [currentPage, userCollection]);

  // Define the parameters for the page header
  const headerParams = {
    header: `My Collection`,
    pTextDirection: "text-center",
    paragraph: ` Create ,view and edit your own AI generated art collection`,
    element1: (
      <div className="container mx-auto">
        <Link to={"/ai-art"} className="btn btn-primary my-2">
          create new art
        </Link>
      </div>
    ),
  };

  // Render the component
  return (
    <>
      <section className="py-5 text-center container">
        <PageHeader params={headerParams} />
        <div className="album py-lg-5 py-sm-2 ">
          <div className="container">
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>Error: {error.message}</div>
            ) : (
              <>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4">
                  {paginatedData &&
                    paginatedData.map((art) => {
                      return (
                        <CollectionCard
                          key={art._id}
                          artInfo={art}
                          onEditClick={handleEditClick}
                          onDeleteClick={handleDeleteClick}
                        />
                      );
                    })}
                </div>
                <Pagination
                  currentPage={currentPage}
                  lastPage={lastPage}
                  setCurrentPage={setCurrentPage}
                />
                {selectedArt && (
                  <DeleteModal
                    show={deleteModalShow}
                    onHide={handleDeleteClose}
                    selectedart={selectedArt}
                  />
                )}
                {selectedArt && (
                  <ArtModal
                    show={modalShow}
                    onHide={handleClose}
                    selectedart={selectedArt}
                    updatecollection={setUserCollection}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
export default Collections;
