import axios from "axios";
import config from "../configs/config.json";

export function setCommonHeader(headerName, value) {
  axios.defaults.headers.common[headerName] = value;
}

axios.defaults.baseURL = config.API_URL;

const httpServices = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};

export default httpServices;
