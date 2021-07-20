import openSnackBarReducer from "./openSnackBarReducer";
import sesionCarritoCompraReducer from "./sesionCarritoCompraReducer";
import sesionUsuarioReducer from "./sesionUsuarioReducer";

export const mainReducer = (
  { sesionUsuario, sesionCarritoCompra, openSnackBar },
  action
) => {
  return {
    sesionUsuario: sesionUsuarioReducer(sesionUsuario, action),
    sesionCarritoCompra: sesionCarritoCompraReducer(
      sesionCarritoCompra,
      action
    ),
    openSnackBar: openSnackBarReducer(openSnackBar, action),
  };
};
