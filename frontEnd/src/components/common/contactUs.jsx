import Joi from "joi";
import formikValidationUsingJoi from "../../utils/formikValidationUsingJoi";
import { useFormik } from "formik";
import { Input, Textarea } from "./inputs";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import { submitForm } from "../../services/formServices";
import { toast } from "react-toastify";

const ContactModal = (props) => {
  // Destructure props
  const { show = { show }, handleClose = { handleClose } } = props;

  // State for error message
  const [error, setError] = useState("");

  // Formik form
  const form = useFormik({
    validateOnMount: true,
    enableReinitialize: true,

    // Initial form values
    initialValues: {
      name: "",
      email: "",
      message: "empty message",
    },

    // Form validation using Joi
    validate: formikValidationUsingJoi({
      name: Joi.string().min(2).max(40).required(),
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .min(6)
        .max(255)
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i)
        .messages({
          "string.pattern.base": "you must enter a valid Email address",
        })
        .required(),
      message: Joi.string().max(1024).optional(),
    }),

    // Form submission
    async onSubmit(values) {
      try {
        setError("");
        await handleSubmit(values);
        handleClose();
        form.resetForm();
      } catch (error) {
        console.error(error);
        setError("an error occurred while sending the details");
      }
    },
  });

  // Function to handle form submission
  const handleSubmit = async (values) => {
    console.log(values);
    const response = await submitForm(values);
    console.log(response);
    toast("Great! we got your message", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <>
      <Modal
        show={show}
        size="md"
        backdrop="static"
        keyboard={false}
        fullscreen={"sm-down"}
        centered
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Contact us
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <Container>
            <Row>
              <Col className="ms-auto overflow-hidden">
                {/* Form */}
                <form
                  autoComplete="off"
                  noValidate
                  className="d-flex flex-column gap-2 form justify-content-evenly"
                  id="artUpdate"
                  onSubmit={form.handleSubmit}
                  style={{ minHeight: "80%" }}
                >
                  {/* Input fields */}
                  <Input
                    name="name"
                    type="text"
                    label="your name"
                    error={form.touched.name && form.errors.name}
                    {...form.getFieldProps("name")}
                  />
                  <Input
                    name="email"
                    type="text"
                    label="email address"
                    error={form.touched.email && form.errors.email}
                    {...form.getFieldProps("email")}
                  />
                  <Textarea
                    name="message"
                    type="text"
                    label="enter your message here"
                    style={{ height: "150px" }}
                    {...form.getFieldProps("message")}
                  />
                </form>

                {/* Display error message if exists */}
                {error && (
                  <div
                    className="alert alert-danger d-flex justify-content-center align-items-center"
                    role="alert"
                  >
                    <i className="bi bi-exclamation-triangle flex-shrink-0 me-2"></i>
                    <div>{error}</div>
                  </div>
                )}
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          {/* Submit button */}
          <Button
            size="sm"
            form="artUpdate"
            type="submit"
            className="btn btn-primary"
          >
            Submit
          </Button>
          {/* Close button */}
          <Button size="sm" onClick={props.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ContactModal;
