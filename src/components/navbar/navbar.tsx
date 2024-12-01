'use client';

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import {
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { useAuth } from '@/context/useAuth';
import Link from 'next/link';

export default function NavBar() {
  const { loggedIn, user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setMobileOpen(open);
  };

  const pages = [
    { name: 'Marketplace', href: '/marketplace' },
    { name: 'Create Auction', href: '/create' },
    { name: 'Profile', href: '/profile' },
  ];

  if (!loggedIn) {
    return null; // Handle the logged-out state separately
  }

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Logo */}
        <Link
          href="/"
          passHref
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <Box
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          >
            <AdbIcon sx={{ mr: 1 }} />
            <Typography variant="h6" noWrap>
              Auction
            </Typography>
          </Box>
        </Link>

        {/* Desktop Navigation */}
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: 'none', md: 'flex' },
            justifyContent: 'flex-end',
          }}
        >
          {pages.map((page) => (
            <Link key={page.name} href={page.href} passHref>
              <Typography
                variant="button"
                sx={{
                  color: 'white',
                  mx: 2,
                  cursor: 'pointer',
                  textDecoration: 'none',
                }}
              >
                {page.name}
              </Typography>
            </Link>
          ))}
          <Typography
            variant="button"
            onClick={logout}
            sx={{
              color: 'white',
              cursor: 'pointer',
              mx: 2,
              textDecoration: 'none',
            }}
          >
            Logout
          </Typography>
        </Box>

        {/* Mobile Menu */}
        <Box
          sx={{
            display: { xs: 'flex', md: 'none' },
            flexGrow: 1,
            justifyContent: 'flex-end',
          }}
        >
          <IconButton color="inherit" edge="start" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Avatar */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 2 }}>
          <Avatar
            alt={user?.avatar?.alt || 'User Avatar'}
            src={user?.avatar?.url}
            sx={{ width: 32, height: 32 }}
          />
        </Box>
      </Toolbar>

      {/* Drawer for Mobile */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={toggleDrawer(false)}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {pages.map((page) => (
              <ListItem button key={page.name}>
                <Link
                  href={page.href}
                  passHref
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <ListItemText primary={page.name} />
                </Link>
              </ListItem>
            ))}
            <Divider />
            <ListItem button onClick={logout}>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}
