import { useState } from "react";
import { Box, Container, TextField, Button } from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';
import DoneIcon from '@mui/icons-material/Done';
import "./App.css";


function App() {

  const [todoInput, setTodoInput] = useState('');
  

  const addTodo = (e) => {
    e.preventDefault();
    
  }

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '80%',
      }}
    >
      <h2>My Todo List</h2>
      <form>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <AddBoxIcon fontSize="medium" color="success" sx={{mr: 1, my: 0.5 }} />
          <Box sx={{width: "250px"}}>
              <TextField
                fullWidth
                label='add what needs to be done'
                variant="standard"
                value={todoInput}
                onChange={(e) => setTodoInput(e.target.value)}
              />
          </Box>
          <Button
            size="small"
            variant="contained"
            sx={{
              ml: '10px'
            }}
            type="submit"
            onClick={addTodo}
          >
            Add
            <DoneIcon/>
          </Button>
        </Box>
      </form>
    </Container>
  );
}

export default App;
