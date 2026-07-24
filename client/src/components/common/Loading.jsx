// client/src/components/common/Loading.jsx
import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

/**
 * @param {Object} props
 * @param {string} [props.message]
 */
const Loading = ({ message = "Chargement en cours..." }) => {
  return (
    <Box
      role="status"
      aria-live="polite"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      <CircularProgress size={60} thickness={4} aria-hidden="true" />
      <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
        {message}
      </Typography>
    </Box>
  );
};

export default Loading;
