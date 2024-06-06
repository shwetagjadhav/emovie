import "./Prof.css";
import { useNavigate } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import React, { useState, useEffect} from "react";
import logo from '../Assets/Nlogoz.jpg'; 


function Prof() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const userInfo = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      setUser(parsedUserData);
      
    }
  }, []);


  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const token = localStorage.getItem("token");
        
        const url = `http://localhost:8000/userdata?userId=${userInfo.id}`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          
          setUser(data.user);
          const reservation_data = data.reservations.map((res) => ({
            show: res.show,
            rescode: res.rescode,
            
          }));
          
          // console.log("reservation_data:",reservation_data);
          setReservations(reservation_data);

        } 
      } catch (error) {
        console.error("Error:", error);
      }
    };
    if (userInfo) {
      fetchReservations();
    }
  }, []); 

 
    
  console.log(user);
      //const response = await fetch(`http://localhost:8000/bookmovie/${showId}`);


      const handleLogout = async () => {
        try {
          const token = localStorage.getItem("token");
          console.log("Token:", token);
      
          const response = await fetch("http://localhost:8000/logout/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
            credentials: "include", 
          });
      
          console.log("Response status:", response.status); 
          console.log("Response headers:", response.headers); 
      
          if (response.ok) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("city");
            alert("Log out successful");
            navigate("/login");
          } else {
           
            switch (response.status) {
              case  401:
                alert("Unauthorized: Please log in again");
                break;
              case  500:
                alert("Server error: Please try again later");
                break;
              default:
                alert(`Failed to logout: ${response.statusText}`);
            }
            console.error("Failed to logout", response.status, response.statusText);
          }
        } catch (error) {
          console.error("Error logging out:", error);
        }
      };

  return (
    <>
    
      <nav className="navbar">
      <Navbar.Brand as={Link} to="/home">
       <img src={logo} alt="Blog Logo" style={{ width: '140px', height: '50px', marginLeft:"30px"}}/>
      </Navbar.Brand>
      
      <Link to="/login" className="btn btn-outline-dark" onClick={handleLogout} style={{marginRight:"15px"}}>Sign Out</Link>
      </nav>

      <div style={{ backgroundColor: "#e7e9eb" }}></div>
      <div className="container-lg">
        <div className="row">
          <h1 className="col-12">Account Details</h1>
          <br />
          <br />
          <br />
          <div className="col-12 col-xl-6 col-lg-6 mb-3">
          <label className="form-label">First Name</label>
             <input
                type="text"
                className="form-control" id='disabled-input'
                disabled
                defaultValue={userInfo ? userInfo.name : ""}
             />
            </div>
            <div className="col-12 col-xl-6 col-lg-6 mb-3">
             <label className="form-label">Phone Number</label>
             <input
                type="tel"
                className="form-control" id='disabled-input'
               disabled
                defaultValue={userInfo ? userInfo.phone : ""}
             />
</div>
<div className="col-12 col-xl-6 col-lg-6 mb-3">
 <label className="form-label">Email</label>
 <input
    type="email"
    className="form-control" id='disabled-input'
    disabled
    defaultValue={userInfo ? userInfo.email : ""}
 />
</div>
<div className="col-12 col-xl-6 col-lg-6 mb-3">
 <label className="form-label">Address</label>
 <input
    type="text"
    className="form-control" id='disabled-input'
    disabled
    defaultValue={userInfo ? userInfo.address : ""}
 />
</div>

        </div>
      </div>

      <div className="container-lg">
      <div className="row">
      <h1 className="col-12">Booked Tickets</h1><br/><br/><br/>

      {reservations.map((reservation, index) => (
        <div key={index} className="card" style={{marginBottom:"20px",marginLeft:"10px",paddingRight:"10px", width:"390px"}}>
          <div className="card-body">
            <h4 className="card-title">{reservation.show.movie_name}</h4>
            <p className="card-text">
              <strong>Show Time:</strong> {reservation.show.show_time}
            </p>
            <p className="card-text">
              <strong>Show date:</strong> {reservation.show.show_date}
            </p>
            <p className="card-text">
              <strong>Theater:</strong> {reservation.show.theater_name}
            </p>
            <p className="card-text">
              <strong>Screen :</strong> {reservation.show.screen_name}
            </p>
            
            <p className="card-text">
              <strong>City:</strong> {reservation.show.city}
            </p>
            <p className="card-text">
              <strong>Seat Number(s):</strong> {reservation.rescode}
            </p>
          </div>
        </div>
      ))}
      <br/>
      </div>
    </div>

    </>
  );
}

export default Prof;
