import {
  Avatar,
  Button,
  ListItemIcon,
  ListItemText,
  ListItem,
  Menu,
  MenuItem,
} from "@material-ui/core";
import React, { useState } from "react";
//usamos withRouter porque el menu no se encuentra envuelto por <Route></Route>
//esto hace que no pueda usar el history
import { Link, withRouter } from "react-router-dom";
import useStyles from "../../../theme/useStyle";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonIcon from "@material-ui/icons/Person";
import { useStateValue } from "../../../contexto/store";

const MenuCliente = (props) => {
  const imagenDefault =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAoQE3P6n2qsvhfvCzxgHjkdFDiIYZOYVUvA&usqp=CAU";
  const [anchorEl, setAnchorEl] = useState(null);
  const [{ sesionUsuario }, dispatch] = useStateValue();

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const salirSesion = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    dispatch({
      type: "SALIR_SESION",
      nuevoUsuario: null,
      autenticado: false,
    });

    props.history.push("/login");
  };

  const classes = useStyles();

  console.log(sesionUsuario);

  return (
    <>
      <Button color="inherit" className={classes.buttonIcon}>
        <Link className={classes.linkAppBarDesktop} to="/carrito">
          <ShoppingCartIcon className={classes.mr} />
          MIS PEDIDOS
        </Link>
      </Button>
      <div>
        <Button
          color="inherit"
          className={classes.buttonIcon}
          onClick={handleClick}
        >
          <div className={classes.linkAppBarDesktop}>
            <Avatar
              alt="mi imagen"
              className={classes.avatarPerfilAppBar}
              src={
                sesionUsuario
                  ? sesionUsuario.autenticado
                    ? sesionUsuario.usuario.imagen
                    : imagenDefault
                  : imagenDefault
              }
            />
            {sesionUsuario
              ? sesionUsuario.autenticado
                ? sesionUsuario.usuario.nombre
                : "No sesión"
              : "No sesión"}
            <KeyboardArrowDownIcon />
          </div>
        </Button>
        <Menu
          elevation={2}
          anchorEl={anchorEl}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem className={classes.listItem} onClick={handleClose}>
            <Link className={classes.linkAppBarMobile} to="/perfil">
              <ListItemIcon className={classes.listItemIcon}>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText>Mi Perfil</ListItemText>
            </Link>
          </MenuItem>
          <MenuItem className={classes.listItem} onClick={handleClose}>
            <Link className={classes.linkAppBarMobile} to="/">
              <ListItemIcon className={classes.listItemIcon}>
                <ExitToAppIcon />
              </ListItemIcon>

              <ListItem button onClick={salirSesion}>
                <ListItemText>Cerrar Sesion</ListItemText>
              </ListItem>
            </Link>
          </MenuItem>
        </Menu>
      </div>
    </>
  );
};

export default withRouter(MenuCliente);
