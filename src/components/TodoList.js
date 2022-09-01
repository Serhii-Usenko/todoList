import {
  Box,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";

const TodoList = ({ id, todo, inprogress, todoData }) => {

  const toggleComplete = async (todoData) => {
    await updateDoc(doc(db, "todos", todoData.id), { inprogress: !todoData.inprogress });
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "todos", id));
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
						'&:hover': {
							backgroundColor: '#f5f2f2'
						},
          backgroundColor: "#c7c3c3",
					transition: '0.4s'
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
						alignItems: 'center'
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
                  <Typography sx={{ fontSize: "12px", color: inprogress ? 'blue' : 'green'}}>
                    {inprogress ? "Status: in progress..." : "Status: done"}
                  </Typography>
                </>
              }
            ></ListItemText>
          </ListItem>
          {inprogress ? 
            <CheckCircleOutlineIcon
              onClick={() => toggleComplete(todoData)}
              sx={{
                mr: '15px',
                cursor: 'pointer',
                fontSize: '27px',
                color: 'green',
              }} />
          : 
            <RemoveCircleOutlineIcon 
              onClick={() => toggleComplete(todoData)}
              sx={{
                mr: '15px',
                cursor: 'pointer',
                fontSize: '27px',
                color: 'red',
              }} />
          }
          
					<DeleteIcon
            onClick={() => handleDelete(id)}
						sx={{
							mr: '20px',
							cursor: 'pointer',
							border: '2px solid #8a3b36',
							borderRadius: '7px',
							color: '#8a3b36',
							fontSize: '20px',
							transition: '0.4s',
						}}/>
        </Box>
      </List>
    </Container>
  );
};

export default TodoList;
