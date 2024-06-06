import React, { useState, useEffect } from 'react';
import './Profile.css';
import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom';
 
const Profile = () => {
  const navigate = useNavigate();
  //const [user, setUser] = useState(null);
  //const [movieDetails, setMovieDetails] = useState(null);
 
  useEffect(() => {
    // Retrieve user details from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      // Parse user data into a JavaScript object
      const parsedUserData = JSON.parse(userData);
      setUser(parsedUserData);
    //fetchMovieDetails(parsedUserData.id); // Assuming user ID is stored in user object
    }
  }, []);
 
  /*const fetchMovieDetails = async (userId) => {
    try {
const response = await fetch(`http://localhost:8000/api/movies/user/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setMovieDetails(data);
      } else {
        console.error('Failed to fetch movie details');
      }
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };*/
 
  const handleLogout = async () => {
    try {
const response = await fetch('http://localhost:8000/base/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
 
      if (response.ok) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
      } else {
        console.error('Failed to logout');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
 
  return (
    <div className="profile-container">
      <h1>Profile</h1>
      {user && (
        <div className="profile-details">
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <p>Address: {user.address}</p>
          
        </div>
      )}
       {/*{movieDetails && (
        <div className="movie-details">
          <h2>Booked Movie Details</h2>
          <p>Movie Name: {movieDetails.name}</p>
          <p>Release Date: {movieDetails.releaseDate}</p>
          { Render other movie details 
        </div>
      )}*/}
      <center>
      <Link to="/login" className="btn btn-danger" onClick={handleLogout}> Logout</Link>
      </center>
    </div>
  );
};
 
export default Profile;
