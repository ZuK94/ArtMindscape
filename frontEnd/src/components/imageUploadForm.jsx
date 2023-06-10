import { Input, Textarea } from "./common/inputs";
import { useFormik } from "formik";
import Joi from "joi";
import formikValidationUsingJoi from "../utils/formikValidationUsingJoi";
import { uploadNewImage } from "../services/artServices";
import Lottie from "lottie-react";
import saveButton from "../lottie/saveButton.json";
import { useNavigate } from "react-router-dom";
import PageHeader from "./common/pageHeader";
import { toast } from "react-toastify";

const ImageUploadForm = ({ image, base64Image, imageParams }) => {
  // Destructure props
  const { prompt, model } = imageParams;

  // Access the navigation functionality from React Router
  const navigate = useNavigate();

  // Formik setup
  const form = useFormik({
    // Form validation options
    validateOnMount: true,
    enableReinitialize: true,
    initialValues: {
      imageName: "",
      base64Image: base64Image,
      prompt: prompt,
      model: model,
    },
    validate: formikValidationUsingJoi({
      imageName: Joi.string().max(60).required().label("Art name"),
      base64Image: Joi.string(),
      prompt: Joi.string(),
      model: Joi.string(),
    }),
    // Form submission handler
    async onSubmit(values) {
      try {
        await uploadNewImage(values);
        toast.success("Art has been saved", {
          // Toast notification options
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/collections");
      } catch (error) {
        toast.error("An error occurred", {
          // Toast notification options
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    },
  });

  // Page header parameters
  const headerParams = {
    header: "It's ready!",
    pTextDirection: "text-center",
    paragraph: "You can now save and then share from your collection!",
  };

  return (
    <section className="py-5 text-center container">
      {/* Display the page header */}
      <PageHeader params={headerParams} />
      <div
        id="image-upload-form"
        className="row py-lg-5 py-sm-2 g-3 justify-content-center"
      >
        {/* Display the uploaded image */}
        <img className="col-lg-8 p-3 col-sm-6" src={image} alt="AI response" />
        {/* Form for submitting image details */}
        <form
          onSubmit={form.handleSubmit}
          autoComplete="off"
          noValidate
          name="imageUpload"
          className="form-floating p-3 form col-lg-4 col-sm-6"
        >
          <div className="d-grid gap-2">
            {/* Input for image name */}
            <Input
              name="imageName"
              type="text"
              label="Give your art a name"
              error={form.touched.imageName && form.errors.imageName}
              {...form.getFieldProps("imageName")}
            />
            {/* Textarea for prompt */}
            <Textarea
              name="prompt"
              type="text"
              label="Prompt used for creation"
              readOnly
              style={{ height: "150px" }}
              {...form.getFieldProps("prompt")}
            />
            {/* Input for model */}
            <Input
              name="model"
              type="text"
              label="Made with"
              readOnly
              {...form.getFieldProps("model")}
            />
            <br />
          </div>
          {/* Submit button with animation */}
          <button type="submit" className="button mt-auto">
            <Lottie animationData={saveButton} />
          </button>
        </form>
      </div>
    </section>
  );
};

export default ImageUploadForm;
