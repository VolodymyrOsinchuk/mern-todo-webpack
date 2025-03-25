// / client/src/components/Todo/TodoForm.jsx
import React, { useState } from 'react'
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Card,
  CardContent,
  Typography,
} from '@mui/material'
import AddTaskIcon from '@mui/icons-material/AddTask'

const TodoForm = ({ addTodo }) => {
  const [todo, setTodo] = useState({
    title: '',
    description: '',
    priority: 'medium',
  })

  const [errors, setErrors] = useState({})

  const validateForm = () => {
    let tempErrors = {}
    let formIsValid = true

    if (!todo.title.trim()) {
      tempErrors.title = 'Le titre est requis'
      formIsValid = false
    } else if (todo.title.length > 100) {
      tempErrors.title = 'Le titre ne peut pas dépasser 100 caractères'
      formIsValid = false
    }

    if (todo.description && todo.description.length > 500) {
      tempErrors.description =
        'La description ne peut pas dépasser 500 caractères'
      formIsValid = false
    }

    setErrors(tempErrors)
    return formIsValid
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setTodo((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when the user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      addTodo({
        ...todo,
        completed: false,
      })

      // Reset form
      setTodo({
        title: '',
        description: '',
        priority: 'medium',
      })
    }
  }

  return (
    <Card variant="outlined" sx={{ mb: 4 }}>
      <CardContent>
        <Typography variant="h6" component="h2" gutterBottom>
          Nouvelle tâche
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Titre *"
              name="title"
              value={todo.title}
              onChange={handleChange}
              error={!!errors.title}
              helperText={errors.title}
              variant="outlined"
              placeholder="Qu'est-ce qui doit être fait ?"
              InputProps={{
                inputProps: {
                  maxLength: 100,
                },
              }}
            />

            <TextField
              fullWidth
              label="Description"
              name="description"
              value={todo.description}
              onChange={handleChange}
              error={!!errors.description}
              helperText={
                errors.description
                  ? errors.description
                  : `${todo.description.length}/500 caractères`
              }
              variant="outlined"
              multiline
              rows={3}
              placeholder="Détails de la tâche (optionnel)"
              InputProps={{
                inputProps: {
                  maxLength: 500,
                },
              }}
            />

            <FormControl fullWidth>
              <InputLabel id="priority-label">Priorité</InputLabel>
              <Select
                labelId="priority-label"
                name="priority"
                value={todo.priority}
                onChange={handleChange}
                label="Priorité"
              >
                <MenuItem value="low">Basse</MenuItem>
                <MenuItem value="medium">Moyenne</MenuItem>
                <MenuItem value="high">Haute</MenuItem>
              </Select>
            </FormControl>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<AddTaskIcon />}
              >
                Ajouter
              </Button>
            </Box>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  )
}

export default TodoForm
