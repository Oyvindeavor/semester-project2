import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  IconButton,
  Divider,
  Link,
} from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#f4f4f4',
        py: 6,
        color: 'text.secondary',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info Column */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              AuctionHub
            </Typography>
            <Typography variant="body2">
              Your premier destination for unique and valuable auctions.
            </Typography>
          </Grid>

          {/* Quick Links Column */}
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Link href="/" color="inherit" underline="hover" sx={{ mb: 1 }}>
                Home
              </Link>
              <Link
                href="/marketplace"
                color="inherit"
                underline="hover"
                sx={{ mb: 1 }}
              >
                Auctions
              </Link>
              <Link
                href="/auth/signin"
                color="inherit"
                underline="hover"
                sx={{ mb: 1 }}
              >
                Login
              </Link>
              <Link href="/register" color="inherit" underline="hover">
                Register
              </Link>
            </Box>
          </Grid>

          {/* Social Media Column */}
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom>
              Connect With Us
            </Typography>
            <Box>
              <IconButton
                href="https://www.facebook.com/"
                color="inherit"
                target="blank"
              >
                <Facebook />
              </IconButton>
              <IconButton href="https://x.com/" color="inherit" target="blank">
                <Twitter />
              </IconButton>
              <IconButton
                href="https://www.instagram.com"
                color="inherit"
                target="blank"
              >
                <Instagram />
              </IconButton>
              <IconButton
                href="https://www.linkedin.com"
                color="inherit"
                target="blank"
              >
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, backgroundColor: 'rgba(0,0,0,0.12)' }} />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="body2">
            © {currentYear} AuctionHub. All Rights Reserved.
          </Typography>
          <Box>
            <Link href="#" color="inherit" underline="hover" sx={{ mr: 2 }}>
              Privacy Policy
            </Link>
            <Link href="#" color="inherit" underline="hover">
              Terms of Service
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
