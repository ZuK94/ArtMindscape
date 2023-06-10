const AboutHero = ({
  image,
  heading,
  paragraph,
  id,
  nexRefId,
  prevRefId,
  reversed,
  link,
}) => {
  return (
    <>
      {/* Section for the about hero, styles change based on whether 'reversed' is true or false */}
      <section
        className={`about-hero d-flex justify-content-center ${
          reversed && " bg-dark text-secondary"
        }`}
        id={id}
      >
        {/* Container for image and text, direction depends on 'reversed' prop */}
        <div
          className={`container p-0 row ${
            reversed ? "flex-lg-row-reverse" : "flex-lg-row"
          } align-items-center mb-md-5 g-5 py-5`}
        >
          {/* Image container */}
          <div className="col-10 col-sm-8 col-lg-6">
            <img
              src={image}
              className="d-block mx-lg-auto img-fluid border rounded"
              alt="main page"
              width="700"
              height="500"
              loading="lazy"
            />
          </div>

          {/* Text and button container */}
          <div className="col-lg-6">
            {/* Heading with style changes based on 'reversed' prop */}
            <h1
              className={`display-5 text-white fw-bold ${
                reversed ? "bg-dark text-secondary" : "text-body-emphasis"
              }  lh-1 mb-3`}
            >
              {heading}
            </h1>

            {/* Lead paragraph */}
            <p className="lead start">{paragraph}</p>

            {/* Navigation buttons */}
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              {/* 'next' button, only renders if 'nexRefId' is provided */}
              {nexRefId && (
                <a
                  href={nexRefId}
                  type="button"
                  className={`btn ${
                    reversed ? "btn-outline-info fw-bold" : "btn-primary"
                  }  btn-lg px-3 me-md-2 `}
                >
                  next
                </a>
              )}

              {/* 'previous' button, only renders if 'prevRefId' is provided */}
              {prevRefId && (
                <a
                  href={prevRefId}
                  type="button"
                  className={`btn btn-lg px-4 ${
                    reversed ? "btn-outline-light" : "btn-outline-secondary"
                  } `}
                >
                  previous
                </a>
              )}

              {/* Optional link, only renders if 'link' prop is provided */}
              {link && <div className="ms-md-auto">{link}</div>}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// Component export
export default AboutHero;
