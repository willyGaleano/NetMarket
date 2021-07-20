import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import useStyles from "../../../theme/useStyle";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PersonIcon from "@material-ui/icons/Person";

const MenuPublico = () => {
  const classes = useStyles();
  return (
    <>
      <Button color="inherit" className={classes.buttonIcon}>
        <Link to="/carrito" className={classes.linkAppBarDesktop}>
          <ShoppingCartIcon className={classes.mr} />
          MIS PEDIDOS
        </Link>
      </Button>
      <Button color="inherit" className={classes.buttonIcon}>
        <Link to="/login" className={classes.linkAppBarDesktop}>
          <PersonIcon className={classes.mr} />
          LOGIN
        </Link>
      </Button>
    </>
  );
};

export default MenuPublico;
