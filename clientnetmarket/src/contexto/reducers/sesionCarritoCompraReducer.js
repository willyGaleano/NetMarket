export const initialState = {
  id: "",
  items: [],
};

const sesionCarritoCompraReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CARRITO_SESION":
      return {
        ...state,
        id: action.id,
        items: action.items,
      };
    default:
      return state;
  }
};

export default sesionCarritoCompraReducer;
