import axios from "axios";
import { getFromLocalStorage } from "../../utils/local-storage";
import { authKey } from "../../constant/global";

const instance = axios.create();
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 30000;

// ✅ Request Interceptor
instance.interceptors.request.use(
  function (config) {
    const accessToken = getFromLocalStorage(authKey);

    if (accessToken) {
      config.headers.Authorization = `${accessToken}`;
    }

    // 🧩 যদি FormData হয়, তাহলে Content-Type বাদ দাও যেন axios auto সেট করে
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// ✅ Response Interceptor
instance.interceptors.response.use(
  function (response) {
    const responseObject = {
      data: response?.data?.data,
      meta: response?.data?.meta,
    };
    return responseObject;
  },
  async function (error) {
    const responseObject = {
      statusCode: error?.response?.data?.statusCode || 500,
      message: error?.response?.data?.message || "Something went wrong!",
      errorMessages: error?.response?.data?.message,
      errorSources: error?.response?.data?.errorSources,
    };

    return { error: responseObject };
  }
);

export { instance };
