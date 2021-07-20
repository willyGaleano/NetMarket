import { uploadImage } from "../firebase";
import { instanciaSinToken, requestgenerico } from "../services/HttpCliente";

export const actualizarProducto = async (id, producto) => {
  if (producto.file) {
    const urlImage = await uploadImage(producto.file);
    producto.imagen = urlImage;
  }

  return new Promise((resolve, reject) => {
    requestgenerico
      .put(`/api/producto/${id}`, producto)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error);
      });
  });
};

export const registrarProducto = async (producto) => {
  if (producto.file) {
    const urlImage = await uploadImage(producto.file);
    producto.imagen = urlImage;
  }

  return new Promise((resolve, reject) => {
    requestgenerico
      .post("/api/producto", producto)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const getProductos = (request) => {
  return new Promise((resolve, reject) => {
    instanciaSinToken
      .get(
        `/api/producto?pageIndex=${request.pageIndex}&pageSize=${request.pageSize}&=${request.search}`
      )
      .then((response) => {
        //esto se devolvera al cliente
        resolve(response);
      });
  });
};

/* response 
    count:
    pageIndex:
    pageSize:
    pageCount:
    data:
*/

export const getProducto = (id) => {
  return new Promise((resolve, reject) => {
    instanciaSinToken
      .get(`/api/producto/${id}`)
      .then((response) => {
        //esto se devolvera al cliente
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
