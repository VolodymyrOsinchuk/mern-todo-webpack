// client/src/components/Todo/TodoForm.jsx
import React, { useState } from "react";
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
} from "@mui/material";
import AddTaskIcon from "@mui/icons-material/AddTask";

const DEFAULT_VALUES = {
  title: "",
  description: "",
  priority: "medium",
};

const TITLE_MAX_LENGTH = 100;
const DESCRIPTION_MAX_LENGTH = 500;

/**
 * @param {Object} props
 * @param {(values: {title: string, description: string, priority: string}) => Promise<void>} props.onSubmit
 * @param {{title?: string, description?: string, priority?: string}} [props.initialValues]
 * @param {string} [props.heading]
 * @param {string} [props.submitLabel]
 * @param {() => void} [props.onCancel] - si fourni, affiche un bouton Annuler (mode édition)
 * @param {boolean} [props.bare] - true pour un rendu sans Card (utilisé dans un Dialog)
 */
const TodoForm = ({
  onSubmit,
  initialValues,
  heading = "Nouvelle tâche",
  submitLabel = "Ajouter",
  onCancel,
  bare = false,
}) => {
  const [todo, setTodo] = useState({ ...DEFAULT_VALUES, ...initialValues });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validateForm = () => {
    const tempErrors = {};

    if (!todo.title.trim()) {
      tempErrors.title = "Le titre est requis";
    } else if (todo.title.length > TITLE_MAX_LENGTH) {
      tempErrors.title = `Le titre ne peut pas dépasser ${TITLE_MAX_LENGTH} caractères`;
    }

    if (todo.description && todo.description.length > DESCRIPTION_MAX_LENGTH) {
      tempErrors.description = `La description ne peut pas dépasser ${DESCRIPTION_MAX_LENGTH} caractères`;
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      await onSubmit(todo);
      // En mode édition (onCancel fourni), le dialogue parent se ferme
      // et démonte ce formulaire : inutile, et risqué, de le réinitialiser ici.
      if (!onCancel) {
        setTodo(DEFAULT_VALUES);
      }
      setErrors({});
    } catch {
      // L'erreur est déjà notifiée via toast par le contexte ;
      // on conserve la saisie pour ne pas faire tout retaper à l'utilisateur.
    } finally {
      setSubmitting(false);
    }
  };

  const formContent = (
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
          required
          slotProps={{
            htmlInput: { maxLength: TITLE_MAX_LENGTH },
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
            errors.description ||
            `${todo.description.length}/${DESCRIPTION_MAX_LENGTH} caractères`
          }
          variant="outlined"
          multiline
          rows={3}
          placeholder="Détails de la tâche (optionnel)"
          slotProps={{
            htmlInput: { maxLength: DESCRIPTION_MAX_LENGTH },
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

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
          {onCancel && (
            <Button onClick={onCancel} disabled={submitting}>
              Annuler
            </Button>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<AddTaskIcon />}
            disabled={submitting}
          >
            {submitLabel}
          </Button>
        </Box>
      </Stack>
    </Box>
  );

  if (bare) {
    return formContent;
  }

  return (
    <Card variant="outlined" sx={{ mb: 4 }}>
      <CardContent>
        <Typography variant="h6" component="h2" gutterBottom>
          {heading}
        </Typography>
        {formContent}
      </CardContent>
    </Card>
  );
};

export default TodoForm;
