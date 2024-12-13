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
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const NAVIGATION_ITEMS = [
  { name: 'Marketplace', href: '/marketplace', icon: <StorefrontIcon /> },
];

const USER_MENU_ITEMS = [
  { name: 'Profile', href: '/profile', icon: <PersonIcon /> },
  { name: 'Create Listing', href: '/create', icon: <AddCircleIcon /> },
  {
    name: 'Logout',
    icon: <LogoutIcon />,
    action: () => signOut({ redirect: false, callbackUrl: '/' }),
  },
];

export default function NavBar() {
  const { data: session, status } = useSession();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();

  if (status === 'loading') return null;

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const renderNavItems = (mobile = false) => {
    return NAVIGATION_ITEMS.map((item) =>
      mobile ? (
        <ListItem
          key={item.name}
          component={Link}
          href={item.href}
          onClick={handleDrawerToggle}
          sx={{ py: 1.5 }}
          role="menuitem"
        >
          <ListItemIcon aria-hidden="true">{item.icon}</ListItemIcon>
          <ListItemText primary={item.name} />
        </ListItem>
      ) : (
        <Button
          key={item.name}
          component={Link}
          href={item.href}
          startIcon={item.icon}
          variant="outlined"
          sx={{
            color: theme.palette.text.primary,
            mx: 1,
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
            '&:focus': {
              outline: '2px solid currentColor',
              outlineOffset: '2px',
            },
          }}
          aria-label={item.name}
        >
          {item.name}
        </Button>
      )
    );
  };

  const renderMobileDrawer = () => (
    <Drawer
      variant="temporary"
      anchor="right"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{ keepMounted: true }}
      aria-label="Mobile navigation menu"
      sx={{
        display: { xs: 'block', md: 'none' },
        '& .MuiDrawer-paper': {
          width: 280,
          boxSizing: 'border-box',
          backgroundColor: theme.palette.background.default,
        },
      }}
    >
      <Box
        sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}
        role="banner"
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Image
            src="/peregrineAuctions.svg"
            width={30}
            height={30}
            alt="Peregrine Auctions Logo"
          />
          <Typography variant="h6" color="primary">
            Peregrine Auctions
          </Typography>
        </Box>
        {session && (
          <Box
            sx={{ display: 'flex', alignItems: 'center' }}
            role="complementary"
          >
            <Avatar
              src={session.user.image || ''}
              alt={session.user.name || 'User avatar'}
              sx={{ width: 32, height: 32, mr: 1 }}
            />
            <Box>
              <Typography variant="subtitle2">{session.user.name}</Typography>
              <Typography variant="caption" color="text.secondary">
                {session.user.email}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
      <List sx={{ pt: 1 }} role="menu" aria-label="Navigation menu">
        {renderNavItems(true)}
        <Divider sx={{ my: 1 }} />
        {session ? (
          USER_MENU_ITEMS.map((item) => (
            <ListItem
              key={item.name}
              onClick={() => {
                handleDrawerToggle();
                item.action?.();
              }}
              component={item.href ? Link : 'li'}
              href={item.href}
              sx={{ py: 1.5 }}
              role="menuitem"
            >
              <ListItemIcon aria-hidden="true">{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          ))
        ) : (
          <ListItem
            component={Link}
            href="/auth/signin"
            onClick={handleDrawerToggle}
            sx={{ py: 1.5 }}
            role="menuitem"
          >
            <ListItemIcon aria-hidden="true">
              <LoginIcon />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItem>
        )}
      </List>
    </Drawer>
  );

  const renderUserMenu = () => (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
      onClick={handleMenuClose}
      PaperProps={{
        sx: {
          mt: 1.5,
          minWidth: 220,
          boxShadow: theme.shadows[8],
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      role="menu"
      aria-label="User menu"
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
          onClick={item.action ? item.action : undefined}
          component={item.href ? Link : 'li'}
          href={item.href}
          sx={{
            py: 1.5,
            '&:focus': {
              outline: '2px solid currentColor',
              outlineOffset: '-2px',
            },
          }}
          role="menuitem"
        >
          <ListItemIcon aria-hidden="true">{item.icon}</ListItemIcon>
          <ListItemText primary={item.name} />
        </MenuItem>
      ))}
    </Menu>
  );

  return (
    <AppBar
      position="sticky"
      elevation={0}
      component="nav"
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 70 } }}>
          <Link
            href="/"
            style={{ textDecoration: 'none', color: 'inherit' }}
            aria-label="Home"
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ mr: 1, color: theme.palette.primary.main }}>
                <Image
                  src="/peregrineAuctions.svg"
                  width={40}
                  height={40}
                  alt=""
                  aria-hidden="true"
                />
              </Box>
              <Typography
                variant="h6"
                noWrap
                sx={{
                  fontWeight: 700,
                  color: theme.palette.text.primary,
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                Peregrine Auctions
              </Typography>
            </Box>
          </Link>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center',
            }}
            role="navigation"
            aria-label="Main navigation"
          >
            {renderNavItems()}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
            {session ? (
              <IconButton
                onClick={handleMenuOpen}
                sx={{
                  p: 0,
                  display: { xs: 'none', md: 'flex' },
                }}
                aria-label="Open user menu"
                aria-expanded={Boolean(anchorEl)}
                aria-haspopup="true"
              >
                <Avatar
                  alt={session.user.name || 'User avatar'}
                  src={session.user.image || ''}
                  sx={{
                    width: 40,
                    height: 40,
                    border: `2px solid ${theme.palette.primary.main}`,
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                />
              </IconButton>
            ) : (
              <Button
                component={Link}
                href="/auth/signin"
                variant="outlined"
                color="primary"
                sx={{ display: { xs: 'none', md: 'flex', color: 'white' } }}
              >
                Login
              </Button>
            )}
            <IconButton
              color="inherit"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{
                ml: 1,
                display: { md: 'none' },
                color: theme.palette.text.primary,
              }}
              aria-label="Open mobile menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {session && !isMobile && renderUserMenu()}
        </Toolbar>
      </Container>

      {renderMobileDrawer()}
    </AppBar>
  );
}
