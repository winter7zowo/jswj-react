
const requestInterceptor = (http: Axios.AxiosInstance) => {
  http.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config!.headers!.common['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};

export default requestInterceptor;