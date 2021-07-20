const initialState = {
  open: false,
  memsaje: "",
  severity: "info",
};

const openSnackBarReducer = (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_SNACKBAR":
      return {
        ...state,
        open: action.openMensaje.open,
        mensaje: action.openMensaje.mensaje,
        severity: action.openMensaje.severity,
      };
    default:
      return state;
  }
};

export default openSnackBarReducer;
