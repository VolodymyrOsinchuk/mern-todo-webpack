// client/src/components/Todo/TodoItem.jsx
import React, { useState } from 'react';
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
  Tooltip,
  Collapse
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'high':
      return 'error';
    case 'medium':
      return 'warning';
    case 'low':
      return 'success';
    default:
      return 'default';
  }
};

const getPriorityLabel = (priority) => {
  switch (priority) {
    case 'high':
      return 'Haute';
    case 'medium':
      return 'Moyenne';
    case 'low':
      return 'Basse';
    default:
      return 'Inconnue';
  }
};

const TodoItem = ({ todo, toggleTodo, removeTodo }) => {
  const [expanded, setExpanded] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };
  
  const handleDeleteClick = () => {
    handleMenuClose();
    setDeleteDialogOpen(true);
  };
  
  const handleDeleteConfirm = () => {
    setDeleteDialogOpen(false);
    removeTodo(todo._id);
  };
  
  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };
  
  const handleToggle = () => {
    toggleTodo(todo._id, !todo.completed);
  };
  
  // Format the date nicely
  const formattedDate = todo.createdAt ? 
    formatDistanceToNow(new Date(todo.createdAt), { 
      addSuffix: true,
      locale: fr 
    }) : '';
  
  return (
    <>
      <Card 
        sx={{ 
          mb: 2,
          opacity: todo.completed ? 0.8 : 1,
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: 3,
          },
          position: 'relative',
          overflow: 'visible'
        }}
        variant="outlined"
      >
        <CardContent sx={{ pb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Checkbox 
              checked={todo.completed} 
              onChange={handleToggle} 
              color="primary"
              sx={{ p: 1, ml: -1, mr: 1, mt: -0.5 }}
            />
            
            <Box sx={{ flexGrow: 1 }}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: 1,
                mb: 1 
              }}>
                <Typography 
                  variant="h6" 
                  component="h3" 
                  sx={{ 
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? 'text.disabled' : 'text.primary',
                    wordBreak: 'break-word'
                  }}
                >
                  {todo.title}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip 
                    label={getPriorityLabel(todo.priority)} 
                    color={getPriorityColor(todo.priority)}
                    size="small"
                  />
                  
                  <IconButton
                    aria-label="more options"
                    aria-controls="todo-menu"
                    aria-haspopup="true"
                    onClick={handleMenuOpen}
                    size="small"
                  >
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
              
              {todo.description && (
                <>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      mb: 1, 
                      color: 'text.secondary',
                      cursor: 'pointer'
                    }}
                    onClick={handleExpandClick}
                  >
                    <Typography 
                      variant="body2" 
                      color="inherit"
                      sx={{ mr: 0.5 }}
                    >
                      {expanded ? 'Masquer les détails' : 'Afficher les détails'}
                    </Typography>
                    {expanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
                  </Box>
                
                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ 
                        mt: 1, 
                        mb: 1,
                        whiteSpace: 'pre-line'
                      }}
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
                  sx={{ display: 'block', mt: 1 }}
                >
                  Créée {formattedDate}
                </Typography>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
      
      {/* Menu for actions */}
      <Menu
        id="todo-menu"
        anchorEl={menuAnchorEl}
        keepMounted
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Modifier" />
        </MenuItem>
        <MenuItem onClick={handleDeleteClick}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText primary="Supprimer" primaryTypographyProps={{ color: 'error' }} />
        </MenuItem>
      </Menu>
      
      {/* Delete confirmation dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">
          Supprimer cette tâche ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Êtes-vous sûr de vouloir supprimer la tâche "{todo.title}" ? Cette action est irréversible.
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

export default TodoItem;
