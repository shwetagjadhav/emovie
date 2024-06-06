import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Theater from "../components/Theater";
import { ModalProvider } from "../components/ModalContext";
import BasicModal from "../components/BasicModal";



export default class Booking extends React.Component {
    render() {
      return (
        <>
        
        <Header isMoviePage={true}/>       
        
        <ModalProvider>
        <Theater />
        <BasicModal />
        </ModalProvider>
        <Footer /> 
        </>
      );
    }
  }