import React from 'react'
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Container,
  Paper,
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt'

const features = [
  {
    icon: <FormatListBulletedIcon sx={{ fontSize: 40 }} />,
    title: 'Gestion des tâches',
    description:
      'Créez, modifiez et organisez vos tâches quotidiennes de manière simple et efficace.',
  },
  {
    icon: <CheckCircleOutlineIcon sx={{ fontSize: 40 }} />,
    title: 'Suivi de progression',
    description:
      'Suivez votre progression en marquant les tâches comme terminées au fur et à mesure.',
  },
  {
    icon: <DoNotDisturbAltIcon sx={{ fontSize: 40 }} />,
    title: 'Priorisation',
    description:
      'Définissez des priorités pour vos tâches afin de vous concentrer sur ce qui est important.',
  },
]

const Home = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Paper
        elevation={0}
        sx={{
          position: 'relative',
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          py: 8,
          px: 2,
          mb: 6,
          borderRadius: 2,
          backgroundImage: 'linear-gradient(120deg, #1976d2, #42a5f5)',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="md">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography
                component="h1"
                variant="h2"
                color="inherit"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                }}
              >
                Organisez vos tâches efficacement
              </Typography>
              <Typography
                variant="h5"
                color="inherit"
                paragraph
                sx={{ opacity: 0.9, mb: 4 }}
              >
                Une application simple mais puissante pour gérer vos tâches
                quotidiennes et rester productif.
              </Typography>
              <Button
                component={RouterLink}
                to="/todos"
                variant="contained"
                color="secondary"
                size="large"
                startIcon={<TaskAltIcon />}
                sx={{ py: 1.5, px: 3, fontWeight: 600 }}
              >
                Commencer maintenant
              </Button>
            </Grid>
            <Grid
              item
              xs={12}
              md={5}
              sx={{
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'center',
              }}
            >
              <TaskAltIcon
                sx={{
                  fontSize: 240,
                  color: 'white',
                  opacity: 0.15,
                  position: 'absolute',
                  right: -20,
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Paper>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography
          component="h2"
          variant="h3"
          align="center"
          gutterBottom
          sx={{ mb: 6, fontWeight: 600 }}
        >
          Fonctionnalités
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                variant="outlined"
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 3,
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ color: 'primary.main', mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography gutterBottom variant="h5" component="h3">
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" component={RouterLink} to="/todos">
                    En savoir plus
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          py: 6,
          borderTop: 1,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h4" align="center" gutterBottom>
            Prêt à améliorer votre productivité ?
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            paragraph
            sx={{ mb: 4 }}
          >
            Commencez dès maintenant à organiser vos tâches et à augmenter votre
            efficacité.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              component={RouterLink}
              to="/todos"
              variant="contained"
              color="primary"
              size="large"
            >
              Voir mes tâches
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default Home
