import { Box } from "@mui/material";
import "./App.css";
import ToDoList from "./components/ToDoList";

function App() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "lightgray",
          height: "100vh",
          width: "100vw",
        }}
      >
        <Box
          sx={{
            display: "grid",
            flexDirection: "column",
            padding: "1.5rem",
            alignItems: "center",
            position: "relative",
            top: "10%",
            backgroundColor: "white",
            borderRadius: "0.5rem",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            border: "1px solid lightgray",
            transition: "box-shadow 0.3s ease",
            minWidth: "40%",
          }}
        >
          <ToDoList />
        </Box>
      </Box>
    </>
  );
}

export default App;
