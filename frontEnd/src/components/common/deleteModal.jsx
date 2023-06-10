import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteImage } from "../../services/artServices";
import { toast } from "react-toastify";

const DeleteModal = (props) => {
  const art = props.selectedart;
  const id = props.selectedart._id;

  // Function to delete the art
  const deleteArt = async () => {
    try {
      await deleteImage(id);
      props.onHide();
      toast.success("art has been deleted", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error("could not delete art", {
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
      window.location.reload(false);
    }
  };

  return (
    <>
      <Modal {...props} centered size="md">
        {/* Modal header */}
        <Modal.Header closeButton>
          {/* Modal title */}
          <Modal.Title className="overflow-hidden">
            Delete {art.imageName} ?
          </Modal.Title>
        </Modal.Header>

        {/* Modal body */}
        <Modal.Body>
          <img className="w-100" src={art.base64Image} alt={art.imageName} />
        </Modal.Body>

        {/* Modal footer */}
        <Modal.Footer>
          {/* Cancel button */}
          <Button size="sm" variant="secondary" onClick={props.onHide}>
            Don't Delete
          </Button>

          {/* Delete button */}
          <Button size="sm" variant="danger" onClick={deleteArt}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteModal;
