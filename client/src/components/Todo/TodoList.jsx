// client/src/components/Todo/TodoList.jsx
import React, { useMemo, useState } from "react";
import { Box, Typography, Paper, List, ListItem } from "@mui/material";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";

import { useTodo } from "../../context/TodoContext";
import TodoItem from "./TodoItem";
import TodoFilter from "./TodoFilter";
import Loading from "../common/Loading";
import ErrorMessage from "../common/ErrorMessage";

const DEFAULT_FILTERS = {
  priority: "all",
  status: "all",
  search: "",
};

const TodoList = () => {
  const { todos, loading, error, reloadTodos } = useTodo();
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const filteredTodos = useMemo(() => {
    let result = todos;

    if (filters.priority !== "all") {
      result = result.filter((todo) => todo.priority === filters.priority);
    }

    if (filters.status !== "all") {
      const isCompleted = filters.status === "completed";
      result = result.filter((todo) => todo.completed === isCompleted);
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(
        (todo) =>
          todo.title.toLowerCase().includes(searchTerm) ||
          (todo.description &&
            todo.description.toLowerCase().includes(searchTerm)),
      );
    }

    return result;
  }, [todos, filters]);

  if (loading) {
    return <Loading message="Chargement des tâches..." />;
  }

  if (error) {
    return (
      <ErrorMessage
        title="Erreur de chargement"
        message={error}
        onRetry={reloadTodos}
      />
    );
  }

  return (
    <Box>
      <TodoFilter filters={filters} onFilterChange={setFilters} />

      {filteredTodos.length > 0 ? (
        <List disablePadding>
          {filteredTodos.map((todo) => (
            <ListItem key={todo._id} disablePadding sx={{ mb: 2 }}>
              <TodoItem todo={todo} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Paper
          variant="outlined"
          sx={{ p: 4, textAlign: "center", bgcolor: "background.paper" }}
        >
          <AssignmentLateIcon
            sx={{ fontSize: 48, color: "text.secondary", mb: 2 }}
          />
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
