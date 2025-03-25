// client/src/components/Todo/TodoFilter.jsx
import React from 'react'
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Stack,
  Chip,
  IconButton,
  InputAdornment,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'

const priorityOptions = [
  { value: 'all', label: 'Toutes les priorités' },
  { value: 'high', label: 'Haute' },
  { value: 'medium', label: 'Moyenne' },
  { value: 'low', label: 'Basse' },
]

const statusOptions = [
  { value: 'all', label: 'Tous les statuts' },
  { value: 'completed', label: 'Terminé' },
  { value: 'active', label: 'En cours' },
]

const TodoFilter = ({ filters, onFilterChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target
    onFilterChange({ ...filters, [name]: value })
  }

  const handleSearchChange = (e) => {
    onFilterChange({ ...filters, search: e.target.value })
  }

  const clearSearch = () => {
    onFilterChange({ ...filters, search: '' })
  }

  const getActiveFilterCount = () => {
    let count = 0
    if (filters.priority !== 'all') count++
    if (filters.status !== 'all') count++
    if (filters.search) count++
    return count
  }

  const resetFilters = () => {
    onFilterChange({
      priority: 'all',
      status: 'all',
      search: '',
    })
  }

  return (
    <Box sx={{ mb: 3 }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <TextField
          name="search"
          label="Rechercher"
          value={filters.search}
          onChange={handleSearchChange}
          variant="outlined"
          size="small"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: filters.search ? (
              <InputAdornment position="end">
                <IconButton
                  aria-label="clear search"
                  onClick={clearSearch}
                  edge="end"
                  size="small"
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ) : null,
          }}
        />

        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel id="priority-filter-label">Priorité</InputLabel>
          <Select
            labelId="priority-filter-label"
            id="priority-filter"
            name="priority"
            value={filters.priority}
            label="Priorité"
            onChange={handleChange}
          >
            {priorityOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel id="status-filter-label">Statut</InputLabel>
          <Select
            labelId="status-filter-label"
            id="status-filter"
            name="status"
            value={filters.status}
            label="Statut"
            onChange={handleChange}
          >
            {statusOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      {getActiveFilterCount() > 0 && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip
            label={`${getActiveFilterCount()} filtre${
              getActiveFilterCount() > 1 ? 's' : ''
            } actif${getActiveFilterCount() > 1 ? 's' : ''}`}
            color="primary"
            size="small"
          />
          <Chip
            label="Réinitialiser"
            variant="outlined"
            size="small"
            onClick={resetFilters}
          />
        </Box>
      )}
    </Box>
  )
}

export default TodoFilter
