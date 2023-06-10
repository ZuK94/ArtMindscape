import httpServices from "./httpServices";

export async function textToImage(params) {
  return await httpServices.post("/api/text2image", params, {
    responseType: "arraybuffer",
  });
}

const aiServices = { textToImage };

export default aiServices;
