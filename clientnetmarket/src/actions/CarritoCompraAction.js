import { instanciaSinToken } from "../services/HttpCliente";

export const getCarritoCompra = (dispatch, id) => {
  return new Promise((resolve, eject) => {
    instanciaSinToken
      .get(`api/carritocompra?id=${id}`)
      .then((response) => {
        dispatch({
          type: "CARRITO_SESION",
          id: response.data.id,
          items: response.data.items,
        });
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const setCarritoCompra = (dispatch, carritoCompra) => {
  return new Promise((resolve, eject) => {
    instanciaSinToken
      .post(`api/carritocompra`, carritoCompra)
      .then((response) => {
        dispatch({
          type: "CARRITO_SESION",
          id: response.data.id,
          items: response.data.items,
        });
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const addItem = async (carrito, item, dispatch) => {
  if (!carrito.items) {
    carrito.items = [];
  }

  const indice = carrito.items.findIndex((i) => i.id === item.id);
  if (indice === -1) {
    carrito.items.push(item);
  } else {
    carrito.items[indice].cantidad += item.cantidad;
  }

  await setCarritoCompra(dispatch, carrito);
};
