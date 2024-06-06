import React, { useState, useEffect, useCallback } from "react";
import { useModal } from "./ModalContext";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { useParams } from "react-router-dom";

const DateComp = ({ fetchData }) => {
 const [startDate, setStartDate] = useState(new Date());

 useEffect(() => {
    fetchData(startDate);
 }, [startDate, fetchData]);

 const handleDateChange = (date) => {
    if (date) {
      setStartDate(date);
    } else {
      console.error('Date is null');
    }
 };

 return (
    <DatePicker
      selected={startDate}
      onChange={handleDateChange}
      placeholderText="Select Date Here"
      minDate={new Date()}
    />
 );
};

export default function Theater() {
 const [data, setData] = useState([]);
 const { handleOpen } = useModal();
 const [error, setError] = useState(null);
 const { id } = useParams();

 const fetchData = useCallback((date) => {
    const city = localStorage.getItem('city');
    const token = localStorage.getItem("token");
    axios.get(`http://localhost:8000/showbydate/${id}`, {
       params: {
         city: city,
         date: date ? date.toISOString().split('T')[0] : null 
       },
       headers: {
         "Content-Type": "application/json",
         Authorization: `Token ${token}`,
       },
    })
    .then((response) => {
       setData(response.data.data);
    })
    .catch(error => {
       setError(error);
       console.error('Error fetching data:', error);
    });
 }, [id]);

 useEffect(() => {
    fetchData(new Date());
 }, [fetchData]);

 return (
  <>
    <div className="theat" style={{backgroundColor:'aliceblue', minHeight:'80vh'}}><br />
    <span style={{marginLeft:"40px"}}>
      <DateComp fetchData={fetchData} />
    </span>
      <div className="container text-center">
        <div className="row" style={{ backgroundColor: "white", maxWidth: "100%", height:"auto", borderRadius:"10px", marginBottom:"30px",marginTop:"10px", paddingTop:"20px", boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 4px 10px 0 rgba(0, 0, 0, 0.1)' }}>
          {error && <div className="error">{error}</div>}
          { (data?.length ?? 0) === 0 ? (    <div className="noshows" style={{marginBottom:'15px', fontSize:'20px'}}>No shows available</div>) : (
            data.map((theater, showIndex) => (
              <div key={`${theater.theater.name}-${showIndex}`}>
               <div className="col">
                  <h4>{theater.theater.name}</h4>
                  <p>{theater.theater.loc}, {theater.theater.state}</p>
               </div>
               <div className="time-button row">
                  {theater.show_times.map((time, timeIndex) => (
                    <div className="col">
                      <button style={{width: '150px', height: '55px', marginBottom:"40px"}} key={`${theater.theater.name}-${time.id}`} type="button" className="btn btn-outline-success btn-sm" onClick={() => handleOpen(time.id) } >{time.time} <br/>Rs.{time.price} {time.screen}</button>
                      <br/>
                    </div>
                  ))}
                  <hr></hr>
               </div>
              </div>
            ))
          )}
        </div>
      </div><br/>
    </div>
  </>
);

}
