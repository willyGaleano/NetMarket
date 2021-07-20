import {
  Button,
  CardMedia,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@material-ui/core";
import React from "react";
import useStyles from "../../theme/useStyle";
import DeleteIcon from "@material-ui/icons/Delete";
import { useStateValue } from "../../contexto/store";

const CarritoCompras = (props) => {
  const [{ sesionCarritoCompra }, dispatch] = useStateValue();

  console.log(sesionCarritoCompra);

  const miArray = sesionCarritoCompra ? sesionCarritoCompra.items : [];

  const realizarCompra = () => {
    props.history.push("/procesoCompra");
  };
  const classes = useStyles();
  return (
    <Container className={classes.containermt}>
      <Typography variant="h4" className={classes.text_title}>
        CARRITO DE COMPRAS
      </Typography>
      <Grid container spacing={2}>
        <Grid item lg={9} md={8} sm={12} xs={12}>
          <TableContainer>
            <Table>
              <TableBody>
                {miArray.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <CardMedia
                        className={classes.imgProductoCC}
                        image={
                          item.imagen
                            ? item.imagen
                            : "https://safetysolutions.pe/wp-content/uploads/2020/05/dx472.png"
                        }
                        title={item.producto}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography className={classes.text_detalle}>
                        {item.producto}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography className={classes.text_detalle}>
                        ${item.precio}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography className={classes.text_detalle}>
                        ${item.cantidad}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Paper variant="outlined" square className={classes.papperPadding}>
            <Typography variant="h6" className={classes.text_title}>
              SUBTOTAL ({miArray.length}) PRODUCTOS
            </Typography>
            <Typography className={classes.text_title}>$143.46</Typography>
            <Divider className={classes.gridmb} />
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={realizarCompra}
            >
              REALIZAR COMPRA
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CarritoCompras;
