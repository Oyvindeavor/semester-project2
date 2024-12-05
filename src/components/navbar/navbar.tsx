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
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

const NAVIGATION_ITEMS = [
  { name: 'Marketplace', href: '/marketplace', icon: <StorefrontIcon /> },
  { name: 'Create Auction', href: '/create', icon: <AddCircleIcon /> },
  { name: 'Profile', href: '/profile', icon: <PersonIcon /> },
];

const USER_MENU_ITEMS = [
  { name: 'Profile', href: '/profile', icon: <PersonIcon /> },
  { name: 'Create Listing', href: '/create', icon: <AddCircleIcon /> },
  { name: 'Logout', icon: <LogoutIcon />, action: () => signOut() },
];

export default function NavBar() {
  const { data: session, status } = useSession();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (status === 'loading') return null;

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const renderNavItems = (mobile = false) => {
    if (!session) return null;

    return NAVIGATION_ITEMS.map((item) =>
      mobile ? (
        <ListItem
          key={item.name}
          component={Link}
          href={item.href}
          onClick={handleDrawerToggle}
          sx={{ py: 1.5 }}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.name} />
        </ListItem>
      ) : (
        <Button
          key={item.name}
          component={Link}
          href={item.href}
          startIcon={item.icon}
          sx={{
            color: theme.palette.text.primary,
            mx: 1,
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
          }}
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
      sx={{
        display: { xs: 'block', md: 'none' },
        '& .MuiDrawer-paper': {
          width: 280,
          boxSizing: 'border-box',
          backgroundColor: theme.palette.background.default,
        },
      }}
    >
      <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <StorefrontIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
          <Typography variant="h6" color="primary">
            Auction Platform
          </Typography>
        </Box>
        {session && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              src={session.user.image || ''}
              alt={session.user.name || 'User'}
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
      <List sx={{ pt: 1 }}>
        {renderNavItems(true)}
        {session && (
          <>
            <Divider sx={{ my: 1 }} />
            {USER_MENU_ITEMS.map((item) => (
              <ListItem
                key={item.name}
                onClick={() => {
                  handleDrawerToggle();
                  item.action?.();
                }}
                component={item.href ? Link : 'li'}
                href={item.href}
                sx={{ py: 1.5 }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
          </>
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
          sx={{ py: 1.5 }}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.name} />
        </MenuItem>
      ))}
    </Menu>
  );

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: theme.palette.background.default,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 70 } }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <StorefrontIcon
                sx={{ mr: 1, color: theme.palette.primary.main }}
              />
              <Typography
                variant="h6"
                noWrap
                sx={{
                  fontWeight: 700,
                  color: theme.palette.text.primary,
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                Auction
              </Typography>
            </Box>
          </Link>

          {/* Desktop Navigation */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center',
            }}
          >
            {renderNavItems()}
          </Box>

          {/* User Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
            {session ? (
              <>
                <IconButton
                  onClick={handleMenuOpen}
                  sx={{
                    p: 0,
                    display: { xs: 'none', md: 'flex' },
                  }}
                >
                  <Avatar
                    alt={session.user.name || 'User'}
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
                <IconButton
                  color="inherit"
                  edge="end"
                  onClick={handleDrawerToggle}
                  sx={{
                    ml: 1,
                    display: { md: 'none' },
                    color: theme.palette.text.primary,
                  }}
                >
                  <MenuIcon />
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

          {!isMobile && renderUserMenu()}
        </Toolbar>
      </Container>

      {renderMobileDrawer()}
    </AppBar>
  );
}
