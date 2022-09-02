import {
  Box,
  Button,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";

const TodoList = ({ id, todo, inprogress, todoData, time, editStatusTime }) => {
  const [newTodo, setNewTodo] = useState("");
  const [onEdit, setOnEdit] = useState(false);

  const toChangeTodo = (e) => {
    if (inprogress) {
      setNewTodo(e);
    }

  };

  const toggleEdit = () => {
    setOnEdit(!onEdit);
  };

  const toggleComplete = async (todoData) => {
    await updateDoc(doc(db, "todos", todoData.id), {
      inprogress: !todoData.inprogress,
    });
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  const handleEdit = async (todoData, newTodo) => {
    await updateDoc(doc(db, "todos", todoData.id), { todo: newTodo, time: new Date().toLocaleString() + "", editStatusTime: true });
    setOnEdit(!onEdit)
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: "20px",
      }}
    >
      <List
        sx={{
          width: "100%",
          maxWidth: "500px",
          "&:hover": {
            backgroundColor: "#f5f2f2",
          },
          backgroundColor: "#c7c3c3",
          transition: "0.4s",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              {inprogress ? (
                <AccessTimeIcon sx={{ color: "blue" }} />
              ) : (
                <CheckCircleIcon color="success" />
              )}
            </ListItemAvatar>
            <ListItemText
              primary={todo}
              secondary={
                <>
                  {onEdit ? (
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <TextField
                        autoFocus
                        variant="outlined"
                        defaultValue={todo}
                        onChange={(e) => toChangeTodo(e.target.value)}
                      />
                      <Button
                        type="submit"
                        variant='contained'
                        sx={{ml: '2px'}}
                        onClick={() => handleEdit(todoData, newTodo)}
                      >    
                        edit
                      </Button>
                    </Box>
                  ) : (
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: inprogress ? "blue" : "green",
                      }}
                    >
                      {inprogress
                        ? (editStatusTime ? `Status: in progress from ${time} (edit)` : `Status: in progress from ${time}`)
                        : "Status: done"}
                    </Typography>
                  )}
                </>
              }
            ></ListItemText>
          </ListItem>
          <ModeEditIcon
            sx={{
              mr: "10px",
              cursor: "pointer",
              fontSize: "27px",
              color: "green",
            }}
            onClick={toggleEdit}
          />
          {inprogress ? (
            <CheckCircleOutlineIcon
              onClick={() => toggleComplete(todoData)}
              sx={{
                mr: "15px",
                cursor: "pointer",
                fontSize: "27px",
                color: "green",
              }}
            />
          ) : (
            <RemoveCircleOutlineIcon
              onClick={() => toggleComplete(todoData)}
              sx={{
                mr: "15px",
                cursor: "pointer",
                fontSize: "27px",
                color: "red",
              }}
            />
          )}

          <DeleteIcon
            onClick={() => handleDelete(id)}
            sx={{
              mr: "20px",
              cursor: "pointer",
              border: "2px solid #8a3b36",
              borderRadius: "7px",
              color: "#8a3b36",
              fontSize: "20px",
              transition: "0.4s",
            }}
          />
        </Box>
      </List>
    </Container>
  );
};

export default TodoList;
