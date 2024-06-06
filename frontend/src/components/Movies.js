import React from "react";
import { Link } from 'react-router-dom';
import '../index.css';
import fighter from '../Assets/fighter.jpg';
import openheimer from '../Assets/openheimer.jpg';
import dune from '../Assets/dune.jpg';
import kgf from '../Assets/kgf.jpg';
import IF from '../Assets/IF.jpg';
import marvals from '../Assets/marvals.jpg';
import animal from '../Assets/animal.jpg';
import badland from '../Assets/badland.jpg';
import aquaman from '../Assets/aquaman.jpg';

export default function MovieList({ data }) {
  console.log('MovieList props:', data);

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
  
  return (
    <>
      <div className='service-section service-three pt-0 section-padding'>
        <div className='container'>
          <div className='row'>
            <div
              className='col-12 wow fadeIn'
              data-wow-duration='.7s'
              data-wow-delay='.1s'
            >
              <div className='section-title-center section-head text-left'>
                <br />
                <br />
                <h4 className='title'>Recommended Movies</h4><br/>
              </div>
            </div>
          </div>

          <div className='row row-cols-lg-4 row-cols-md-2 row-cols-sm-2 row-cols-1 mb-n25'>
            {Array.isArray(data.movies) && data.movies.map(movie => (
              <div className='col mb-30' key={movie.id}>
                <div className='blog wow fadeIn' data-wow-duration='1.5s' data-wow-delay='.1s'>
                  <div className='blog-thumbnail' style={{ borderRadius: '10px', overflow: 'hidden' }}>
                    <Link to={`/movie/${movie.id}`} className='image'>
                    <img src={getMovieImage(""+movie.id)} alt={movie.name} style={{
                width: '250px', 
                height: 'inherit', 
                borderRadius: '10px',
                aspectRatio:2/3,
                objectFit: 'cover', 
                objectPosition: 'center' 
              }}/>
                    </Link>
                  </div>
                  <br />
                  <div className='blog-info'>
                    <h4>{movie.name}</h4>
                    <h6>Runtime: {movie.runtime} minutes</h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <br />
    </>
  );
}
