'use client';

import React from 'react';
import { Box, Container, Typography, Divider } from '@mui/material';
import { NextPage } from 'next';

const TermsOfService: NextPage = () => {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      {/* Page Title */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
          Terms of Service
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
          Welcome to Peregrine Auctions! These Terms of Service `Terms`` govern
          your access to and use of our website, services, and platform. By
          using our services, you agree to these Terms. Please read them
          carefully.
        </Typography>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* User Responsibilities */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
          User Responsibilities
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          When using our platform, you agree to:
        </Typography>
        <ul>
          <li>
            <Typography variant="body1" color="text.secondary">
              Provide accurate and up-to-date information during registration.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" color="text.secondary">
              Respect the rights of other users and refrain from any harmful
              behavior.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" color="text.secondary">
              Comply with all applicable laws and regulations.
            </Typography>
          </li>
        </ul>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Prohibited Activities */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
          Prohibited Activities
        </Typography>
        <Typography variant="body1" color="text.secondary">
          You agree not to engage in the following activities:
        </Typography>
        <ul>
          <li>
            <Typography variant="body1" color="text.secondary">
              Posting or sharing any false, misleading, or harmful content.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" color="text.secondary">
              Using automated systems or bots to interact with the platform.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" color="text.secondary">
              Attempting to gain unauthorized access to other accounts or our
              systems.
            </Typography>
          </li>
        </ul>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Limitation of Liability */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
          Limitation of Liability
        </Typography>
        <Typography variant="body1" color="text.secondary">
          To the maximum extent permitted by law, Peregrine Auctions is not
          responsible for any indirect, incidental, or consequential damages
          arising from your use of our platform.
        </Typography>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Termination */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
          Termination
        </Typography>
        <Typography variant="body1" color="text.secondary">
          We reserve the right to suspend or terminate your access to our
          platform at any time for any reason, including violation of these
          Terms.
        </Typography>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Modifications */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
          Modifications to Terms
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Peregrine Auctions reserves the right to modify these Terms at any
          time. Changes will be effective immediately upon posting. Your
          continued use of the platform constitutes acceptance of the modified
          Terms.
        </Typography>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Governing Law */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
          Governing Law
        </Typography>
        <Typography variant="body1" color="text.secondary">
          These Terms are governed by and construed in accordance with the laws
          of your jurisdiction. Any disputes arising under these Terms shall be
          resolved in the courts of your jurisdiction.
        </Typography>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Contact Information */}
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
          Contact Us
        </Typography>
        <Typography variant="body1" color="text.secondary">
          If you have any questions or concerns about these Terms of Service,
          please contact us at{' '}
          <a href="mailto:support@peregrineauctions.com">
            support@peregrineauctions.com
          </a>
          .
        </Typography>
      </Box>
    </Container>
  );
};

export default TermsOfService;
