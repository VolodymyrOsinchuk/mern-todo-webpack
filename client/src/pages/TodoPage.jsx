import React from 'react'
import { Box, Typography, Divider, Container, Paper } from '@mui/material'
import TodoForm from '../components/Todo/TodoForm'
import TodoList from '../components/Todo/TodoList'
import { useTodo } from '../context/TodoContext'

const TodoPage = () => {
  const { addTodo } = useTodo()

  return (
    <Box>
      <Container maxWidth="md">
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 600, mb: 3 }}
        >
          Mes tâches
        </Typography>

        <TodoForm addTodo={addTodo} />

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mb: 2 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Liste des tâches
          </Typography>
        </Box>

        <TodoList />
      </Container>
    </Box>
  )
}

export default TodoPage
