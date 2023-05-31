import axios from "axios";

const API_ROOT = "https://35.76.200.242/";

const instance = axios.create({
  baseURL: API_ROOT,
});

export default instance;
