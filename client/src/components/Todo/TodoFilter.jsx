// client/src/components/Todo/TodoFilter.jsx
import React, { memo } from "react";
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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const DEFAULT_FILTERS = {
  priority: "all",
  status: "all",
  search: "",
};

const PRIORITY_OPTIONS = [
  { value: "all", label: "Toutes les priorités" },
  { value: "high", label: "Haute" },
  { value: "medium", label: "Moyenne" },
  { value: "low", label: "Basse" },
];

const STATUS_OPTIONS = [
  { value: "all", label: "Tous les statuts" },
  { value: "completed", label: "Terminé" },
  { value: "active", label: "En cours" },
];

const TodoFilter = ({ filters, onFilterChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  const handleSearchChange = (e) => {
    onFilterChange({ ...filters, search: e.target.value });
  };

  const clearSearch = () => onFilterChange({ ...filters, search: "" });

  const activeFilterCount =
    (filters.priority !== "all" ? 1 : 0) +
    (filters.status !== "all" ? 1 : 0) +
    (filters.search ? 1 : 0);

  const resetFilters = () => onFilterChange(DEFAULT_FILTERS);

  return (
    <Box sx={{ mb: 3 }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ mb: 2, alignItems: { xs: "stretch", sm: "center" } }}
      >
        <TextField
          name="search"
          label="Rechercher"
          value={filters.search}
          onChange={handleSearchChange}
          variant="outlined"
          size="small"
          fullWidth
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
              endAdornment: filters.search ? (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Effacer la recherche"
                    onClick={clearSearch}
                    edge="end"
                    size="small"
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ) : undefined,
            },
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
            {PRIORITY_OPTIONS.map((option) => (
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
            {STATUS_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      {activeFilterCount > 0 && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Chip
            label={`${activeFilterCount} filtre${activeFilterCount > 1 ? "s" : ""} actif${
              activeFilterCount > 1 ? "s" : ""
            }`}
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
  );
};

export default memo(TodoFilter);
