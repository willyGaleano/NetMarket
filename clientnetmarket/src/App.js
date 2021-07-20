import { ThemeProvider } from "@material-ui/styles";
import MenuAppBar from "./components/navegacion/MenuAppBar";
import "@fontsource/roboto";
import Login from "./components/seguridad/Login";
import Register from "./components/seguridad/Register";
/*
Router : envoltura para nuestra nuestra app y nos de acceso a las ulr y asi mantener la sincronia
Switch: Renderiza la primera ruta que coincida con la url actual
Route: Elige que componente reenderizar segun su ruta actual
*/
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import theme from "./theme/theme";
import Productos from "./components/pantallas/Producto";
import DetalleProducto from "./components/pantallas/DetalleProducto";
import CarritoCompras from "./components/pantallas/CarritoCompras";
import ProcesoCompra from "./components/pantallas/ProcesoCompra";
import OrdenCompra from "./components/pantallas/OrdenCompra";
import Perfil from "./components/seguridad/Perfil";
import Usuarios from "./components/pantallas/admin/Usuario";
import EditarUsuario from "./components/pantallas/admin/EditarUsuario";
import ListaProductos from "./components/pantallas/admin/ListaProductos";
import AgregarProducto from "./components/pantallas/admin/AgregarProducto";
import EditarProducto from "./components/pantallas/admin/EditarProducto";
import ListaPedidos from "./components/pantallas/admin/ListaPedidos";
import { useEffect, useState } from "react";
import { getUsuario } from "./actions/UsuarioAction";
import { useStateValue } from "./contexto/store";
import { getCarritoCompra } from "./actions/CarritoCompraAction";
import { v4 as uuidv4 } from "uuid";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

function App() {
  const [servidorRespuesta, setServidorRespuesta] = useState(false);
  const [{ sesionUsuario, openSnackBar }, dispatch] = useStateValue();

  useEffect(() => {
    (async () => {
      let carritoCompraId = window.localStorage.getItem("carrito");

      if (!carritoCompraId) {
        carritoCompraId = uuidv4();
        window.localStorage.setItem("carrito", carritoCompraId);
      }

      if (!servidorRespuesta) {
        await getUsuario(dispatch);
        await getCarritoCompra(dispatch, carritoCompraId);
        setServidorRespuesta(true);
      }
    })();
  }, [servidorRespuesta]);

  return (
    <ThemeProvider theme={theme}>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openSnackBar ? openSnackBar.open : false}
        autoHideDuration={3000}
        //ContentProps={{ "aria-describedby": "message-id" }}
        /*
        message={
          <span id="message-id">
            {openSnackBar ? openSnackBar.mensaje : ""}
          </span>
        }*/
        onClose={() =>
          dispatch({
            type: "OPEN_SNACKBAR",
            openMensaje: {
              open: false,
              mensaje: "",
              severity: "info",
            },
          })
        }
      >
        <Alert
          severity={openSnackBar ? openSnackBar.severity : "info"}
          onClose={() =>
            dispatch({
              type: "OPEN_SNACKBAR",
              openMensaje: {
                open: false,
                mensaje: "",
                severity: "info",
              },
            })
          }
        >
          {openSnackBar ? openSnackBar.mensaje : ""}
        </Alert>
      </Snackbar>
      <Router>
        <MenuAppBar />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/registrar" component={Register} />
          <Route exact path="/" component={Productos} />
          <Route
            exact
            path="/detalleProducto/:id"
            component={DetalleProducto}
          />
          <Route exact path="/carrito" component={CarritoCompras} />
          <Route exact path="/procesoCompra" component={ProcesoCompra} />
          <Route exact path="/ordenCompra/:id" component={OrdenCompra} />
          <Route exact path="/perfil" component={Perfil} />
          <Route exact path="/admin/usuarios" component={Usuarios} />
          <Route exact path="/admin/usuario/:id" component={EditarUsuario} />
          <Route
            exact
            path="/admin/listaProductos"
            component={ListaProductos}
          />
          <Route
            exact
            path="/admin/agregarProducto"
            component={AgregarProducto}
          />
          <Route
            exact
            path="/admin/editarProducto/:id"
            component={EditarProducto}
          />
          <Route exact path="/admin/listaPedidos" component={ListaPedidos} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
