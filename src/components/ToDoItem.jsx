import React, { useState } from "react";
import {
	ListItem,
	ListItemText,
	IconButton,
	Checkbox,
	Box,
	TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Input from "@mui/material/Input";
import SaveIcon from "@mui/icons-material/Save";

const ToDoItem = ({
	id,
	text,
	completed,
	onDelete,
	onToggleCompleted,
	onEdit,
}) => {
	// State to keep track of edited text
	const [editText, setEditText] = useState(text);
	// State to keep track of whether the item is being edited
	const [isEditing, setIsEditing] = useState(false);

	// Handle editing of the item
	const handleEdit = () => {
		// Set the item as being edited
		setIsEditing(true);
		// Set the edited text to the current text
		setEditText(text);
	};

	// Handle submission of the edited text
	const handleEditSubmit = () => {
		// Update the item text
		onEdit(id, editText);
		// Stop editing the item
		setIsEditing(false);
	};
	return (
		<Box
			// Container for the Todo item
			sx={{
				display: "grid",
				gridTemplateColumns: "1fr",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<ListItem
				// The Todo item itself
				sx={{
					justifySelf: "center",
					padding: "0.5rem",
					margin: "0.3rem",
					borderRadius: "0.3rem",
					height: "2rem",
					alignItems: "center",
					backgroundColor: completed ? "#f5f5f5" : "#fff",
					border: "1px solid ",
					border: isEditing ? "none" : "1px solid lightgray",
					cursor: "pointer",
					transition: "background-color 0.3s ease",
				}}
			>
				{isEditing ? (
					// Edit mode
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
							flex: "1 1 auto",
						}}
					>
						<Input
							// Editing input
							sx={{
								width: "100%",
							}}
							value={editText}
							onChange={(e) => setEditText(e.target.value)}
						/>

						<IconButton onClick={handleEditSubmit}>
							<SaveIcon sx={{ color: "green" }} />
						</IconButton>
					</Box>
				) : (
					// Normal mode
					<>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
								width: "100%",
							}}
						>
							<Checkbox
								// Completed checkbox
								checked={completed}
								onChange={() => onToggleCompleted(id)}
							/>
							<ListItemText
								// The todo text
								primary={text}
								sx={{
									textDecoration: completed ? "line-through" : "none",
								}}
							/>
							<IconButton onClick={handleEdit}>
								<EditIcon sx={{ color: "blue" }} />
							</IconButton>
							<IconButton onClick={() => onDelete(id)}>
								<DeleteIcon sx={{ color: "red" }} />
							</IconButton>
						</Box>
					</>
				)}
			</ListItem>
		</Box>
	);
};


export default ToDoItem;
