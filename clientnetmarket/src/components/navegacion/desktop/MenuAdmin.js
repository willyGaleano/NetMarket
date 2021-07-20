import {
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import useStyles from "../../../theme/useStyle";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import GroupIcon from "@material-ui/icons/Group";
import StorefrontIcon from "@material-ui/icons/Storefront";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const MenuAdmin = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();
  return (
    <>
      <Button
        color="inherit"
        className={classes.buttonIcon}
        onClick={handleClick}
      >
        <div className={classes.linkAppBarDesktop}>
          <SupervisorAccountIcon className={classes.mr} />
          ADMIN
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
          <Link className={classes.linkAppBarMobile} to="/admin/usuarios">
            <ListItemIcon className={classes.listItemIcon}>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText>Usuarios</ListItemText>
          </Link>
        </MenuItem>
        <MenuItem className={classes.listItem} onClick={handleClose}>
          <Link className={classes.linkAppBarMobile} to="/admin/listaProductos">
            <ListItemIcon className={classes.listItemIcon}>
              <StorefrontIcon />
            </ListItemIcon>
            <ListItemText>Productos</ListItemText>
          </Link>
        </MenuItem>
        <MenuItem className={classes.listItem} onClick={handleClose}>
          <Link className={classes.linkAppBarMobile} to="/admin/listaPedidos">
            <ListItemIcon className={classes.listItemIcon}>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText>Pedidos</ListItemText>
          </Link>
        </MenuItem>
      </Menu>
    </>
  );
};

export default MenuAdmin;
