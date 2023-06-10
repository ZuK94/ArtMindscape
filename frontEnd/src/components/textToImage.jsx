import { textToImage } from "../services/aiServices";
import { Input, Select, Textarea } from "./common/inputs";
import { useState } from "react";
import { useFormik } from "formik";
import Joi from "joi";
import formikValidationUsingJoi from "../utils/formikValidationUsingJoi";
import CircleLoader from "react-spinners/CircleLoader";
import PageHeader from "./common/pageHeader";
import { imageToBase64 } from "../utils/imageToBase64";
import { toast } from "react-toastify";

const TextToImageGenerator = ({
  setImageParams,
  setImageUrl,
  setBase64Image,
}) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // CSS properties for loading spinner
  const CSSProperties = {
    margin: "0 auto",
  };

  // Make API request to convert text to image
  async function getTextToImage(params) {
    try {
      const response = await textToImage(params);
      const { data, headers } = response;
      if (headers && headers["content-type"]) {
        const blob = new Blob([data], { type: headers["content-type"] });
        const Base64Image = await imageToBase64(blob);
        const imageUrl = URL.createObjectURL(blob);
        setBase64Image(Base64Image);
        setImageUrl(imageUrl);
        return response;
      } else {
        toast.error("An error has occurred", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.error("Error: Content-Type header is missing or undefined.");
      }
    } catch ({ response }) {
      toast.error("An error has occurred", {
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
  }

  // Form validation using Formik and Joi
  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      prompt:
        "generate a surreal cityscape blending elements of New York City and an underwater ocean world",
      guidance: 7,
      steps: 30,
      sampler: "euler_a",
      upscale: 1,
      negative_prompt:
        "ugly, tiling, poorly drawn hands, poorly drawn feet, poorly drawn face, out of frame, extra limbs, disfigured, deformed, body out of frame, blurry, bad anatomy, blurred, watermark, grainy, signature, cut off, draft",
      model: "epic_diffusion_1_1",
    },
    validate: formikValidationUsingJoi({
      prompt: Joi.string().max(1000).required(),
      guidance: Joi.number().min(-20).max(20),
      steps: Joi.number().min(10).max(150),
      sampler: Joi.string(),
      upscale: Joi.number().min(1).max(2),
      negative_prompt: Joi.string().max(1000),
      model: Joi.string(),
    }),
    async onSubmit(values) {
      setLoading(true);
      try {
        setImageParams(values);
        const response = await getTextToImage(values);

        response.status === 200 && setLoading(false);
      } catch ({ response }) {
        setLoading(false);
        if (response.status === 400 || 500 || 404) setError(response.data);
      }
    },
  });

  const upscaleOptions = [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
  ];

  const modelOptions = [
    { label: "Epic diffusion 1.1", value: "epic_diffusion_1_1" },
    { label: "Steampunk diffusion", value: "steampunk_diffusion" },
    {
      label: "Stable diffusion 2.1 (512px)",
      value: "stablediffusion_2_1_512px",
    },
    { label: "Synthwave punk v2", value: "synthwavepunk_v2" },
    { label: "Emoji diffusion", value: "emoji_diffusion" },
  ];

  const headerParams = {
    header: "Create a new art piece",
    pTextDirection: "text-start",
  };

  return (
    <>
      <section className="py-5 text-center container">
        <PageHeader params={headerParams} />

        {/* User image parameters form */}
        <form
          onSubmit={form.handleSubmit}
          autoComplete="off"
          noValidate
          name="textToImage"
          className=" form-floating px-5 form d-grid gap-3 col-lg-6  mx-auto"
        >
          <Textarea
            name="prompt"
            type="text"
            label="Prompt"
            style={{ height: "100px" }}
            error={form.touched.prompt && form.errors.prompt}
            {...form.getFieldProps("prompt")}
          />
          <Input
            name="guidance"
            type="number"
            label="Guidance"
            error={form.touched.guidance && form.errors.guidance}
            {...form.getFieldProps("guidance")}
          />
          <Input
            name="steps"
            type="number"
            label="Steps"
            error={form.touched.steps && form.errors.steps}
            {...form.getFieldProps("steps")}
          />
          <Select
            floating
            name="upscale"
            label="Upscale"
            options={upscaleOptions}
            error={form.touched.upscale && form.errors.upscale}
            {...form.getFieldProps("upscale")}
          />
          <Select
            floating
            name="model"
            label="AI model"
            options={modelOptions}
            error={form.touched.model && form.errors.model}
            {...form.getFieldProps("model")}
          />
          {loading ? (
            <div>
              <CircleLoader
                cssOverride={CSSProperties}
                color="#ac36d6"
                speedMultiplier={0.6}
              />
              AI stuff in progress
            </div>
          ) : (
            <button
              type="submit"
              className={`btn btn-primary  ${loading && "disabled"}`}
            >
              Submit
            </button>
          )}
          {error ? (
            <div
              className="alert alert-danger d-flex justify-content-center align-items-center"
              role="alert"
            >
              <i className="bi bi-exclamation-triangle flex-shrink-0 me-2"></i>
              <div>{error}</div>
            </div>
          ) : null}
        </form>
      </section>
    </>
  );
};

export default TextToImageGenerator;
