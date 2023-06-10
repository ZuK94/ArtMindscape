import { NavLink } from "react-router-dom";

const Footer = (props) => {
  let date = new Date();
  let year = date.getFullYear();

  return (
    <>
      <div className="container">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <div>
            <a
              href="/"
              className="d-flex align-items-center mb-3 link-dark text-decoration-none"
            >
              <h2>
                Art Mind
                <span className="purple">S</span>cape
              </h2>
            </a>
            <p className="text-muted">© {year}</p>
          </div>

          <ul className="nav col-md-4 justify-content-end">
            <li className="nav-item">
              <NavLink to={"/"} className="nav-link px-2 text-body-secondary">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={"/about"}
                className="nav-link px-2 text-body-secondary"
              >
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <button
                onClick={() => props.handleShow()}
                className="nav-link px-2 text-body-secondary"
              >
                Contact us
              </button>
            </li>
            <li className="nav-item">
              <NavLink
                target="_blanc"
                to={"https://github.com/ZuK94"}
                className="nav-link px-2 text-body-secondary"
              >
                <i className="bi bi-github"></i>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                target="_blanc"
                to={"https://linkedin.com/in/davidzuk"}
                className="nav-link px-2 text-body-secondary"
              >
                <i className="bi bi-linkedin"></i>
              </NavLink>
            </li>
          </ul>
        </footer>
      </div>
    </>
  );
};
export default Footer;
