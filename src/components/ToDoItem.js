import React, { useState } from "react";
import {
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  Box,
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
  const [editText, setEditText] = useState(text);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(text);
  };

  const handleEditSubmit = () => {
    // Update the item text
    onEdit(id, editText);
    setIsEditing(false);
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ListItem
        sx={{
          justifySelf: "center",
          padding: "0.5rem",
          margin: "0.3rem",
          borderRadius: "0.3rem",
          height: "2rem",
          alignItems: "center",
          backgroundColor: completed ? "#f5f5f5" : "#fff",
          border: isEditing ? "none" : "1px solid lightgray",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
      >
        {isEditing ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flex: "1 1 auto",
            }}
          >
            <Input
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
                checked={completed}
                onChange={() => onToggleCompleted(id)}
              />
              <ListItemText
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
