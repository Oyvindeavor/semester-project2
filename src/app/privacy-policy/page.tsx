'use client';

import React from 'react';
import { Box, Container, Typography, Divider } from '@mui/material';
import { NextPage } from 'next';

const PrivacyPolicy: NextPage = () => {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      {/* Page Title */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
          Privacy Policy
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Effective Date: {new Date().toLocaleDateString()}
        </Typography>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Introduction */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
          Introduction
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome to Peregrine Auctions! We value your privacy and are committed
          to protecting your personal information. This Privacy Policy outlines
          how we collect, use, and safeguard your data when you interact with
          our platform.
        </Typography>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Information Collection */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
          Information We Collect
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          We may collect the following types of information:
        </Typography>
        <ul>
          <li>
            <Typography variant="body1" color="text.secondary">
              Personal Information: Name, email address, phone number, and other
              identifying details.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" color="text.secondary">
              Usage Data: Information about your interactions with our website,
              including IP address, browser type, and pages visited.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" color="text.secondary">
              Payment Details: Payment information for processing transactions
              securely.
            </Typography>
          </li>
        </ul>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Use of Information */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
          How We Use Your Information
        </Typography>
        <Typography variant="body1" color="text.secondary">
          The information we collect is used to:
        </Typography>
        <ul>
          <li>
            <Typography variant="body1" color="text.secondary">
              Provide and improve our services.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" color="text.secondary">
              Process transactions and communicate with you.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" color="text.secondary">
              Ensure security and compliance with legal obligations.
            </Typography>
          </li>
        </ul>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Data Sharing */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
          Sharing of Information
        </Typography>
        <Typography variant="body1" color="text.secondary">
          We do not sell your personal information. However, we may share your
          data with trusted third parties for the following purposes:
        </Typography>
        <ul>
          <li>
            <Typography variant="body1" color="text.secondary">
              To process payments and deliver services.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" color="text.secondary">
              To comply with legal requirements or enforce our policies.
            </Typography>
          </li>
        </ul>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Data Security */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
          Data Security
        </Typography>
        <Typography variant="body1" color="text.secondary">
          We take appropriate technical and organizational measures to protect
          your personal data from unauthorized access, use, or disclosure.
        </Typography>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Your Rights */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
          Your Rights
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          As a user, you have the right to:
        </Typography>
        <ul>
          <li>
            <Typography variant="body1" color="text.secondary">
              Access the personal data we hold about you.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" color="text.secondary">
              Request corrections or updates to your information.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" color="text.secondary">
              Delete your personal data under certain conditions.
            </Typography>
          </li>
        </ul>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Contact Information */}
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
          Contact Us
        </Typography>
        <Typography variant="body1" color="text.secondary">
          If you have any questions about this Privacy Policy, please contact us
          at{' '}
          <a href="mailto:support@peregrineauctions.com">
            support@peregrineauctions.com
          </a>
          .
        </Typography>
      </Box>
    </Container>
  );
};

export default PrivacyPolicy;
