import React, { createContext, useContext, useState } from "react";
 
const ModalContext = createContext();
 
export const useModal = () => useContext(ModalContext);
 
export const ModalProvider = ({ children }) => {
 const [open, setOpen] = useState(false);
 const [showId, setShowId] = useState(null);
 
 const handleOpen = (showId) => {
    setShowId(showId);
    setOpen(true);
 };
 
 const handleClose = () => {
    setOpen(false);
   
 };
 
 return (
    <ModalContext.Provider value={{ open, handleOpen, handleClose, showId }}>
      {children}
    </ModalContext.Provider>
 );
};