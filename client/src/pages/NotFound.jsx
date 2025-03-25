// client/src/pages/NotFound.jsx
import React from 'react'
import { Box, Typography, Button, Container, Paper } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

const NotFound = () => {
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            borderRadius: 2,
            backgroundColor: 'background.paper',
            border: 1,
            borderColor: 'divider',
          }}
        >
          <ErrorOutlineIcon
            color="error"
            sx={{ fontSize: 80, mb: 2, opacity: 0.8 }}
          />

          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            404
          </Typography>

          <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 2 }}>
            Page non trouvée
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            paragraph
            sx={{ mb: 4 }}
          >
            La page que vous recherchez n'existe pas ou a été déplacée.
          </Typography>

          <Button
            component={RouterLink}
            to="/"
            variant="contained"
            color="primary"
            size="large"
            sx={{ fontWeight: 600 }}
          >
            Retour à l'accueil
          </Button>
        </Paper>
      </Container>
    </Box>
  )
}

export default NotFound
