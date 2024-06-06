import React, { useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './IncrmBtn.css';
 
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
   
    boxShadow: 10,
    p: 4,
    textAlign: 'center',
    borderRadius: 3,
    // backgroundImage: 'linear-gradient(rgba(99, 112, 168, 0.5), rgba(81, 91, 233, 0.5))',
  };
 
 
const IncrementDecrementButton = () => {
    const [a, setA] = useState(1);
 
    const handlePlusClick = () => {
      setA((prevA) => {
        const newA = +prevA + 1;
        return newA < 10 ? `0${newA}` : newA;
      });
    };
 
    const handleMinusClick = () => {
      if (a > 1) {
        setA((prevA) => {
          const newA = +prevA - 1;
          return newA < 10 ? `0${newA}` : newA;
        });
      }
    };
 
    return (
        <div className="wrapper">
          <span className="minus" onClick={handleMinusClick}>-</span>
          <span className="num">{a}</span>
          <span className="plus" onClick={handlePlusClick}>+</span>
        </div>
      );
    };
   
 
const BookingConfirmation = ({ isConfirmed, handleConfirmClick }) => {
  return (
    <div>
      <IncrementDecrementButton />
      <button type="button" className="btn btn-outline-dark" onClick={handleConfirmClick}>
        Confirm Ticket
      </button>
      {isConfirmed && <h5 style={{marginTop:'20px'}}>Booking Confirmed</h5>}
    </div>
  );
};
 
 
export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
 
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleConfirmClick = () => setIsConfirmed(true);
 
  return (
    <div>
      <Button onClick={handleOpen}>Select timing</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
   
      >
        <Box sx={style}>
          <h2>How Many Seats?</h2>
          <Typography id="modal-modal-title" sx={{ mt: 3 }}> Price $$ </Typography>
         
          <BookingConfirmation isConfirmed={isConfirmed} handleConfirmClick={handleConfirmClick} />
        </Box>
      </Modal>
    </div>
  );
}
 