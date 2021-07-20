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
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import React, { useState } from "react";
import useStyles from "../../theme/useStyle";
import { registrarUsuario } from "../../actions/UsuarioAction";
import { useStateValue } from "../../contexto/store";

const clearUsuario = {
  nombre: "",
  apellido: "",
  email: "",
  password: "",
  username: "",
};

const Register = (props) => {
  const classes = useStyles();
  const [{ sesionUsuario }, dispatch] = useStateValue();
  const [usuario, setUsuario] = useState(clearUsuario);

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const guardarUsuario = () => {
    registrarUsuario(usuario, dispatch).then((response) => {
      console.log("objeto response que envia el servidor", response);
      window.localStorage.setItem("token", response.data.token);
      props.history.push("/");
    });
    setUsuario(clearUsuario);
  };

  return (
    <Container className={classes.containermt}>
      <Grid container justify="center">
        <Grid item lg={6} md={8}>
          <Card className={classes.card} align="center">
            <Avatar className={classes.avatar}>
              <PersonAddIcon className={classes.icon} />
            </Avatar>
            <Typography variant="h5" color="primary">
              Registro de Usuario
            </Typography>
            <form className={classes.form} onSubmit={(e) => e.preventDefault()}>
              <Grid container spacing={2}>
                <Grid item md={6} xs={12} className={classes.gridmb}>
                  <TextField
                    label="Nombre"
                    name="nombre"
                    variant="outlined"
                    value={usuario.nombre}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item md={6} xs={12} className={classes.gridmb}>
                  <TextField
                    label="Apellidos"
                    name="apellido"
                    value={usuario.apellido}
                    variant="outlined"
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item md={12} xs={12} className={classes.gridmb}>
                  <TextField
                    label="Username"
                    name="username"
                    value={usuario.username}
                    variant="outlined"
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item md={12} xs={12} className={classes.gridmb}>
                  <TextField
                    label="Email"
                    name="email"
                    value={usuario.email}
                    onChange={handleChange}
                    type="email"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item md={12} xs={12} className={classes.gridmb}>
                  <TextField
                    label="Password"
                    type="password"
                    value={usuario.password}
                    onChange={handleChange}
                    name="password"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item md={12} xs={12} className={classes.gridmb}>
                  <Button
                    variant="contained"
                    fullWidth
                    color="primary"
                    onClick={guardarUsuario}
                    type="submit"
                  >
                    Registrar
                  </Button>
                </Grid>
              </Grid>
              <Link to="/login" variant="body1" className={classes.link}>
                ¿Ya tienes una cuenta?, Logueate
              </Link>
            </form>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
