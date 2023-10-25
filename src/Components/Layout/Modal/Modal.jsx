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
  // border: '2px solid #000',
  boxShadow: 18,
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
    handle.enter();
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
        <Box sx={{ ...style, width: 400 }} className="flex flex-col justify-center">
          <h1 id="parent-modal-title" className='flex justify-center mt-2 text-bold text-lg'>Do you want to continue the test?</h1>
          <div className="flex flex-row justify-center mt-3">
            <Button className="text-indigo-600 text-bold" onClick={handleOpen}>Yes</Button>
            <Button className="text-indigo-600 text-semibold" onClick={handleClose}>No</Button>
          </div>
      
        </Box>
      </Modal>
    </div>
  );
}