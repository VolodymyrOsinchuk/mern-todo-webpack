// client/src/context/TodoContext.jsx
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "react-toastify";

import {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../services/api";

const TodoContext = createContext(undefined);

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadTodos = useCallback(async (signal) => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchTodos(signal);
      setTodos(data);
    } catch (err) {
      if (err.name === "AbortError") return;
      setError(err.message);
      toast.error(err.message);
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    loadTodos(controller.signal);
    return () => controller.abort();
  }, [loadTodos]);

  const addTodo = useCallback(async (todo) => {
    try {
      // La règle métier "une nouvelle tâche est active" vit ici,
      // pas dans le formulaire qui ne devrait connaître que title/description/priority.
      const newTodo = await createTodo({ ...todo, completed: false });
      setTodos((prev) => [...prev, newTodo]);
      toast.success("Todo ajouté avec succès");
    } catch (err) {
      toast.error(err.message);
      throw err; // permet au formulaire de savoir que ça a échoué
    }
  }, []);

  const toggleTodo = useCallback(async (id, completed) => {
    try {
      const updatedTodo = await updateTodo(id, { completed });
      setTodos((prev) =>
        prev.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo)),
      );
      toast.success(
        completed ? "Todo terminé ✔️" : "Todo marqué comme non terminé",
      );
    } catch (err) {
      toast.error(err.message);
    }
  }, []);

  const editTodo = useCallback(async (id, updates) => {
    try {
      const updatedTodo = await updateTodo(id, updates);
      setTodos((prev) =>
        prev.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo)),
      );
      toast.success("Todo modifié avec succès");
    } catch (err) {
      toast.error(err.message);
      throw err;
    }
  }, []);

  const removeTodo = useCallback(async (id) => {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
      toast.success("Todo supprimé");
    } catch (err) {
      toast.error(err.message);
    }
  }, []);

  const value = useMemo(
    () => ({
      todos,
      loading,
      error,
      addTodo,
      toggleTodo,
      editTodo,
      removeTodo,
      reloadTodos: loadTodos,
    }),
    [
      todos,
      loading,
      error,
      addTodo,
      toggleTodo,
      editTodo,
      removeTodo,
      loadTodos,
    ],
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error(
      "useTodo doit être utilisé à l'intérieur d'un TodoProvider",
    );
  }
  return context;
};
