// client/src/components/Todo/TodoList.jsx
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Divider,
  Paper,
  List,
  ListItem
} from '@mui/material';
import { useTodo } from '../../context/TodoContext';
import TodoItem from './TodoItem';
import TodoFilter from './TodoFilter';
import Loading from '../common/Loading';
import ErrorMessage from '../common/ErrorMessage';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';

const TodoList = () => {
  const { todos, loading, error, toggleTodo, removeTodo } = useTodo();
  
  const [filters, setFilters] = useState({
    priority: 'all',
    status: 'all',
    search: ''
  });
  
  const [filteredTodos, setFilteredTodos] = useState([]);
  
  // Apply filters whenever todos or filters change
  useEffect(() => {
    if (!todos) return;
    
    let result = [...todos];
    
    // Filter by priority
    if (filters.priority !== 'all') {
      result = result.filter(todo => todo.priority === filters.priority);
    }
    
    // Filter by status
    if (filters.status !== 'all') {
      const isCompleted = filters.status === 'completed';
      result = result.filter(todo => todo.completed === isCompleted);
    }
    
    // Filter by search term
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(todo => 
        todo.title.toLowerCase().includes(searchTerm) || 
        (todo.description && todo.description.toLowerCase().includes(searchTerm))
      );
    }
    
    setFilteredTodos(result);
  }, [todos, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  if (loading) {
    return <Loading message="Chargement des tâches..." />;
  }

  if (error) {
    return (
      <ErrorMessage 
        title="Erreur de chargement" 
        message={error} 
      />
    );
  }

  return (
    <Box>
      <TodoFilter filters={filters} onFilterChange={handleFilterChange} />
      
      {filteredTodos.length > 0 ? (
        <List disablePadding>
          {filteredTodos.map(todo => (
            <ListItem key={todo._id} disablePadding sx={{ mb: 2 }}>
              <TodoItem 
                todo={todo} 
                toggleTodo={toggleTodo} 
                removeTodo={removeTodo} 
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Paper 
          variant="outlined" 
          sx={{ 
            p: 4, 
            textAlign: 'center',
            bgcolor: 'background.paper'
          }}
        >
          <AssignmentLateIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            Aucune tâche trouvée
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {todos.length === 0 
              ? "Votre liste de tâches est vide. Ajoutez votre première tâche en utilisant le formulaire ci-dessus."
              : "Aucune tâche ne correspond aux filtres sélectionnés. Essayez de modifier vos filtres."}
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default TodoList;