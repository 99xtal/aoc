import React from 'react';
import { Modal as MUIModal, Box, ModalProps } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export function Modal({ children, ...props}: ModalProps) {
  return (
    <MUIModal {...props} >
      <Box sx={style}>
        {children}
      </Box>
    </MUIModal>
  );
}