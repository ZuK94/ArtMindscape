import Joi from "joi";
import formikValidationUsingJoi from "../../utils/formikValidationUsingJoi";
import { useFormik } from "formik";
import { Input, Textarea } from "./inputs";
import useElapsedTimeCalc from "../../hooks/useElapsedTimeCalc";
import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import { updateImage } from "../../services/artServices";
import { toast } from "react-toastify";

// Define the ArtModal component
const ArtModal = (props) => {
  const { updatecollection, selectedart, ...otherProps } = props;

  // Define the selected art piece
  const art = selectedart;
  const { _id, base64Image, imageName, createdAt } = art;

  // Calculate the creation time of the art piece
  let createdAtDisplay = useElapsedTimeCalc(createdAt);

  // Define the formik form
  const form = useFormik({
    validateOnMount: true,
    enableReinitialize: true,

    // Initial values
    initialValues: {
      imageName: art?.imageName || "",
      prompt: art?.prompt,
      model: art?.model,
    },

    // Define the validation schema
    validate: formikValidationUsingJoi({
      imageName: Joi.string().min(2).max(200).required().messages({
        "string.empty": "image name can not be empty",
        "string.min": "image name must be at least 2 characters long",
        "string.max":
          "image name must be less than or equal to 200 characters long",
      }),
      prompt: Joi.string().required(),
      model: Joi.string().required(),
    }),

    // Define the onSubmit method
    async onSubmit(values) {
      try {
        const response = await updateImage(_id, values);
        props.onHide();
        updatecollection((prevCollection) =>
          prevCollection.map((art) => (art._id === _id ? response.data : art))
        );
        toast.success("art has been updated", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } catch ({ response }) {
        console.error(response);
        toast.error("an error occurred", {
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
        form.resetForm();
      }
    },
  });

  // Return null if there's no art selected
  if (!art) {
    return null;
  }

  // Render the modal
  return (
    <>
      <Modal
        {...otherProps}
        size="lg"
        backdrop="static"
        keyboard={false}
        fullscreen={"sm-down"}
        centered
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <Container>
            <Row>
              <Col sm={12} md={6}>
                <img className="w-100" src={base64Image} alt={imageName} />
              </Col>
              <Col className="ms-auto overflow-hidden" sm={12} md={6}>
                <h5>{imageName}</h5>
                {/* Start of the Form */}
                <form
                  autoComplete="off"
                  noValidate
                  className="d-flex flex-column form justify-content-evenly"
                  id="artUpdate"
                  onSubmit={form.handleSubmit}
                  style={{ minHeight: "80%" }}
                >
                  {/* Input for Art name */}
                  <Input
                    name="imageName"
                    type="text"
                    label="Art name"
                    error={form.touched.imageName && form.errors.imageName}
                    {...form.getFieldProps("imageName")}
                  />
                  {/* Textarea for the prompt used for creation */}
                  <Textarea
                    name="prompt"
                    type="text"
                    label="prompt used for creation "
                    readOnly
                    disabled
                    style={{ height: "150px" }}
                    {...form.getFieldProps("prompt")}
                  />
                  {/* Input for the AI model */}
                  <Input
                    name="model"
                    type="text"
                    label="AI model"
                    disabled
                    readOnly
                    {...form.getFieldProps("model")}
                  />
                </form>
                {/* Displaying the creation time of the art */}
                <span>created: {createdAtDisplay}</span>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          {/* Submit button for the form */}
          <Button
            size="sm"
            form="artUpdate"
            type="submit"
            className="btn btn-primary"
          >
            Submit
          </Button>
          {/* Button to close the modal */}
          <Button size="sm" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

// Export the ArtModal component
export default ArtModal;
