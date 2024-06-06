import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useModal } from "./ModalContext";
import "./IncrmBtn.css";
import axios from 'axios';
 
const style = {
 position: "absolute",
 top: "50%",
 left: "50%",
 transform: "translate(-50%, -50%)",
 width: 400,
 bgcolor: "background.paper",
 boxShadow: 10,
 p: 4,
 textAlign: "center",
 borderRadius: 3,
};
 
const IncrementDecrementButton = ({ticketCount, setTicketCount}) => {
 const handlePlusClick = () => {
    setTicketCount(ticketCount + 1);
 };
 
 const handleMinusClick = () => {
    if (ticketCount > 1) {
      setTicketCount(ticketCount - 1);
    }
 };
 
 return (
    <div className="wrapper">
      <span className="minus" onClick={handleMinusClick}> - </span>
      <span className="num">{ticketCount}</span>
      <span className="plus" onClick={handlePlusClick}> + </span>
    </div>
 );
};
 
const BookingConfirmation = ({ ticketCount, setTicketCount, handleConfirmClick }) => {
 return (
    <div>
      <IncrementDecrementButton ticketCount={ticketCount} setTicketCount={setTicketCount}/>
      <button type="button" className="btn btn-outline-dark" onClick={handleConfirmClick}> Confirm Ticket </button>
    </div>
 );
};
 
export default function BasicModal() {
 const { open, handleClose, showId } = useModal();
 const [ticketCount, setTicketCount] = useState(1);
 const [bookingError, setBookingError] = useState(null); // New state for booking errors
 const [bookingSuccess, setBookingSuccess] = useState(null); // New state for booking success message
 
 const handleConfirmClick = async () => {
  try {
     const token = localStorage.getItem('token');
     const userInfo = JSON.parse(localStorage.getItem('user'));
     const response = await axios.post(`http://localhost:8000/bookmovie/${showId}`, {
       numseats: ticketCount,
       user: userInfo.id
     }, {
       headers: {
         'Content-Type': 'application/json',
         'Authorization': `Token ${token}`,
       },
     });
     if (response.data.success) {
      setBookingSuccess(null);
       setBookingError(null);
       setBookingSuccess(response.data.success); 
     } else if (response.data.error) {
       setBookingSuccess(null);
       setBookingError(null);
       setBookingError(response.data.error); 
     }
  } catch (error) {
     console.error('Error confirming booking:', error);
     setBookingSuccess(null);
     setBookingError(null);
     setBookingError('Housefull !!');
  }
 };
 
 // Function to reset modal content
 const resetModalContent = () => {
    setTicketCount(1);
    setBookingError(null);
    setBookingSuccess(null);
 };
 
 // Reset modal content when closing
 const handleCloseWithReset = () => {
    resetModalContent();
    handleClose();
 };
 
 return (
    <div>
      <Modal open={open} onClose={handleCloseWithReset} aria-labelledby="modal-modal-title">
        <Box sx={style}>
          <h2>How Many Seats?</h2>
          <Typography id="modal-modal-title" sx={{ mt: 3 }}>
            {" "}
            {" "}
          </Typography>
          <BookingConfirmation
            ticketCount={ticketCount}
            setTicketCount={setTicketCount}
            handleConfirmClick={handleConfirmClick}
          />
          {bookingError && <h5 style={{ marginTop: "20px", color:"red" }}>{bookingError}</h5>}
          {bookingSuccess && <h5 style={{ marginTop: "20px", color:"green" }}>{bookingSuccess}</h5>} 
        </Box>
      </Modal>
    </div>
 );
}