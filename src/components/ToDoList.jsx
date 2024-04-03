import React, { useState, useEffect } from "react";
import { TextField, Button, List, Box, Snackbar, Alert } from "@mui/material";
import ToDoItem from "./ToDoItem";
// This component represents a to-do list.
const ToDoList = () => {
	// State variables to store the to-do list, new to-do item, notification, and notification type.
	const [todos, setTodos] = useState([]);
	const [newTodo, setNewTodo] = useState("");
	const [notification, setNotification] = useState("");
	const [notificationType, setNotificationType] = useState("");
	const [open, setOpen] = useState(false);

	// UseEffect hook to load the to-do list from local storage on component mount.
	useEffect(() => {
		const storedTodos = localStorage.getItem("todo-list");
		if (storedTodos) {
			setTodos(JSON.parse(storedTodos));
		} else {
			setTodos([todos]);
		}
	}, []);

	// Function to handle adding a new to-do item.
	const handleAddTodo = (event) => {

		// Check if the user pressed the Enter key and the new to-do item is empty.
		if (event.key === "Enter" && newTodo.trim() === "") {
			setNotification("Enter item!");
			setNotificationType("error");
			setOpen(true);
			return;
		}

		// Check if the new to-do item is empty.
		if (newTodo.trim() === "") {
			console.log("Enter item!");
			setNotification("Enter item!");
			setNotificationType("error");
			setOpen(true);
			return;
		}

		// Add the new to-do item to the list and update local storage.
		setTodos((prevTodos) => {
			const updatedTodos = [
				...prevTodos,
				{ id: Date.now(), text: newTodo, completed: false },
			];
			localStorage.setItem("todo-list", JSON.stringify(updatedTodos));
			return updatedTodos;
		});
		// Clear the new to-do item input field.
		setNewTodo("");
		// Set the notification message and type.
		setNotification("Added!");
		setNotificationType("success");

		// Open the notification.
		setOpen(true);
	};

	// Check if the user pressed the Enter key and the new to-do item is empty.
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
	// Check if the user pressed the Enter key and the new to-do item is empty.
	const handleToggleCompleted = (id) => {
		console.log("handleToggleCompleted called with id:", id);
		const updatedTodos = todos.map((todo) =>
			todo.id === id ? { ...todo, completed: !todo.completed } : todo
		);
		// Update the todo item in the list and update local storage.
		setTodos(updatedTodos);
		console.log("Updated todos:", updatedTodos);
		localStorage.setItem("todo-list", JSON.stringify(updatedTodos));
		setNotification("Completed!");
		setNotificationType("success");
		setOpen(true);
	};
// edit todo item
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

	// clear todo
	const handleClearAllTodos = () => {
		console.log("handleClearAllTodos called");
		setTodos([]);
		localStorage.removeItem("todo-list");
		setNotification("Cleared!");
		setNotificationType("error");
		setOpen(true);
	};

// handle snackbar notification
	const handleCloseNotifcation = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	}
	return (
		<Box
			sx={{
				display: "grid",
				width: "100%",
			}}
		>
			{/* Snackbar component for displaying notifications */}
			<Snackbar
				open={open}
				autoHideDuration={3000} // Set the duration in milliseconds
				onClose={handleCloseNotifcation}
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
			{/* Header container */}
			<h1 style={{ textAlign: "center", marginTop: "3rem", marginBottom: 0 }}>
				To-Do List
			</h1>
			{/* Container for adding a new todo */}
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
				{/* Text field for adding a new todo */}
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
				{/* Button for adding a new todo */}
				<Button
					variant="contained"
					color="primary"
					onClick={handleAddTodo}
					sx={{ height: "100%" }} // Set the Button height to 100% of the container
				>
					Add
				</Button>
			</Box>
			{/* List of todos */}
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
			{/* Button to clear all todos */}
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

// Export the ToDoList component
export default ToDoList;
