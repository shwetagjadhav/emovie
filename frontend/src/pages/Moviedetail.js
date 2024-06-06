import React from "react";

import Footer from "../components/Footer";
import MovieDesc from "../components/MovieDesc";
import Header from "../components/Header"

export default class Booking extends React.Component {
    render() {
      return (
        <>
        
         
        <Header isMoviePage={true} />
      
        <MovieDesc /> 
        <Footer />  
        
        
          
        </>
      );
    }
  }