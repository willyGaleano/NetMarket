import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import useStyles from "../../../theme/useStyle";
import PersonIcon from "@material-ui/icons/Person";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const MenuMovilPublico = (props) => {
  const classes = useStyles();
  return (
    <>
      <ListItem
        button
        onClick={props.clickHandler}
        className={classes.listItem}
      >
        <Link to="/login" className={classes.linkAppBarMobile}>
          <ListItemIcon className={classes.listItemIcon}>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText>Login</ListItemText>
        </Link>
      </ListItem>
      <ListItem
        button
        onClick={props.clickHandler}
        className={classes.listItem}
      >
        <Link to="/carrito" className={classes.linkAppBarMobile}>
          <ListItemIcon className={classes.listItemIcon}>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText>Mis Pedidos</ListItemText>
        </Link>
      </ListItem>
    </>
  );
};

export default MenuMovilPublico;
