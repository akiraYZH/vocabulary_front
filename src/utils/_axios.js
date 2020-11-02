import axios from "axios";
import qs from "qs";
axios.defaults.withCredentials = true;
axios.defaults.timeout = 5000; //请求超时的时间设定
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:7001/"
    : "https://francais-api.akirayu.cn";

// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    if (localStorage.getItem("authentication")) {
      config.headers["authentication"] =
        "bearer " + localStorage.getItem("authentication");
    }

    if (config.method === "post") {
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    // 保存token
    if (response.headers.authentication) {
      localStorage.setItem("authentication", response.headers.authentication);
    }
    return response;
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default axios;
