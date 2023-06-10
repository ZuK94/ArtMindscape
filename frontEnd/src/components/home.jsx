import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContextProvider";
import { useEffect, useState } from "react";
import { getRandomArt } from "../services/artServices";
import { toast } from "react-toastify";

const Home = () => {
  // State variables
  const { user } = useAuth();
  const [carouselArt, setCarouselArt] = useState([]);
  const [carouselError, setCarouselError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch random artwork for the carousel
    const fillCarousel = async () => {
      try {
        const response = await getRandomArt(9);
        setCarouselArt(response.data);
      } catch ({ response }) {
        // Handle errors during fetching and set the carousel error message
        if (
          response.status === 500 ||
          response.status === 400 ||
          response.status === 401
        ) {
          setCarouselError(response.data);
        }
      }
    };

    fillCarousel();
  }, []);

  // Helper function to chunk the carousel artwork into groups of 3
  const chunkArray = (myArray, chunkSize) => {
    let index = 0;
    const arrayLength = myArray.length;
    const tempArray = [];

    for (index = 0; index < arrayLength; index += chunkSize) {
      const myChunk = myArray.slice(index, index + chunkSize);
      tempArray.push(myChunk);
    }

    return tempArray;
  };

  // Render the carousel items
  const renderCarouselItems = (carouselArt) => {
    const carouselItems = chunkArray(carouselArt, 3);
    return carouselItems.map((items, index) => (
      <div
        key={index}
        className={`carousel-item ${index === 0 ? "active" : ""}`}
      >
        {items.map((item) => (
          <img
            key={item._id}
            src={item.base64Image}
            className="d-inline-block mx-2 w-25"
            alt={item.imageName}
          />
        ))}
      </div>
    ));
  };

  return (
    <>
      {/* Header section */}
      <div id="home-header">
        <div className="overlay">
          <div className="container p-5 text-center ">
            <section className="row g-4">
              <h1 className="text-body-emphasis">Art MindScape</h1>
              <p className="col-lg-8 mx-auto text-large text-white text-shadow">
                Discover limitless creativity with Art MindScape, where AI meets
                artistic innovation. Unleash your inner artist and explore a
                world of unique, awe-inspiring designs. Join us now to
                revolutionize your artistic journey and unlock the future of art
                generation.
              </p>

              {/* Conditionally render content based on user authentication */}
              {user ? (
                <>
                  <div
                    className="col-lg-6 mt-5 mx-auto alert alert-dark start"
                    role="alert"
                    id="home-tip"
                  >
                    <h4>Pro tip:</h4>
                    To create an effective prompt for art-generating AI,
                    consider these key elements. Firstly,{" "}
                    <strong>clearly state the desired style</strong>, such as
                    "impressionist landscape" or "abstract expressionism."{" "}
                    <br /> For example,{" "}
                    <strong>
                      "Produce a vibrant cubist portrait with bold geometric
                      shapes and contrasting colors." <br />
                    </strong>
                    Secondly, <strong>specify the subject matter</strong>, like
                    "a serene beach scene at sunset" or "a futuristic cityscape
                    at night." For instance,{" "}
                    <strong>
                      "Generate a surrealistic cityscape with towering
                      skyscrapers and flying cars."
                    </strong>{" "}
                    <br />
                    Lastly,{" "}
                    <strong>
                      provide specific references or mood descriptions
                    </strong>
                    like "inspired by Van Gogh's 'Starry Night' but with a
                    cyberpunk twist." This way, you can inspire the AI to create
                    remarkable and tailored artwork.
                  </div>
                  {/* Render "Start Creating" button for authenticated users with "editor" or "web-admin" role */}
                  {user?.role === "editor" || user?.role === "web-admin" ? (
                    <NavLink
                      to={"/ai-art"}
                      style={{ textDecoration: "none" }}
                      className="col-lg-4 p-2 box border rounded mx-auto my-auto text-white"
                    >
                      <span className="fs-3">start creating</span>
                      <br />
                      <span className="fs-6">NOW</span>
                    </NavLink>
                  ) : null}
                </>
              ) : (
                <>
                  {/* Render "Start Creating" button for non-authenticated users */}
                  <section className="row mt-5">
                    <NavLink
                      to={"/sign-up-plans"}
                      style={{ textDecoration: "none" }}
                      className="col-sm-4 p-2 box border rounded mx-auto text-white"
                    >
                      <span className="fs-3">start creating</span>
                      <br />
                      <span className="fs-6">with EDITOR mode</span>
                    </NavLink>
                  </section>
                  {/* Render sign-up and sign-in buttons for non-authenticated users */}
                  <div className="d-flex justify-content-center gap-2 my-5">
                    <NavLink to={"/sign-up-plans"}>
                      <button
                        className="align-items-center home-btn reg  btn-md px-4 rounded-pill"
                        type="button"
                      >
                        Sign Up &nbsp; <i className="bi bi-pen" />
                      </button>
                    </NavLink>
                    <NavLink to={"/log-in"}>
                      <button
                        className="log home-btn btn-md px-4 rounded-pill"
                        type="button"
                      >
                        Sign In
                      </button>
                    </NavLink>
                  </div>
                </>
              )}
            </section>
          </div>
        </div>
      </div>

      {/* Carousel section */}
      {carouselArt ? (
        <section id="home-carousel">
          <h1
            className="navigator d-inline-block "
            onClick={() => {
              navigate("/album");
            }}
          >
            visit our user creations album
          </h1>
          <div
            id="carousel"
            className="carousel slide container"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              {carouselArt && renderCarouselItems(carouselArt)}
            </div>
          </div>
        </section>
      ) : (
        carouselError && (
          // Render error message when there is a problem retrieving the carousel artwork
          <div
            onClick={() => {
              navigate("/album");
            }}
            className="alert alert-danger d-flex justify-content-center align-items-center navigator"
            role="alert"
          >
            <div>
              It seems there is a problem retrieving the gallery. <br /> Click
              here to move to the main album
            </div>
            &nbsp;&nbsp;&nbsp;
            <i className="bi bi-exclamation-triangle flex-shrink-0 me-2"></i>
          </div>
        )
      )}
    </>
  );
};

export default Home;
