import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import React, { useLayoutEffect, useState } from "react";
import { getProductos } from "../../actions/ProductoAction";
import useStyles from "../../theme/useStyle";
import Pagination from "@material-ui/lab/Pagination";
import { addItem } from "../../actions/CarritoCompraAction";
import { useStateValue } from "../../contexto/store";

const Productos = (props) => {
  const [{ sesionCarritoCompra }, dispatch] = useStateValue();
  const [requestProductos, setRequestProductos] = useState({
    pageIndex: 1,
    pageSize: 2,
    search: "",
  });

  const [paginadorProductos, setPaginadorProductos] = useState({
    count: 0,
    pageIndex: 0,
    pageSize: 0,
    pageCount: 0,
    data: [],
  });

  const handleChange = (event, value) => {
    setRequestProductos((state) => ({
      ...state,
      pageIndex: value,
    }));
  };

  useLayoutEffect(() => {
    /*
    const getListaProductos = async () => {
      const response = await getProductos();
      setPaginadorProductos(response.data);
    };
    */
    (async () => {
      const response = await getProductos(requestProductos);
      console.log(response);
      setPaginadorProductos(response.data);
    })();
  }, [requestProductos]);

  const verProducto = (id) => {
    props.history.push("/detalleProducto/" + id);
    //addItem(sesionCarritoCompra, item, dispatch);
  };

  const classes = useStyles();

  if (!paginadorProductos) {
    return null;
  }

  return (
    <Container className={classes.containermt}>
      <Typography variant="h4" className={classes.text_title}>
        Productos
      </Typography>
      <Grid container spacing={4}>
        {paginadorProductos.data.map((data) => (
          <Grid item lg={3} md={4} sm={6} xs={12} key={data.id}>
            <Card>
              <CardMedia
                className={classes.media}
                image={
                  data.imagen
                    ? data.imagen
                    : "https://safetysolutions.pe/wp-content/uploads/2020/05/dx472.png"
                }
                title="mi producto"
              >
                <Avatar variant="square" className={classes.price}>
                  ${data.precio}
                </Avatar>
              </CardMedia>
              <CardContent>
                <Typography variant="h6" className={classes.text_card}>
                  {data.nombre}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => verProducto(data.id)}
                >
                  MAS DETALLES
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={paginadorProductos.pageCount}
        page={paginadorProductos.pageIndex}
        onChange={handleChange}
      />
    </Container>
  );
};

export default Productos;
