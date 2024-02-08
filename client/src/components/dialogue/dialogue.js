import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "axios";
//import produce from "immer";

export default function FormDialog(props) {
  const [editValues, setEditValues] = useState({
    id: props.id,
    nome: props.nome,
    descricao: props.descricao
  });

  const handleChangeValues = (values) => {
    setEditValues((prevValues) => ({
      ...prevValues,
      [values.target.id]: values.target.value,
    }));
  };

  const handleClose = () => {
    props.setOpen(false);
  };
 
  const handleEditTable = () => {
    Axios.put("http://localhost:3001/edit", {

      id: editValues.id,
      nome: editValues.nome,
      descricao: editValues.descricao,

    }).then((err) =>  {
      props.setListCard(
        props.listCard.map((value) => {

          return value.id == editValues.id
            ? {
                id: editValues.id,
                nome: editValues.nome,
                descricao: editValues.descricao
              }
            : value;
        })
      );
    });
    handleClose();
  }; 

  const handleDeleteTable = () => {
    Axios.delete(`http://localhost:3001/delete/${editValues.id}`).then(() => {
      props.setListCard(
        props.listCard.filter((value) => {
          return value.id != editValues.id;
        })
      );
    });
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Editar</DialogTitle>
        <DialogContent>
          <TextField
            disabled
            margin="dense"
            id="id"
            label="id"
            defaultValue={props.id}
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="nome"
            label="Nome"
            defaultValue={props.nome}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="descricao"
            label="Descrição"
            defaultValue={props.descricao}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={() => handleDeleteTable()}>
            Excluir
          </Button>
          <Button color="primary" onClick={() => handleEditTable()}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}