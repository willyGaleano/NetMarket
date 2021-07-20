import {
  Avatar,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
} from "@material-ui/core";
import React, { useState } from "react";
import useStyles from "../../../theme/useStyle";
import ImageUploader from "react-images-upload";
import { registrarProducto } from "../../../actions/ProductoAction";
import { v4 as uuidv4 } from "uuid";

const AgregarProducto = (props) => {
  const classes = useStyles();
  const imagenDefault =
    "https://safetysolutions.pe/wp-content/uploads/2020/05/dx472.png";

  const [categoria, setCategoria] = useState("");
  const [marca, setMarca] = useState("");
  const [producto, setProducto] = useState({
    id: 0,
    nombre: "",
    descripcion: "",
    stock: 0,
    marcaId: 0,
    categoriaId: 0,
    precio: 0.0,
    imagen: "",
    file: "",
    imagenTemporal: null,
  });

  const handleCategoriaChange = (e) => {
    setCategoria(e.target.value);
  };

  const handleMarcaChange = (e) => {
    setMarca(e.target.value);
  };

  const guardarProducto = async () => {
    producto.categoriaId = categoria;
    producto.marcaId = marca;
    const resultado = await registrarProducto(producto);
    console.log(resultado);
    props.history.push("/admin/listaProductos");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const subirImagen = (imagenes) => {
    const foto = imagenes[0];
    let fotoUrl = "";
    try {
      fotoUrl = URL.createObjectURL(foto);
    } catch (error) {
      console.log(error);
    }
    setProducto((prev) => ({
      ...prev,
      file: foto,
      imagenTemporal: fotoUrl,
    }));
  };

  const keyImage = uuidv4();

  return (
    <Container className={classes.containermt}>
      <Grid container justify="center">
        <Grid item sm={6} xs={12}>
          <Typography variant="h4" className={classes.text_title}>
            AGREGAR PRODUCTO
          </Typography>
          <form onSubmit={(e) => e.preventDefault()} className={classes.form}>
            <TextField
              label="Nombre Producto"
              variant="outlined"
              fullWidth
              className={classes.gridmb}
              InputLabelProps={{
                shrink: true,
              }}
              name="nombre"
              value={producto.nombre}
              onChange={handleChange}
            />
            <TextField
              label="Precio"
              variant="outlined"
              fullWidth
              className={classes.gridmb}
              InputLabelProps={{
                shrink: true,
              }}
              name="precio"
              value={producto.precio}
              onChange={handleChange}
            />
            <TextField
              label="Stock"
              variant="outlined"
              fullWidth
              className={classes.gridmb}
              InputLabelProps={{
                shrink: true,
              }}
              name="stock"
              value={producto.stock}
              onChange={handleChange}
            />
            <TextField
              label="Descripcion"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              className={classes.gridmb}
              InputLabelProps={{
                shrink: true,
              }}
              name="descripcion"
              value={producto.descripcion}
              onChange={handleChange}
            />
            <FormControl className={classes.formControl}>
              <InputLabel id="marca-select-label">Marca</InputLabel>
              <Select
                labelId="marca-select-label"
                id="marca-select"
                value={marca}
                onChange={handleMarcaChange}
              >
                <MenuItem value={1}>Nike</MenuItem>
                <MenuItem value={2}>Adidas</MenuItem>
                <MenuItem value={3}>Maldiva</MenuItem>
              </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel id="categoria-select-label">Categoría</InputLabel>
              <Select
                labelId="categoria-select-label"
                id="categoria-select"
                value={categoria}
                onChange={handleCategoriaChange}
              >
                <MenuItem value={1}>Verano</MenuItem>
                <MenuItem value={2}>Invierno</MenuItem>
                <MenuItem value={3}>Primavera</MenuItem>
              </Select>
            </FormControl>

            <Grid container spacing={2}>
              <Grid item sm={6} xs={12}>
                <ImageUploader
                  withIcon={true}
                  buttonText="Buscar Imagen"
                  imgExtension={[".jpg", ".jpeg", ".png", ".gif"]}
                  maxFileSize={5242880}
                  onChange={subirImagen}
                  singleImage={true}
                  key={keyImage}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <Avatar
                  variant="square"
                  className={classes.avatarProducto}
                  src={
                    producto.imagenTemporal
                      ? producto.imagenTemporal
                      : producto.imagen
                      ? producto.imagen
                      : imagenDefault
                  }
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              onClick={guardarProducto}
            >
              AGREGAR
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AgregarProducto;
