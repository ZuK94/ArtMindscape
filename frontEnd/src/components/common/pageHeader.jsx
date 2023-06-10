const PageHeader = ({ params }) => {
  // Destructure the parameters object
  const { header, paragraph, element1, element2, pTextDirection } = params;

  return (
    <>
      <div className="row pb-lg-3 pb-sm-2">
        <div className="col-lg-6 col-md-8 col-sm-10 mx-auto">
          {/* Header */}
          <h1 className="fw-light">{header}</h1>

          {/* Paragraph */}
          <p className={`lead text-body-secondary ${pTextDirection}`}>
            {paragraph}
          </p>

          {/* Element 1 */}
          <>{element1}</>

          {/* Element 2 */}
          <>{element2}</>
        </div>
      </div>
    </>
  );
};

export default PageHeader;
