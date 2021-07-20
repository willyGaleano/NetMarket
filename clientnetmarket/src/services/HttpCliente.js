import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_URL_BASE;

axios.interceptors.request.use(
  (config) => {
    const token_seguridad = window.localStorage.getItem("token");

    //ahora todos los request que envia mi servidor van a incluir el token que se encuentra
    //en el browser
    if (token_seguridad) {
      config.headers.authorization = `Bearer ${token_seguridad}`;
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

const requestgenerico = {
  get: (url) => axios.get(url),
  post: (url, body) => axios.post(url, body),
  put: (url, body) => axios.put(url, body),
  delete: (url) => axios.delete(url),
};

const instanciaSinToken = axios.create();
instanciaSinToken.CancelToken = axios.CancelToken;
instanciaSinToken.isCancel = axios.isCancel;

export { requestgenerico, instanciaSinToken };
