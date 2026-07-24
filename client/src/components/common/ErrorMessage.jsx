// client/src/components/common/ErrorMessage.jsx
import React from "react";
import { Alert, AlertTitle, Box, Button } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";

/**
 * @param {Object} props
 * @param {string} [props.title]
 * @param {string} [props.message]
 * @param {(() => void)|null} [props.onRetry]
 */
const ErrorMessage = ({
  title = "Erreur",
  message = "Une erreur est survenue.",
  onRetry = null,
}) => {
  return (
    <Box sx={{ my: 2, maxWidth: "100%" }}>
      <Alert
        severity="error"
        icon={<ErrorIcon fontSize="inherit" aria-hidden="true" />}
        sx={{
          alignItems: "flex-start",
          ".MuiAlert-message": {
            width: "100%",
          },
        }}
      >
        <AlertTitle>{title}</AlertTitle>
        {message}

        {onRetry && (
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={onRetry}
            >
              Réessayer
            </Button>
          </Box>
        )}
      </Alert>
    </Box>
  );
};

export default ErrorMessage;
