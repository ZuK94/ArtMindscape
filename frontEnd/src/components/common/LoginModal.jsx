import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { NavLink } from "react-router-dom";

const LoginModal = (props) => {
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        {/* Modal header */}
        <Modal.Header closeButton>
          <Modal.Title>please Log in</Modal.Title>
        </Modal.Header>

        {/* Modal body */}
        <Modal.Body>you must be a member to like and create posts</Modal.Body>

        {/* Modal footer */}
        <Modal.Footer>
          {/* Close button */}
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>

          {/* Log in button */}
          <NavLink to={"/log-in"} className="btn btn-primary" role="button">
            Log in
          </NavLink>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LoginModal;
