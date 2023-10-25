import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};



export default function BasicModal({open, setOpen, handle, handleSubmit}) {
  // alert("lasdfj");

  const handleOpen = () => {
    handle.enter();
    setOpen(false);
  };
  const handleClose = () => {
    handleSubmit();
    setOpen(false);
  };

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">Do you want to continue the test?</h2>

      <Button onClick={handleOpen}>Yes</Button>
      <Button onClick={handleClose}>No</Button>
        </Box>
      </Modal>
    </div>
  );
}