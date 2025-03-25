import React, { useState } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  Container,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import MenuIcon from '@mui/icons-material/Menu'
import ChecklistIcon from '@mui/icons-material/Checklist'

const navigation = [
  { name: 'Accueil', path: '/' },
  { name: 'Todos', path: '/todos' },
]

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const location = useLocation()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
        }}
      >
        <ChecklistIcon sx={{ mr: 1 }} />
        <Typography variant="h6" component="div">
          Todo App
        </Typography>
      </Box>
      <List>
        {navigation.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={item.path}
              selected={isActive(item.path)}
              sx={{
                '&.Mui-selected': {
                  bgcolor: 'primary.light',
                  '&:hover': {
                    bgcolor: 'primary.light',
                  },
                },
              }}
            >
              <ListItemText
                primary={item.name}
                primaryTypographyProps={{
                  textAlign: 'center',
                  fontWeight: isActive(item.path) ? 'bold' : 'normal',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Container maxWidth="lg">
        <Toolbar
          sx={{
            px: { xs: 1, sm: 2 },
            justifyContent: 'space-between',
          }}
        >
          {/* Logo & Title */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ChecklistIcon sx={{ mr: 1, color: 'primary.main' }} />
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{
                fontWeight: 600,
                color: 'text.primary',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              Todo App
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {navigation.map((item) => (
                <Button
                  key={item.name}
                  component={RouterLink}
                  to={item.path}
                  color={isActive(item.path) ? 'primary' : 'inherit'}
                  sx={{
                    mx: 1,
                    fontWeight: isActive(item.path) ? 'bold' : 'normal',
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </Box>
          )}

          {/* Mobile menu button */}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ ml: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </Container>

      {/* Mobile Navigation Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  )
}

export default Header
