import {
  Button,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import useStyles from "../../../theme/useStyle";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { getProductos } from "../../../actions/ProductoAction";
import { Pagination } from "@material-ui/lab";

const ListaProductos = (props) => {
  const classes = useStyles();

  const [requestProductos, setRequestProductos] = useState({
    pageIndex: 1,
    pageSize: 20,
    search: "",
  });

  const [paginadorProductos, setPaginadorProductos] = useState({
    count: 0,
    pageIndex: 0,
    pageSize: 0,
    data: [],
  });

  const handleChange = (event, value) => {
    setRequestProductos((prev) => ({
      ...prev,
      pageIndex: value,
    }));
  };

  useEffect(() => {
    const getListaProductos = async () => {
      const response = await getProductos(requestProductos);
      setPaginadorProductos(response.data);
    };
    getListaProductos();
  }, [requestProductos]);

  const agregarProducto = () => {
    props.history.push("/admin/agregarProducto");
  };

  const editaProducto = (id) => {
    props.history.push("/admin/editarProducto/" + id);
  };

  return (
    <Container className={classes.containermt}>
      <Grid container>
        <Grid item lg={6} sm={6} xs={12}>
          <Typography variant="h4" className={classes.text_title}>
            PRODUCTOS
          </Typography>
        </Grid>
        <Grid item lg={6} sm={6} xs={12}>
          <Button
            variant="contained"
            color="inherit"
            className={classes.buttonAgregar}
            onClick={agregarProducto}
          >
            <AddIcon />
            AGREGAR PRODUCTO
          </Button>
        </Grid>
      </Grid>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>NOMBRE</TableCell>
              <TableCell>PRECIO</TableCell>
              <TableCell>MARCA</TableCell>
              <TableCell>CATEGORÍA</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginadorProductos.data.map((producto) => (
              <TableRow key={producto.id}>
                <TableCell>{producto.id}</TableCell>
                <TableCell>{producto.nombre}</TableCell>
                <TableCell>{producto.precio}</TableCell>
                <TableCell>{producto.marcaNombre}</TableCell>
                <TableCell>{producto.categoriaNombre}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => editaProducto(producto.id)}
                  >
                    <EditIcon />
                  </Button>
                  <Button variant="contained" color="secondary">
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={paginadorProductos.pageCount}
        page={paginadorProductos.pageIndex}
        onChange={handleChange}
      />
    </Container>
  );
};

export default ListaProductos;
