const axios = require("axios");
const { aiApiKey, aiApiHost } = require("../configs/config");

const textToImageInstance = axios.create({
  baseURL: "https://" + aiApiHost + "/text2image",
  method: "POST",

  headers: {
    "content-type": "application/x-www-form-urlencoded",
    "X-RapidAPI-Key": aiApiKey,
    "X-RapidAPI-Host": aiApiHost,
  },
  responseType: "arraybuffer",
});

module.exports = textToImageInstance;
