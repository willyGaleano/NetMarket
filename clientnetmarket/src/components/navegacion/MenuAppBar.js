import {
  AppBar,
  Container,
  Drawer,
  IconButton,
  List,
  Toolbar,
  Typography,
} from "@material-ui/core";
import StorefrontIcon from "@material-ui/icons/Storefront";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState } from "react";
import useStyles from "../../theme/useStyle";
import { Link } from "react-router-dom";
import MenuCliente from "./desktop/MenuCliente";
import MenuAdmin from "./desktop/MenuAdmin";
import MenuPublico from "./desktop/MenuPublico";
import MenuMovil from "./movil/MenuMovil";

import MenuMovilPublico from "./movil/MenuMovilPublico";

const MenuAppBar = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const openTogle = () => {
    setOpen(true);
  };
  const closeTogle = () => {
    setOpen(false);
  };
  return (
    <div>
      <AppBar position="static" className={classes.appBar}>
        <Container>
          <Toolbar>
            <div className={classes.sectionMobile}>
              <IconButton color="inherit" onClick={openTogle}>
                <MenuIcon fontSize="large" />
              </IconButton>
            </div>
            <Drawer open={open} onClose={closeTogle}>
              <div className={classes.list}>
                <List>
                  {/*
                  <ListItem
                    button
                    onClick={closeTogle}
                    className={classes.listItem}
                  >
                    <Link
                      to="/login"
                      color="inherit"
                      className={classes.linkAppBarMobile}
                      underline="none"
                    >
                      <ListItemIcon className={classes.listItemIcon}>
                        <PersonIcon />
                      </ListItemIcon>
                      <ListItemText>Login</ListItemText>
                    </Link>
                </ListItem>*/}
                  {/*<MenuMovilPublico clickHandler={closeTogle} />*/}
                  <MenuMovil clickHandler={closeTogle} />
                </List>
              </div>
            </Drawer>
            <div className={classes.grow}>
              <Link
                to="/"
                color="inherit"
                underline="none"
                className={classes.linkAppBarLogo}
              >
                <StorefrontIcon fontSize="large" className={classes.mr} />
                <Typography variant="h5">WILLY´S SHOP</Typography>
              </Link>
            </div>
            <div className={classes.sectionDesktop}>
              {/*<Button color="inherit" className={classes.buttonIcon}>
                <Link
                  to="/login"
                  color="inherit"
                  className={classes.linkAppBarDesktop}
                >
                  <PersonIcon className={classes.mr} />
                  LOGIN
                </Link>
              </Button>*/}
              {/*<MenuPublico />*/}
              <MenuCliente />
              <MenuAdmin />
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default MenuAppBar;
