import { AxiosInstance } from "axios";
import { ApiError } from "../../util";
import { ExceptionConstants } from "../../errorCode";

const responseInterceptor = (http: AxiosInstance) => {
  http.interceptors.response.use(
    (response) => {
      const { data } = response;
      if (data.code !== ExceptionConstants.SUCCESS) {
        console.error(data.message);
        return Promise.reject(new ApiError(data.message, data.code));
      }
      return data.data;
    },
    (error: string) => {
        console.error(error);
        return Promise.reject(error);
    }
  );
};

export default responseInterceptor;
