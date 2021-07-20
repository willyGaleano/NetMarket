import { instanciaSinToken, requestgenerico } from "../services/HttpCliente";
import { uploadImage } from "../firebase";

export const getUsuarioById = (id) => {
  return new Promise((resolve, reject) => {
    requestgenerico
      .get(`/api/usuario/account/${id}`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const agregarRole = (id, role, dispatch) => {
  return new Promise((resolve, reject) => {
    requestgenerico
      .put(`/api/usuario/role/${id}`, role)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const getUsuarios = (request) => {
  return new Promise((resolve, reject) => {
    requestgenerico
      .get(
        `/api/usuario/pagination?pageIndex=${request.pageIndex}&pageSize=${request.pageSize}&search=${request.search}`
      )
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const actualizarUsuario = async (id, usuario, dispatch) => {
  if (usuario.file) {
    const urlImage = await uploadImage(usuario.file);
    usuario.imagen = urlImage;
  }

  return new Promise((resolve, reject) => {
    requestgenerico
      .put(`/api/usuario/actualizar/${id}`, usuario)
      .then((response) => {
        dispatch({
          type: "ACTUALIZAR_USUARIO",
          nuevoUsuario: response.data,
          autenticado: true,
        });
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const registrarUsuario = (usuario, dispatch) => {
  return new Promise((resolve, reject) => {
    instanciaSinToken
      .post("/api/usuario/registrar", usuario)
      .then((response) => {
        dispatch({
          type: "INICIAR_SESION",
          sesion: response.data,
          autenticado: true,
        });

        resolve(response);
      })
      .catch((err) => {
        resolve(err.response);
      });
  });
};

export const loginUsuario = (usuario, dispatch) => {
  return new Promise((resolve, reject) => {
    instanciaSinToken
      .post("api/usuario/login", usuario)
      .then((response) => {
        dispatch({
          type: "INICIAR_SESION",
          sesion: response.data,
          autenticado: true,
        });
        resolve(response);
      })
      .catch((err) => {
        resolve(err.response);
      });
  });
};

export const getUsuario = (dispatch) => {
  return new Promise((resolve, reject) => {
    requestgenerico
      .get("api/usuario")
      .then((response) => {
        dispatch({
          type: "INICIAR_SESION",
          sesion: response.data,
          autenticado: true,
        });
        resolve(response);
      })
      .catch((err) => {
        resolve(err.response);
      });
  });
};
