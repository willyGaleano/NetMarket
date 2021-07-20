import {
  Avatar,
  Button,
  Container,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import useStyles from "../../theme/useStyle";
import ImageUploader from "react-images-upload";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import CheckIcon from "@material-ui/icons/Check";
import { useStateValue } from "../../contexto/store";
import { v4 as uuidv4 } from "uuid";
import { actualizarUsuario } from "../../actions/UsuarioAction";
import { withRouter } from "react-router-dom";

const Perfil = (props) => {
  const imagenDefault =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAoQE3P6n2qsvhfvCzxgHjkdFDiIYZOYVUvA&usqp=CAU";
  const [{ sesionUsuario }, dispatch] = useStateValue();
  const classes = useStyles();
  const [usuario, setUsuario] = useState({
    id: "",
    nombre: "",
    apellido: "",
    email: "",
    imagen: "",
    password: "",
    file: "",
    imagenTemporal: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (sesionUsuario) {
      setUsuario(sesionUsuario.usuario);
    }
  }, [sesionUsuario]);

  const subirImagen = (imagenes) => {
    const foto = imagenes[0];
    let fotoUrl = "";
    try {
      fotoUrl = URL.createObjectURL(foto);
    } catch (error) {
      console.log(error);
    }
    setUsuario((prev) => ({
      ...prev,
      file: foto,
      imagenTemporal: fotoUrl,
    }));
  };

  const verDetalles = () => {
    const id = "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed";
    props.history.push("/ordenCompra/" + id);
  };

  const guardarUsuario = (e) => {
    e.preventDefault();
    actualizarUsuario(sesionUsuario.usuario.id, usuario, dispatch).then(
      (response) => {
        if (response.status === 200) {
          dispatch({
            type: "OPEN_SNACKBAR",
            openMensaje: {
              open: true,
              mensaje: "Usuario actualizado correctamente",
              severity: "success",
            },
          });
          window.localStorage.setItem("token", response.data.token);
          props.history.push("/");
        } else {
          dispatch({
            type: "OPEN_SNACKBAR",
            openMensaje: {
              open: true,
              mensaje: "Errores al actualizar el perfil del usuario",
              severity: "error",
            },
          });
        }
      }
    );
  };
  const keyImage = uuidv4();
  return (
    <Container className={classes.containermt}>
      <Grid container spacing={2}>
        <Grid item md={3} xs={12}>
          <Typography variant="h5" className={classes.text_title}>
            PERFIL DE USUARIO
          </Typography>
          <form onSubmit={(e) => e.preventDefault()} className={classes.form}>
            <ImageUploader
              key={keyImage}
              onChange={subirImagen}
              withIcon={false}
              buttonStyles={{
                borderRadius: "50%",
                padding: 10,
                margin: 0,
                position: "absolute",
                bottom: 15,
                left: 15,
              }}
              className={classes.imageUploader}
              buttonText={<AddAPhotoIcon />}
              label={
                <Avatar
                  alt="mi perfil"
                  className={classes.avatarPerfil}
                  src={
                    usuario.imagenTemporal
                      ? usuario.imagenTemporal
                      : usuario.imagen
                      ? usuario.imagen
                      : imagenDefault
                  }
                />
              }
              imgExtension={[".jpg", ".gif", ".png", ".jpeg"]}
              maxFileSize={5242880}
            />
            <TextField
              label="Nombre"
              variant="outlined"
              name="nombre"
              fullWidth
              className={classes.gridmb}
              value={usuario.nombre}
              onChange={handleChange}
            />
            <TextField
              label="Apellidos"
              variant="outlined"
              fullWidth
              className={classes.gridmb}
              value={usuario.apellido}
              onChange={handleChange}
              name="apellido"
            />
            <TextField
              label="Correo Electronico"
              variant="outlined"
              fullWidth
              className={classes.gridmb}
              value={usuario.email}
              name="email"
              onChange={handleChange}
            />
            <Divider className={classes.divider} />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              className={classes.gridmb}
            />
            <TextField
              label="Confirmar Password"
              variant="outlined"
              fullWidth
              className={classes.gridmb}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={guardarUsuario}
            >
              ACTUALIZAR
            </Button>
          </form>
        </Grid>
        <Grid item md={9} xs={12}>
          <Typography variant="h5" className={classes.text_title}>
            MIS PEDIDOS
          </Typography>
          <TableContainer className={classes.form}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>FECHA</TableCell>
                  <TableCell>TOTAL</TableCell>
                  <TableCell>PAGADO</TableCell>
                  <TableCell>ENTREGADO</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>bc6ea036-0522-493f-b4b6-97eb87c8f7b4</TableCell>
                  <TableCell>2020-12-15</TableCell>
                  <TableCell>60.00</TableCell>
                  <TableCell>2020-12-12</TableCell>
                  <TableCell>
                    {/* <Icon className={classes.iconNotDelivered}>
                                            clear
                                        </Icon> */}
                    <CheckIcon className={classes.iconDelivered} />
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" onClick={verDetalles}>
                      DETALLES
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
};

export default withRouter(Perfil);
