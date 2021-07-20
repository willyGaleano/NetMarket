//rsc
import {
  Avatar,
  Button,
  Card,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import PersonIcon from "@material-ui/icons/Person";
import React, { useState } from "react";
import useStyles from "../../theme/useStyle";
import { loginUsuario } from "../../actions/UsuarioAction";
import { useStateValue } from "../../contexto/store";

const clearUsuario = {
  email: "",
  password: "",
};

const Login = (props) => {
  const classes = useStyles();

  const [{ sesionUsuario }, dispatch] = useStateValue();
  const [usuario, setUsuario] = useState(clearUsuario);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prev) => ({ ...prev, [name]: value }));
  };

  const loginEventoUsuario = () => {
    loginUsuario(usuario, dispatch).then((response) => {
      if (response.status === 200) {
        window.localStorage.setItem("token", response.data.token);
        console.log("el login fue exitoso", response.data);
        props.history.push("/");
      } else {
        dispatch({
          type: "OPEN_SNACKBAR",
          openMensaje: {
            open: true,
            mensaje: "El password o el email son incorrectos",
            severity: "error",
          },
        });
      }
    });
  };

  return (
    <Container className={classes.containermt}>
      <Grid container justify="center">
        <Grid item lg={5} md={6}>
          <Card className={classes.card} align="center">
            <Avatar className={classes.avatar}>
              <PersonIcon className={classes.icon} />
            </Avatar>
            <Typography variant="h5" color="primary">
              Ingrese su Usuario
            </Typography>
            <form className={classes.form} onSubmit={(e) => e.preventDefault()}>
              <Grid container spacing={2}>
                <Grid className={classes.gridmb} item xs={12}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    type="email"
                    name="email"
                    value={usuario.email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid className={classes.gridmb} item xs={12}>
                  <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    type="password"
                    name="password"
                    value={usuario.password}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid className={classes.gridmb} item xs={12}>
                  <Button
                    variant="contained"
                    fullWidth
                    color="primary"
                    type="submit"
                    onClick={loginEventoUsuario}
                  >
                    Ingresar
                  </Button>
                </Grid>
              </Grid>
              <Link to="/registrar" className={classes.link} variant="body1">
                ¿No tienes una cuenta?, Registrate
              </Link>
            </form>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
