'use client';

import { Modal, Sheet, ModalClose, Typography } from '@mui/joy';
import { ReactNode, useState } from 'react';

interface ModalComponentProps {
  title: string;
  description?: string;
  open: boolean;
  onCloseAction: () => void;
  children?: ReactNode;
}

export default function ModalComponent({
  title,
  description,
  open,
  onCloseAction,
  children,
}: ModalComponentProps) {
  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={open}
      onClose={onCloseAction}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Sheet
        variant="outlined"
        sx={{ maxWidth: 500, borderRadius: 'md', p: 3, boxShadow: 'lg' }}
      >
        <ModalClose variant="plain" sx={{ m: 1 }} onClick={onCloseAction} />
        <Typography
          component="h2"
          id="modal-title"
          level="h4"
          textColor="inherit"
          sx={{ fontWeight: 'lg', mb: 1 }}
        >
          {title}
        </Typography>
        {description && (
          <Typography id="modal-desc" textColor="text.tertiary">
            {description}
          </Typography>
        )}
        {children}
      </Sheet>
    </Modal>
  );
}
