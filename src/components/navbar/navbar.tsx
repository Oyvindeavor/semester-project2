'use client';

import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Container,
  useTheme,
  Button,
  Menu,
  MenuItem,
  Divider,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// --- Constants for easy management ---
const NAV_ITEMS = [
  { name: 'Marketplace', href: '/marketplace', icon: <StorefrontIcon /> },
];

const USER_MENU_ITEMS = [
  { name: 'Profile', href: '/profile', icon: <PersonIcon /> },
  {
    name: 'Logout',
    icon: <LogoutIcon />,
    action: () => signOut({ callbackUrl: '/' }),
  },
];

export default function NavBar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  if (status === 'loading') {
    // Render a skeleton or null during session loading to prevent flicker
    return <AppBar position="sticky" sx={{ height: { xs: 64, md: 70 } }} />;
  }

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const MobileDrawer = (
    <Drawer
      variant="temporary"
      anchor="right"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{ keepMounted: true }}
      sx={{
        display: { xs: 'block', md: 'none' },
        '& .MuiDrawer-paper': {
          width: 280,
          boxSizing: 'border-box',
          // Glassmorphism for the drawer
          backgroundColor: 'rgba(30, 30, 30, 0.9)',
          backdropFilter: 'blur(10px)',
          borderLeft: `1px solid ${theme.palette.divider}`,
        },
      }}
    >
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Link href="/" passHref>
          <Image
            src="/peregrineAuctions.svg"
            width={40}
            height={40}
            alt="Peregrine Auctions Logo"
          />
        </Link>
      </Box>
      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
      <List>
        {session && (
          <ListItem>
            <ListItemIcon>
              <Avatar
                src={session.user.image || ''}
                alt={session.user.name || ''}
              />
            </ListItemIcon>
            <ListItemText
              primary={session.user.name}
              secondary={session.user.email}
            />
          </ListItem>
        )}
        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />

        {/* --- Navigation Items --- */}
        {NAV_ITEMS.map((item) => (
          <ListItem
            button
            key={item.name}
            component={Link}
            href={item.href}
            onClick={handleDrawerToggle}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}

        {/* --- User Specific Items --- */}
        {session ? (
          <>
            <ListItem
              button
              component={Link}
              href="/create"
              onClick={handleDrawerToggle}
            >
              <ListItemIcon>
                <AddCircleOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Create Listing" />
            </ListItem>
            {USER_MENU_ITEMS.map((item) => (
              <ListItem
                button
                key={item.name}
                component={item.href ? Link : 'li'}
                href={item.href || ''}
                onClick={() => {
                  if (item.action) item.action();
                  handleDrawerToggle();
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
          </>
        ) : (
          <ListItem
            button
            component={Link}
            href="/auth/signin"
            onClick={handleDrawerToggle}
          >
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItem>
        )}
      </List>
    </Drawer>
  );

  const UserMenu = (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
      onClick={handleMenuClose}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          mt: 1.5,
          minWidth: 220,
          // Glassmorphism for the menu
          backgroundColor: 'rgba(30, 30, 30, 0.9)',
          backdropFilter: 'blur(10px)',
          border: `1px solid ${theme.palette.divider}`,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
        },
      }}
    >
      <Box sx={{ px: 2, py: 1.5 }}>
        <Typography variant="subtitle1" noWrap>
          {session?.user?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {session?.user?.email}
        </Typography>
      </Box>
      <Divider />
      {USER_MENU_ITEMS.map((item) => (
        <MenuItem
          key={item.name}
          onClick={
            item.action ? item.action : () => router.push(item.href || '/')
          }
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          {item.name}
        </MenuItem>
      ))}
    </Menu>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        component="nav"
        sx={{
          // Glassmorphism AppBar
          backgroundColor: 'rgba(18, 18, 18, 0.8)', // semi-transparent background
          backdropFilter: 'blur(10px)',
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 70 } }}>
            {/* --- Logo and Brand Name --- */}
            <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                <Image
                  src="/peregrineAuctions.svg"
                  width={40}
                  height={40}
                  alt="Peregrine Auctions Logo"
                />
                <Typography
                  variant="h6"
                  noWrap
                  sx={{
                    fontWeight: 700,
                    ml: 1.5,
                    display: { xs: 'none', sm: 'block' },
                  }}
                >
                  Peregrine Auctions
                </Typography>
              </Box>
            </Link>

            <Box sx={{ flexGrow: 1 }} />

            {/* --- Desktop Navigation --- */}
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                gap: 1,
              }}
            >
              {NAV_ITEMS.map((item) => (
                <Button
                  key={item.name}
                  component={Link}
                  href={item.href}
                  sx={{ color: 'text.primary', fontWeight: 500 }}
                >
                  {item.name}
                </Button>
              ))}

              {session ? (
                <>
                  <Button
                    component={Link}
                    href="/create"
                    variant="contained"
                    color="secondary"
                    startIcon={<AddCircleOutlineIcon />}
                  >
                    Create Listing
                  </Button>
                  <IconButton onClick={handleMenuOpen} sx={{ p: 0, ml: 1 }}>
                    <Avatar
                      alt={session.user.name || ''}
                      src={session.user.image || ''}
                      sx={{
                        width: 42,
                        height: 42,
                        border: `2px solid ${theme.palette.secondary.main}`,
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          transform: 'scale(1.05)',
                          boxShadow: `0 0 15px ${theme.palette.secondary.main}`,
                        },
                      }}
                    />
                  </IconButton>
                </>
              ) : (
                <Button
                  component={Link}
                  href="/auth/signin"
                  variant="contained"
                  color="primary"
                >
                  Login
                </Button>
              )}
            </Box>

            {/* --- Mobile Burger Icon --- */}
            <IconButton
              color="inherit"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* --- Render Menus and Drawers --- */}
      {MobileDrawer}
      {session && !isMobile && UserMenu}
    </>
  );
}
