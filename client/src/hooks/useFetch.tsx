import axios from "@/lib/api/axios";
import { AxiosRequestConfig } from "axios";

const useFetch = async <T extends {}>(url: string, config?: AxiosRequestConfig) => {
  const { data } = await axios.get<T>(url, config);
  return data;
};

export default useFetch;
