// client/src/components/Todo/TodoItem.jsx
import React, { useState, memo } from "react";
import {
  Card,
  CardContent,
  Typography,
  Checkbox,
  IconButton,
  Box,
  Chip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  ButtonBase,
  Collapse,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

import { useTodo } from "../../context/TodoContext";
import TodoForm from "./TodoForm";

const PRIORITY_META = {
  high: { color: "error", label: "Haute" },
  medium: { color: "warning", label: "Moyenne" },
  low: { color: "success", label: "Basse" },
};

const getPriorityMeta = (priority) =>
  PRIORITY_META[priority] || { color: "default", label: "Inconnue" };

const TodoItem = ({ todo }) => {
  const { toggleTodo, removeTodo, editTodo } = useTodo();

  const [expanded, setExpanded] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const priorityMeta = getPriorityMeta(todo.priority);
  const menuId = `todo-menu-${todo._id}`;

  const handleExpandClick = () => setExpanded((prev) => !prev);
  const handleMenuOpen = (e) => setMenuAnchorEl(e.currentTarget);
  const handleMenuClose = () => setMenuAnchorEl(null);

  const handleDeleteClick = () => {
    handleMenuClose();
    setDeleteDialogOpen(true);
  };
  const handleDeleteConfirm = () => {
    setDeleteDialogOpen(false);
    removeTodo(todo._id);
  };
  const handleDeleteCancel = () => setDeleteDialogOpen(false);

  const handleEditClick = () => {
    handleMenuClose();
    setEditDialogOpen(true);
  };
  const handleEditCancel = () => setEditDialogOpen(false);
  const handleEditSubmit = async (values) => {
    await editTodo(todo._id, values);
    setEditDialogOpen(false);
  };

  const handleToggle = () => toggleTodo(todo._id, !todo.completed);

  const formattedDate = todo.createdAt
    ? formatDistanceToNow(new Date(todo.createdAt), {
        addSuffix: true,
        locale: fr,
      })
    : "";

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          mb: 2,
          width: "100%",
          opacity: todo.completed ? 0.8 : 1,
          transition: "all 0.2s ease-in-out",
          "&:hover": { boxShadow: 3 },
        }}
      >
        <CardContent sx={{ pb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "flex-start" }}>
            <Checkbox
              checked={todo.completed}
              onChange={handleToggle}
              color="primary"
              sx={{ p: 1, ml: -1, mr: 1, mt: -0.5 }}
              slotProps={{
                input: {
                  "aria-label": todo.completed
                    ? `Marquer "${todo.title}" comme non terminée`
                    : `Marquer "${todo.title}" comme terminée`,
                },
              }}
            />

            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                  gap: 1,
                  mb: 1,
                }}
              >
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    textDecoration: todo.completed ? "line-through" : "none",
                    color: todo.completed ? "text.disabled" : "text.primary",
                    wordBreak: "break-word",
                  }}
                >
                  {todo.title}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Chip
                    label={priorityMeta.label}
                    color={priorityMeta.color}
                    size="small"
                  />

                  <IconButton
                    aria-label={`Autres actions pour "${todo.title}"`}
                    aria-controls={menuAnchorEl ? menuId : undefined}
                    aria-haspopup="true"
                    aria-expanded={Boolean(menuAnchorEl)}
                    onClick={handleMenuOpen}
                    size="small"
                  >
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>

              {todo.description && (
                <>
                  <ButtonBase
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 1,
                      color: "text.secondary",
                      borderRadius: 1,
                      px: 0.5,
                      mx: -0.5,
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="inherit"
                      sx={{ mr: 0.5 }}
                    >
                      {expanded
                        ? "Masquer les détails"
                        : "Afficher les détails"}
                    </Typography>
                    {expanded ? (
                      <ExpandLessIcon fontSize="small" />
                    ) : (
                      <ExpandMoreIcon fontSize="small" />
                    )}
                  </ButtonBase>

                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 1, mb: 1, whiteSpace: "pre-line" }}
                    >
                      {todo.description}
                    </Typography>
                  </Collapse>
                </>
              )}

              {formattedDate && (
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "block", mt: 1 }}
                >
                  Créée {formattedDate}
                </Typography>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Menu
        id={menuId}
        anchorEl={menuAnchorEl}
        keepMounted
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEditClick}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Modifier" />
        </MenuItem>
        <MenuItem onClick={handleDeleteClick}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText
            primary="Supprimer"
            slotProps={{ primary: { color: "error" } }}
          />
        </MenuItem>
      </Menu>

      <Dialog
        open={editDialogOpen}
        onClose={handleEditCancel}
        fullWidth
        maxWidth="sm"
        aria-labelledby={`edit-dialog-title-${todo._id}`}
      >
        <DialogTitle id={`edit-dialog-title-${todo._id}`}>
          Modifier la tâche
        </DialogTitle>
        <DialogContent>
          <TodoForm
            bare
            initialValues={{
              title: todo.title,
              description: todo.description || "",
              priority: todo.priority,
            }}
            submitLabel="Enregistrer"
            onCancel={handleEditCancel}
            onSubmit={handleEditSubmit}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby={`delete-dialog-title-${todo._id}`}
        aria-describedby={`delete-dialog-description-${todo._id}`}
      >
        <DialogTitle id={`delete-dialog-title-${todo._id}`}>
          Supprimer cette tâche ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id={`delete-dialog-description-${todo._id}`}>
            Êtes-vous sûr de vouloir supprimer la tâche « {todo.title} » ? Cette
            action est irréversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Annuler
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default memo(TodoItem);
