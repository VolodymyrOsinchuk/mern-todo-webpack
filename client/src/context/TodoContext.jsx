import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { fetchTodos, createTodo, updateTodo, deleteTodo } from '../services/api'

const TodoContext = createContext()

const initialState = {
  todos: [],
  loading: false,
  error: null,
}

function todoReducer(state, action) {
  switch (action.type) {
    case 'FETCH_TODOS_REQUEST':
      return { ...state, loading: true, error: null }
    case 'FETCH_TODOS_SUCCESS':
      return { ...state, loading: false, todos: action.payload }
    case 'FETCH_TODOS_FAILURE':
      return { ...state, loading: false, error: action.payload }
    case 'ADD_TODO_SUCCESS':
      return { ...state, todos: [...state.todos, action.payload] }
    case 'UPDATE_TODO_SUCCESS':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo._id === action.payload._id ? action.payload : todo
        ),
      }
    case 'DELETE_TODO_SUCCESS':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo._id !== action.payload),
      }
    default:
      return state
  }
}

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialState)

  useEffect(() => {
    const loadTodos = async () => {
      dispatch({ type: 'FETCH_TODOS_REQUEST' })
      try {
        const data = await fetchTodos()
        dispatch({ type: 'FETCH_TODOS_SUCCESS', payload: data })
      } catch (error) {
        dispatch({ type: 'FETCH_TODOS_FAILURE', payload: error.message })
      }
    }

    loadTodos()
  }, [])

  const addTodo = async (todo) => {
    try {
      const newTodo = await createTodo(todo)
      dispatch({ type: 'ADD_TODO_SUCCESS', payload: newTodo })
    } catch (error) {
      dispatch({ type: 'FETCH_TODOS_FAILURE', payload: error.message })
    }
  }

  const toggleTodo = async (id, completed) => {
    try {
      const updatedTodo = await updateTodo(id, { completed })
      dispatch({ type: 'UPDATE_TODO_SUCCESS', payload: updatedTodo })
    } catch (error) {
      dispatch({ type: 'FETCH_TODOS_FAILURE', payload: error.message })
    }
  }

  const removeTodo = async (id) => {
    try {
      await deleteTodo(id)
      dispatch({ type: 'DELETE_TODO_SUCCESS', payload: id })
    } catch (error) {
      dispatch({ type: 'FETCH_TODOS_FAILURE', payload: error.message })
    }
  }

  return (
    <TodoContext.Provider value={{ ...state, addTodo, toggleTodo, removeTodo }}>
      {children}
    </TodoContext.Provider>
  )
}

export const useTodo = () => useContext(TodoContext)
