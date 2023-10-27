import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
// import Button from '@mui/material/Button';

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
      {/*<Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }} className="flex flex-col justify-center rounded-3xl">
          <h1 className='text-[crimson] text-3xl font-bold flex justify-center mb-2 text-bold'>Alert!!</h1>
          <h2 id="parent-modal-title" className='flex justify-center mt-2 text-black text-xl font-semibold'>Do you want to continue the test?</h2>
          <div className="flex flex-row justify-evenly mt-3 gap-5">
            <button className="text-white text-xl bg-green-500 px-3 py-1 rounded-xl" onClick={handleOpen}>Yes</button>
            <button className="text-white text-xl bg-[crimson] px-3 py-1 rounded-xl" onClick={handleClose}>No</button>
          </div>
      
        </Box>
      </Modal>
    </div>
  );
}