import { NavLink, useNavigate } from "react-router-dom";
import PageHeader from "./common/pageHeader";

const SignUpPlans = () => {
  const navigate = useNavigate();

  // Function to handle viewer sign up
  const viewerSignUp = () => {
    navigate("/sign-up", { state: { plan: "viewer" } });
    return;
  };

  // Function to handle editor sign up
  const editorSignUp = () => {
    navigate("/sign-up", { state: { plan: "editor" } });
    return;
  };

  const headerParams = {
    header: "Unleash Your Creativity with AI",
    pTextDirection: "text-start",
    paragraph: (
      <>
        Step into the future of artistry with our AI Art Creation platform!
        <br />
        Craft stunning, unique artwork, effortlessly blending your creativity
        with the power of Artificial Intelligence. <br />
        <strong>Sign up today</strong>, and transform the way you create,
        explore, and appreciate art.
      </>
    ),
    element1: (
      <div className="card log-in-card">
        <div className="card-body row ">
          <h5 className="card-title col-sm-8 ">Already a member?</h5>
          <NavLink to={"/log-in"} className="btn btn-primary col-sm-4 ">
            Log in!
          </NavLink>
        </div>
      </div>
    ),
  };

  return (
    <>
      <section className="py-5 text-center container">
        <PageHeader params={headerParams} />
        <div className="container sign-up-plans">
          <div className="row row-cols-1 row-cols-sm-2 mb-3 text-center">
            <div className="col d-flex justify-content-center">
              <div className="card plan-card mb-4 rounded-3 shadow-sm h-100">
                <div className="card-header py-3">
                  <h4 className="my-0 fw-normal">Viewer</h4>
                </div>
                <div className="card-body">
                  <h1 className="card-title pricing-card-title">
                    $0<small className="text-muted fw-light">/mo</small>
                  </h1>
                  <ul className="list-unstyled">
                    <li>View what others created</li>
                    <li>Like your favorite content</li>
                  </ul>
                  <button
                    type="button"
                    className="w-100 btn btn-md btn-outline-dark"
                    onClick={viewerSignUp}
                  >
                    Sign up as viewer
                  </button>
                </div>
              </div>
            </div>
            <div className="col d-flex justify-content-center">
              <div className="card plan-card mb-4  rounded-3 shadow-sm  h-100">
                <div className="card-header text-bg-primary border-primary py-3">
                  <h4 className="my-0 fw-normal">Editor</h4>
                </div>
                <div className="card-body">
                  <h1 className="card-title pricing-card-title">
                    $15<small className="text-muted fw-light">/mo</small>
                  </h1>
                  <ul className="list-unstyled">
                    <li>Create your own art</li>
                    <li>Access to 4 AI models</li>
                    <li>Share created art</li>
                    <li>Like your favorite content</li>
                  </ul>
                  <button
                    onClick={editorSignUp}
                    type="button"
                    className="w-100 btn btn-md btn-primary"
                  >
                    Sign up as editor
                  </button>
                </div>
              </div>
            </div>
          </div>

          <h2 className="display-6 text-center mb-4">Compare plans</h2>

          <div className="table-responsive">
            <table className="table text-center">
              <thead>
                <tr>
                  <th style={{ width: "34%" }}></th>
                  <th style={{ width: "33%" }}>Viewer</th>
                  <th style={{ width: "33%" }}>Editor</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row" className="text-start">
                    View global content
                  </th>
                  <td>
                    <i className="bi sign-up-check bi-check-lg"></i>
                  </td>
                  <td>
                    <i className="bi sign-up-check bi-check-lg"></i>
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="text-start">
                    Favorite content
                  </th>
                  <td>
                    <i className="bi sign-up-check bi-check-lg"></i>
                  </td>
                  <td>
                    <i className="bi sign-up-check bi-check-lg"></i>
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="text-start">
                    Create art
                  </th>
                  <td>
                    <svg className="bi" width="24" height="24">
                      <use xlinkHref="#check"></use>
                    </svg>
                  </td>
                  <td>
                    <i className="bi sign-up-check bi-check-lg"></i>
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="text-start">
                    Sharing
                  </th>
                  <td></td>
                  <td>
                    <i className="bi sign-up-check bi-check-lg"></i>
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="text-start">
                    Private collection
                  </th>
                  <td></td>
                  <td>
                    <i className="bi sign-up-check bi-check-lg"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUpPlans;
