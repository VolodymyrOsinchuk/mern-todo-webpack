import React from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'

const Loading = ({ message = 'Chargement en cours...' }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
      }}
    >
      <CircularProgress size={60} thickness={4} />
      <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
        {message}
      </Typography>
    </Box>
  )
}

export default Loading
