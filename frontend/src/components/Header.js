import React, { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../Assets/Nlogoz.jpg';
import { FaUserCircle } from "react-icons/fa";

function Header({ data, fetchMoviesByCity, isMoviePage = false }) {
 const [searchQuery, setSearchQuery] = useState('');
 const navigate = useNavigate();
 const [movieId, setMovieId] = useState(null);

 const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const cityName = localStorage.getItem("city") || 'Pune';
      const response = await fetch(`http://localhost:8000/movie?name=${encodeURIComponent(searchQuery)}&city=${encodeURIComponent(cityName)}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        if (data.error) {
          console.error('Error:', data.error);
          alert(data.error);
        } else {
          setMovieId(data.id);
          navigate(`/movie/${data.id}`);
        }
      } else {
        console.error('Failed to search movie:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
 };

 return (
    <Navbar bg="light" variant="light" expand="lg">
      <Container fluid>
        <Navbar.Brand as={Link} to="/home">
          <img src={logo} alt="Blog Logo" style={{ width: '140px', height: '50px', marginLeft:"20px"}}/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav"><br/>
          <Form onSubmit={handleSearch} className="d-flex" style={{width:"400px"}}>
            <Form.Control
              className="me-2"
              type="search"
              placeholder="Search Movies here"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Form>
          <Nav className="ms-auto">
            {/* <CiLocationOn size={18} /> */}
          
            {!isMoviePage && (
              <NavDropdown
                title={localStorage.getItem('city') ? localStorage.getItem('city') : 'Pune'}
                id="choose-city-dropdown"
                onSelect={(selectedKey) => {
                 if (selectedKey) {
                    fetchMoviesByCity(selectedKey);
                 }
                }}>
                {Array.isArray(data?.cities) && data.cities.map(city => (
                 <NavDropdown.Item key={city.name} eventKey={city.name}>{city.name}</NavDropdown.Item>
                ))}
              </NavDropdown>
            )}
            {isMoviePage && (
              <span>{localStorage.getItem('city') || 'Pune'}</span>
            )}
          </Nav>
          
          <Link to="/prof" className="btn" style={{marginLeft:"10px", size:"5" }}>
            <FaUserCircle size={35}/>
          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
 );
}

export default Header;
