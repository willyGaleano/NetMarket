import {
  Avatar,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import useStyles from "../../../theme/useStyle";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import GroupIcon from "@material-ui/icons/Group";
import StorefrontIcon from "@material-ui/icons/Storefront";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useStateValue } from "../../../contexto/store";

const MenuMovil = (props) => {
  const imagenDefault =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAoQE3P6n2qsvhfvCzxgHjkdFDiIYZOYVUvA&usqp=CAU";
  const [{ sesionUsuario }, dispatch] = useStateValue();
  const classes = useStyles();
  const [openCliente, setOpenCliente] = useState(false);
  const [openAdmin, setOpenAdmin] = useState(false);

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

  const handleClickCliente = () => {
    setOpenCliente((prevOpen) => !prevOpen);
  };

  const handleClickAdmin = () => {
    setOpenAdmin((prevOpen) => !prevOpen);
  };

  return (
    <>
      <ListItem
        button
        onClick={handleClickCliente}
        className={classes.listItem}
      >
        <div className={classes.linkAppBarMobile}>
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
      </ListItem>
      <Collapse component="li" in={openCliente} timeout="auto" unmountOnExit>
        <List disablePadding>
          <ListItem
            button
            className={classes.listSubItem}
            onClick={props.clickHandler}
          >
            <Link className={classes.linkAppBarMobile} to="/perfil">
              <ListItemIcon className={classes.listItemIcon}>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText>Mi Perfil</ListItemText>
            </Link>
          </ListItem>
          <ListItem
            button
            className={classes.listSubItem}
            onClick={props.clickHandler}
          >
            <Link className={classes.linkAppBarMobile} to="/">
              <ListItemIcon className={classes.listItemIcon}>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItem button onClick={salirSesion}>
                <ListItemText>Cerrar Sesion</ListItemText>
              </ListItem>
            </Link>
          </ListItem>
          <Divider />
        </List>
      </Collapse>
      {/* admin */}
      <ListItem button onClick={handleClickAdmin} className={classes.listItem}>
        <div className={classes.linkAppBarMobile}>
          <ListItemIcon className={classes.listItemIcon}>
            <SupervisorAccountIcon />
          </ListItemIcon>
          <ListItemText>Admin</ListItemText>
          <KeyboardArrowDownIcon />
        </div>
      </ListItem>
      <Collapse component="li" in={openAdmin} timeout="auto" unmountOnExit>
        <List disablePadding>
          <ListItem
            button
            className={classes.listSubItem}
            onClick={props.clickHandler}
          >
            <Link className={classes.linkAppBarMobile} to="/admin/usuarios">
              <ListItemIcon className={classes.listItemIcon}>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText>Usuarios</ListItemText>
            </Link>
          </ListItem>
          <ListItem
            button
            className={classes.listSubItem}
            onClick={props.clickHandler}
          >
            <Link
              className={classes.linkAppBarMobile}
              to="/admin/listaProductos"
            >
              <ListItemIcon className={classes.listItemIcon}>
                <StorefrontIcon />
              </ListItemIcon>
              <ListItemText>Productos</ListItemText>
            </Link>
          </ListItem>
          <ListItem
            button
            className={classes.listSubItem}
            onClick={props.clickHandler}
          >
            <Link className={classes.linkAppBarMobile} to="/">
              <ListItemIcon className={classes.listItemIcon}>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText>Pedidos</ListItemText>
            </Link>
          </ListItem>
          <Divider />
        </List>
      </Collapse>
      {/* fin admin */}
      <ListItem
        button
        className={classes.listItem}
        onClick={props.clickHandler}
      >
        <Link className={classes.linkAppBarMobile} to="/admin/listaPedidos">
          <ListItemIcon className={classes.listItemIcon}>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText>Mis Pedidos</ListItemText>
        </Link>
      </ListItem>
    </>
  );
};

export default withRouter(MenuMovil);
