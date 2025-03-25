import React from 'react'
import { Alert, AlertTitle, Box, Button } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

const ErrorMessage = ({
  title = 'Erreur',
  message = 'Une erreur est survenue.',
  onRetry = null,
}) => {
  return (
    <Box sx={{ my: 2, maxWidth: '100%' }}>
      <Alert
        severity="error"
        icon={<ErrorOutlineIcon fontSize="inherit" />}
        sx={{
          alignItems: 'flex-start',
          '.MuiAlert-message': {
            width: '100%',
          },
        }}
      >
        <AlertTitle>{title}</AlertTitle>
        {message}

        {onRetry && (
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
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
  )
}

export default ErrorMessage
