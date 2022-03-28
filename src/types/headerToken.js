import { globalApi } from "./api.types";
import Axios from "axios";

const accessToken = localStorage.token;
const apiUrl = globalApi;

const AuthAxios = Axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

export const authAxios = AuthAxios;
