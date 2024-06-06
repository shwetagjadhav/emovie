import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import MovieList from './Movies';
import Slider from './Slider';

function App() {
 const [data, setData] = useState({
    cities: [],
    movies: [],
    currentCity: ''
 });

 useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const city = localStorage.getItem("city") || 'Pune'; // Default 'Pune' 
        const response = await axios.get(`http://localhost:8000/movieCity?city=${city}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });
        setData(prevData => ({
          ...prevData,
          ...response.data,
          currentCity: city, // Updating current city in the state
        }));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
 }, []);

 const fetchMoviesByCity = async (cityName) => {
    try {
      localStorage.setItem('city', cityName); 
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:8000/movieCity?city=${cityName}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });
      setData(prevData => ({
        ...prevData,
        ...response.data,
        currentCity: cityName, 
      }));
    } catch (error) {
      console.error(error);
    }
 };

 return (
    <>
      <Header data={data} fetchMoviesByCity={fetchMoviesByCity} />
      <Slider />
      <MovieList data={data} />
    </>
 );
}

export default App;
