import { useEffect, useState, useMemo } from "react";
import artServices from "../services/artServices";
import { Link } from "react-router-dom";
import AlbumCard from "./common/albumCard";
import { getUserInfos } from "../services/userServices";
import PageHeader from "./common/pageHeader";
import Pagination from "./common/pagination";
import { Select } from "./common/inputs";
import { useAuth } from "../context/authContextProvider";
import { toast } from "react-toastify";

const MainAlbum = () => {
  const [publicData, setPublicData] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("all");
  const [displayData, setDisplayData] = useState(publicData);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(Number);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user } = useAuth();

  // Pagination items per page definition
  const itemsPerPage = 25;

  // Fetch and combine all public art from the database and all public creator's IDs
  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await artServices.getAllShared();
      const users = response.data.map((art) => art.user_id);
      const userResponse = await getUserInfos({ users });

      // Combine art with corresponding usernames
      const artWithUserNames = response.data.map((art) => {
        const matchId = userResponse.data.find((u) => u._id === art.user_id);
        return matchId ? { ...art, user_name: matchId.name } : art;
      });

      setPublicData(artWithUserNames);
      setDisplayData(artWithUserNames);

      // Calculate the last page number
      setLastPage(
        Math.max(Math.ceil(artWithUserNames.length / itemsPerPage), 1)
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

  // Start the data fetching on load
  useEffect(() => {
    fetchData();
  }, []);

  // Update the displayed data based on the search and sort input
  useEffect(() => {
    if (search === "" && sort === "all") {
      setDisplayData(publicData);
    }
    if (sort === "liked") {
      setDisplayData(
        publicData.filter(
          (art) =>
            art.likes.includes(user._id) &&
            (art.user_name.toLowerCase().includes(search) ||
              art.imageName.toLowerCase().includes(search))
        )
      );
    } else {
      setDisplayData(
        publicData.filter(
          (art) =>
            art.user_name.toLowerCase().includes(search) ||
            art.imageName.toLowerCase().includes(search)
        )
      );
    }

    setLastPage(Math.max(Math.ceil(displayData.length / itemsPerPage), 1));
  }, [search, publicData, sort]);

  // Divide the data into pages
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    setLastPage(Math.max(Math.ceil(displayData.length / itemsPerPage), 1));
    return displayData.slice(start, start + itemsPerPage);
  }, [currentPage, displayData]);

  // Handle the change of the search input
  const handleSearchChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearch(searchValue);
  };

  // Handle the change of the sort input
  const handleSortChange = (e) => {
    const sortValue = e.target.value;
    setSort(sortValue);
  };

  // Set public data by handling like and dislike actions
  const handleLikeDislike = (artId, liked) => {
    setPublicData((prevData) =>
      prevData.map((art) =>
        art._id === artId
          ? {
              ...art,
              likes: liked
                ? [...art.likes, user._id]
                : art.likes.filter((id) => id !== user._id),
            }
          : art
      )
    );
  };

  // Define the parameters for the page header
  const headerParams = {
    header: `Our user creations`,
    pTextDirection: "text-center",
    paragraph: `Create ,view and edit your own AI generated art collection`,
    element1: (
      <div className="container row justify-content-evenly mx-auto">
        <Link to={"/ai-art"} className="btn col-md-4 btn-primary my-2">
          create new art
        </Link>{" "}
        <Link to={"/collections"} className="btn col-md-4 btn-primary my-2">
          share from collection
        </Link>
      </div>
    ),
  };

  // Define sort selector options
  const sortOptions = [
    { label: "all", value: "all" },
    { label: "liked", value: "liked" },
  ];

  // Render the component
  return (
    <>
      <section className="py-5 text-center container">
        <PageHeader params={headerParams} />
        <div className="album py-lg-5 py-sm-2">
          <form>
            <div className="input-group mb-3">
              <input
                type="search"
                className="form-control"
                placeholder="Search by title or creator"
                aria-label="table search"
                aria-describedby="search-bar"
                onChange={handleSearchChange}
              />
            </div>
          </form>
          <div className={"my-lg-2 my-1 start col-lg-2 col-sm-4"}>
            {user && (
              <Select
                name={"sort"}
                small
                aria-describedby="sort-select"
                options={sortOptions}
                floating
                label={"sort by"}
                onChange={handleSortChange}
              />
            )}
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error.message}</div>
          ) : (
            <>
              <div className="row row-cols-1 row-cols-xs-2 row-cols-md-3 row-cols-lg-5 g-4">
                {paginatedData.map((art) => (
                  <AlbumCard
                    key={art._id}
                    artInfo={art}
                    onLikeDisLike={handleLikeDislike}
                  />
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                lastPage={lastPage}
                setCurrentPage={setCurrentPage}
              />
            </>
          )}
        </div>
      </section>
    </>
  );
};
export default MainAlbum;
