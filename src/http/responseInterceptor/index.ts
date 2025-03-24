import { ApiResponse } from "../../types/ArtifactsTypes";
import { AxiosInstance } from "axios";

const responseInterceptor = (http: AxiosInstance) => {
  http.interceptors.response.use(
    (response: { data: ApiResponse<unknown>; }) => {
      const { data } = response;
      if (data.code !== 0) {
        return Promise.reject(new Error(data.message));
      }
      return data.data;
    },
    (error: string) => Promise.reject(error)
  );
};

export default responseInterceptor;
