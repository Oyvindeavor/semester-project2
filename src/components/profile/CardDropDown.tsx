import React, { useState, useEffect } from 'react';
import { Menu, MenuItem, IconButton, Fade } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface CardMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

export default function CardMenu({ onEdit, onDelete }: CardMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (anchorEl && !document.body.contains(anchorEl)) {
      setAnchorEl(null);
    }
  }, [anchorEl]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            onEdit();
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            onDelete();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
}
