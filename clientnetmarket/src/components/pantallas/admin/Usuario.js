import {
  Button,
  Container,
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
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import { getUsuarios } from "../../../actions/UsuarioAction";
import { Pagination } from "@material-ui/lab";
import { withRouter } from "react-router-dom";

const Usuarios = (props) => {
  const classes = useStyles();
  const [requestUsuarios, setRequestUsuarios] = useState({
    pageIndex: 1,
    pageSize: 2,
    search: "",
  });

  const [paginadorusuario, setPaginadorusuario] = useState({
    count: 0,
    pageIndex: 0,
    pageSize: 0,
    pageCount: 0,
    data: [],
  });

  const handleChange = (evnt, value) => {
    setRequestUsuarios((prevent) => ({
      ...prevent,
      pageIndex: value,
    }));
  };

  useEffect(() => {
    (async () => {
      const response = await getUsuarios(requestUsuarios);
      setPaginadorusuario(response.data);
    })();
  }, [requestUsuarios]);

  const editaUsuario = (id) => {
    props.history.push("/admin/usuario/" + id);
  };

  return (
    <Container className={classes.containermt}>
      <Typography variant="h4" className={classes.text_title}>
        USUARIOS
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>USUARIO</TableCell>
              <TableCell>EMAIL</TableCell>
              <TableCell>USERNAME</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginadorusuario.data.map((usuario) => (
              <TableRow key={usuario.id}>
                <TableCell>{usuario.id}</TableCell>
                <TableCell>{usuario.nombre + " " + usuario.apellido}</TableCell>
                <TableCell>{usuario.email}</TableCell>
                <TableCell>{usuario.username}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => editaUsuario(usuario.id)}
                  >
                    <EditIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        count={paginadorusuario.pageCount}
        page={paginadorusuario.pageIndex}
        onChange={handleChange}
      />
    </Container>
  );
};

export default withRouter(Usuarios);
