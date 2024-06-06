import React, { useState, useEffect } from "react";
import './MovieDesc.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import fighter from '../Assets/fighter.jpg';
import openheimer from '../Assets/openheimer.jpg';
import dune from '../Assets/dune.jpg';
import kgf from '../Assets/kgf.jpg';
import IF from '../Assets/IF.jpg';
import marvals from '../Assets/marvals.jpg';
import animal from '../Assets/animal.jpg';
import badland from '../Assets/badland.jpg';
import aquaman from '../Assets/aquaman.jpg';
import { Link } from 'react-router-dom';


function MovieDesc() {
  const [movie, setMovie] = useState(null);
  const { id } = useParams(); 

  const getMovieImage = (movieId) => {
    switch (movieId) {
      case '1':
        return openheimer;
      case '2':
        return marvals;
      case '3':
        return animal;
      case '4':
        return aquaman;
      case '5':
        return dune;
      case '6':
        return IF;
      case '7':
        return fighter;
      case '8':
        return badland;
      case '9':
        return kgf;
      default:
        return '';
    }
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
       try {
         const token = localStorage.getItem("token");
         const response = await axios.get(`http://localhost:8000/movie/${id}`, {
           params: {
             city: localStorage.getItem('city')
           },
           headers: {
             "Content-Type": "application/json",
             Authorization: `Token ${token}`,
           },
         });
   
         if (response.data.error) {
           alert(response.data.error);
           return
         } else {
           setMovie(response.data);
         }
       } catch (error) {
         console.error(error);
         alert('An error occurred while fetching movie details.');
       }
    };
   
    fetchMovieDetails();
   }, [id]);
   

  return (
    <div style={{ backgroundColor:'aliceblue', minHeight:'80vh' }}>
      <br />
      <div className="rowz">
        <div className="cola">
          <div className="polaroid">
            {movie && (
              <img src={getMovieImage(id)}
              alt="5 Terre"  style={{
                width: '250px', 
                height: 'auto', 
                borderRadius: '10px',
                aspectRatio:2/3,
                objectFit: 'cover', 
                objectPosition: 'center'
              }}/>
            )}
            <br />
          </div>
        </div>
        <div className="movie-container">
          {movie && (
            <div className="movie-details">
              <h3>Movie Title: {movie.name}</h3>
              <h5>Duration: {movie.runtime}</h5>
              <h5>Release date: {movie.date}</h5>
              <h5>Language: {movie.lang}</h5>
              <h5>Genre: {movie.genre}</h5>
              <p>Description: {movie.desc}</p>
              <br />
              <Link to={`/book/${movie.id}`} >
              <button type="button" className="btn btn-outline-dark"
              style={{width: '150px', height: '40px', marginBottom:"40px"}}
              >Book Ticket</button>
              </Link>
              
            </div>
            
          )}
        </div>
      </div>
      <br />
      <br />
    </div>
  );
}

export default MovieDesc;
