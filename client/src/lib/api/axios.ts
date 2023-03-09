import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const BASE_URL_DEV = process.env.REACT_APP_BASE_URL_DEV;

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "x-CSRFToken";
axios.defaults.baseURL = BASE_URL_DEV;

if (process.env.NODE_DEV === "production") {
  axios.defaults.baseURL = BASE_URL;
} else if (process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = BASE_URL_DEV;
}

/**쿠키를 싣고가야하는 요청 axios */
export const axiosPrivate = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axios.create({
  headers: { "Content-Type": "application/json" },
});
