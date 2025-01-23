import React, { useState, useEffect } from "react";
import { TextField, Button, List, Box, Snackbar, Alert } from "@mui/material";
import ToDoItem from "./ToDoItem";

const ToDoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [notification, setNotification] = useState("");
  const [notificationType, setNotificationType] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todo-list");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    } else {
      setTodos([todos]);
    }
  }, []);

  const handleAddTodo = (event) => {
    console.log("handleAddTodo called with event:", event);
    if (event.key === "Enter" && newTodo.trim() === "") {
      console.log("Enter item!");
      setNotification("Enter item!");
      setNotificationType("error");
      setOpen(true);
      return;
    }

    if (newTodo.trim() === "") {
      console.log("Enter item!");
      setNotification("Enter item!");
      setNotificationType("error");
      setOpen(true);
      return;
    }

    setTodos((prevTodos) => {
      const updatedTodos = [
        ...prevTodos,
        { id: Date.now(), text: newTodo, completed: false },
      ];
      localStorage.setItem("todo-list", JSON.stringify(updatedTodos));
      return updatedTodos;
    });

    setNewTodo("");
    setNotification("Added!");
    setNotificationType("success");
    setOpen(true);
  };

  const handleDeleteTodo = (id) => {
    console.log("handleDeleteTodo called with id:", id);
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodos);
    console.log("Filtered todos:", filteredTodos);
    localStorage.setItem("todo-list", JSON.stringify(filteredTodos));
    setNotification("Deleted!");
    setNotificationType("error");
    setOpen(true);
  };
  const handleToggleCompleted = (id) => {
    console.log("handleToggleCompleted called with id:", id);
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    console.log("Updated todos:", updatedTodos);
    localStorage.setItem("todo-list", JSON.stringify(updatedTodos));
    setNotification("Completed!");
    setNotificationType("success");
    setOpen(true);
  };

  const handleEditToDo = (id, newText) => {
    console.log("handleEditToDo called with id:", id, "and newText:", newText);
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: newText } : todo
    );
    setTodos(updatedTodos);
    console.log("Updated todos:", updatedTodos);
    localStorage.setItem("todo-list", JSON.stringify(updatedTodos));
    setNotification("Saved!");
    setNotificationType("success");
    setOpen(true);
  };

  const handleClearAllTodos = () => {
    console.log("handleClearAllTodos called");
    setTodos([]);
    localStorage.removeItem("todo-list");
    setNotification("Cleared!");
    setNotificationType("error");
    setOpen(true);
  };
  return (
    <Box
      sx={{
        display: "grid",
        width: "100%",
      }}
    >
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{
          position: "absolute",
          top: "1.5rem",
          right: "1.5rem",
          zIndex: 9999,
          width: "90%",
        }}
      >
        <Alert
          severity={notificationType}
          sx={{
            margin: "0, auto",
            borderRadius: "0.3rem",
            textAlign: "center",
            width: "100%",
          }}
        >
          {notification}
        </Alert>
      </Snackbar>
      {/* header container */}
      <h1 style={{ textAlign: "center", marginTop: "3rem", marginBottom: 0 }}>
        To-Do List
      </h1>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "75% 25%",
          mt: "0.8rem",
          mb: "0.8rem",
          ml: 0,
          mr: 0,
          height: "2.5rem", // Set the height of the container
        }}
      >
        {/* input and add button container */}
        <TextField
          label="Add item"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          sx={{ flex: 1 }} // Make the TextField fill available space
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddTodo(e);
            }
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddTodo}
          sx={{
            height: "100%",
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            marginLeft: "-1px", // This removes the gap between input and button
          }} // Set the Button height to 100% of the container and remove left rounded corners
        >
          Add
        </Button>
      </Box>
      {/* {notification && <Notification message={notification} />}{" "} */}
      {/* Display notification (optional) */}
      <List>
        {todos.map((todo) => (
          <ToDoItem
            key={todo.id}
            id={todo.id}
            text={todo.text}
            onAdd={handleAddTodo}
            completed={todo.completed}
            onDelete={handleDeleteTodo}
            onToggleCompleted={handleToggleCompleted}
            onEdit={handleEditToDo}
          />
        ))}
      </List>
      {todos.length > 0 && (
        <Button
          variant="contained"
          color="error"
          onClick={handleClearAllTodos}
          sx={{ mt: 1, alignSelf: "center", height: "2rem", margin: "0 auto" }}
        >
          Clear All
        </Button>
      )}
    </Box>
  );
};

export default ToDoList;
