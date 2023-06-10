const textToImageInstance = require("../utils/T2IAxiosInstance");

async function getTextToImage(data) {
  // Appending params for AI art creation
  const params = new URLSearchParams();
  params.append("guidance", data?.guidance);
  params.append("prompt", data?.prompt);
  params.append("steps", data?.steps);
  params.append("sampler", data?.sampler);
  params.append("upscale", data?.upscale);
  params.append("negative_prompt", data?.negative_prompt);
  params.append("model", data?.model);

  const options = {
    data: params,
  };
  // Requesting AI generated art from API
  try {
    const response = await textToImageInstance.request(options);
    return { data: response.data, headers: response.headers };
  } catch (error) {
    console.error("Error:", error);
    return error;
  }
}

const apiServices = { getTextToImage };
module.exports = apiServices;
