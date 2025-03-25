import React from 'react'
import {
  Box,
  Container,
  Typography,
  Link,
  Divider,
  Stack,
  IconButton,
} from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        mt: 'auto',
        backgroundColor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'center', sm: 'flex-start' },
            gap: 2,
          }}
        >
          {/* Left side */}
          <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              MERN Todo App
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Une application simple de gestion de tâches
            </Typography>
          </Box>

          {/* Right side */}
          <Box sx={{ textAlign: { xs: 'center', sm: 'right' } }}>
            {/* Social Icons */}
            <Stack
              direction="row"
              spacing={1}
              justifyContent={{ xs: 'center', sm: 'flex-end' }}
              mb={2}
            >
              <IconButton color="inherit" aria-label="GitHub" size="small">
                <GitHubIcon fontSize="small" />
              </IconButton>
              <IconButton color="inherit" aria-label="LinkedIn" size="small">
                <LinkedInIcon fontSize="small" />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter" size="small">
                <TwitterIcon fontSize="small" />
              </IconButton>
            </Stack>

            {/* Links */}
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={{ xs: 1, sm: 2 }}
              justifyContent={{ xs: 'center', sm: 'flex-end' }}
              mb={2}
            >
              <Link href="#" color="inherit" underline="hover">
                Confidentialité
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Conditions d'utilisation
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Contact
              </Link>
            </Stack>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Copyright */}
        <Typography variant="body2" color="text.secondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="#">
            MERN Todo App
          </Link>{' '}
          {currentYear}
        </Typography>
      </Container>
    </Box>
  )
}

export default Footer
