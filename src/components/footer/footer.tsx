'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  IconButton,
  Divider,
} from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      role="contentinfo"
      aria-label="Site footer"
      sx={{
        py: 6,

        mt: 'auto',
        position: 'relative',
        bottom: 0,
        width: '100%',
        bgcolor: 'background.paper',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h6" component={'h2'} color="text.primary">
                <Image
                  src="/peregrineAuctions.svg"
                  alt="Logo peregrine auctions"
                  width={60}
                  height={40}
                />
                Peregrine Auctions
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <nav aria-label="Quick links">
              <Typography
                variant="subtitle1"
                component="h2"
                color="text.primary"
                gutterBottom
              >
                Quick Links
              </Typography>
              <Box
                component="ul"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  listStyle: 'none',
                  p: 0,
                  m: 0,
                }}
              >
                {[
                  { href: '/', text: 'Home' },
                  { href: '/marketplace', text: 'Auctions' },
                  { href: '/auth/signin', text: 'Login' },
                  { href: '/register', text: 'Register' },
                ].map((link) => (
                  <li key={link.href}>
                    <Box
                      component={Link}
                      href={link.href}
                      sx={{
                        mb: 1,
                        display: 'inline-block',
                        color: 'inherit',
                        textDecoration: 'none',
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                        '&:focus': {
                          outline: '2px solid currentColor',
                          outlineOffset: '2px',
                        },
                      }}
                    >
                      {link.text}
                    </Box>
                  </li>
                ))}
              </Box>
            </nav>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography
              variant="subtitle1"
              component="h2"
              color="text.primary"
              gutterBottom
            >
              Connect With Us
            </Typography>
            <Box component="nav" aria-label="Social media links">
              {[
                {
                  Icon: Facebook,
                  href: 'https://www.facebook.com/',
                  label: 'Facebook',
                },
                { Icon: Twitter, href: 'https://x.com/', label: 'Twitter' },
                {
                  Icon: Instagram,
                  href: 'https://www.instagram.com',
                  label: 'Instagram',
                },
                {
                  Icon: LinkedIn,
                  href: 'https://www.linkedin.com',
                  label: 'LinkedIn',
                },
              ].map(({ Icon, href, label }) => (
                <IconButton
                  key={href}
                  href={href}
                  color="inherit"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  sx={{
                    '&:focus': {
                      outline: '2px solid currentColor',
                      outlineOffset: '2px',
                    },
                  }}
                >
                  <Icon />
                </IconButton>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, backgroundColor: 'rgba(0,0,0,0.12)' }} />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Typography variant="body2">
            © {currentYear} Peregrine Auctions, All Rights Reserved.
          </Typography>
          <nav aria-label="Legal links">
            <Box
              component={Link}
              href="/privacy-policy"
              sx={{
                mr: 2,
                color: 'inherit',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
                '&:focus': {
                  outline: '2px solid currentColor',
                  outlineOffset: '2px',
                },
              }}
            >
              Privacy Policy
            </Box>
            <Box
              component={Link}
              href="/terms-of-service"
              sx={{
                color: 'inherit',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
                '&:focus': {
                  outline: '2px solid currentColor',
                  outlineOffset: '2px',
                },
              }}
            >
              Terms of Service
            </Box>
          </nav>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
