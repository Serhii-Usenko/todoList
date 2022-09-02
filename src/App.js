import { useEffect, useState } from "react";
import { Box, Container, TextField, Button } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DoneIcon from "@mui/icons-material/Done";
import { collection, addDoc, onSnapshot, query } from "firebase/firestore";
import { db } from "../src/firebase-config";
import TodoList from "./components/TodoList";

function App() {
  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({...doc.data(), id: doc.id})
      })
      setTodos(todosArr);
    })
    return () => unsub();
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "todos"), {
        inprogress: true,
        todo: todoInput,
        time: new Date().toLocaleString() + "",
        editStatusTime: false
      });
    } catch (error) {
      console.error("error adding: ", error);
    }

    setTodoInput('')
  };

  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "80%",
        }}
      >
        <h2>My Todo List</h2>
        <form>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <AddBoxIcon
              fontSize="medium"
              color="success"
              sx={{ mr: 1, my: 0.5 }}
            />
            <Box sx={{ width: "250px" }}>
              <TextField
                fullWidth
                label="add what needs to be done"
                variant="standard"
                value={todoInput}
                onChange={(e) => setTodoInput(e.target.value)}
              />
            </Box>
            <Button
              size="small"
              variant="contained"
              sx={{
                ml: "10px",
              }}
              type="submit"
              onClick={addTodo}
            >
              Add
              <DoneIcon />
            </Button>
          </Box>
        </form>
      </Container>
      {todos.map((el) => (
        <TodoList
          id={el.id}
          todo={el.todo}
          todoData={el}
          inprogress={el.inprogress}
          time={el.time}
          editStatusTime ={el.editStatusTime}
        />
      ))}
    </>
  );
}

export default App;
