import React from "react";
import './Popular.css';
import Card from 'react-bootstrap/Card';

export default function Popular() {
  return (
    <>
    <section className="categories" >
		<div className="title-text">
			<h2>Explore Some Events</h2>
      <div className="row row-cols-lg-3 row-cols-md-2 row-cols-1 g-4" style={{marginLeft:'10px'}}>

      <Card.Img
  style={{ objectFit: 'contain',borderRadius: '15px 50px ', height: '15rem', width: '15rem'}}
  src="https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:l-text,ie-MzArIEV2ZW50cw%3D%3D,co-FFFFFF,ff-Roboto,fs-64,lx-48,ly-320,tg-b,pa-8_0_0_0,l-end:w-300/music-shows-collection-202211140440.png"/>
    

      <Card.Img
  style={{ objectFit: 'contain',borderRadius: '15px 50px ', height: '15rem', width: '15rem' }}
  src="https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:l-text,ie-MTUrIEV2ZW50cw%3D%3D,co-FFFFFF,ff-Roboto,fs-64,lx-48,ly-320,tg-b,pa-8_0_0_0,l-end:w-300/adventure-fun-collection-202211140440.png"/>
    

    <Card.Img
  style={{ objectFit: 'contain',borderRadius: '15px 50px ', height: '15rem', width: '15rem' }}
  src="https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:l-text,ie-NyBFdmVudHM%3D,co-FFFFFF,ff-Roboto,fs-64,lx-48,ly-320,tg-b,pa-8_0_0_0,l-end:w-300/arts-crafts-collection-202211140440.png"/>
    

    
    <Card.Img
  style={{ objectFit: 'contain',borderRadius: '15px 50px ', height: '15rem', width: '15rem' }}
  src="https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:l-text,ie-NzArIEV2ZW50cw%3D%3D,co-FFFFFF,ff-Roboto,fs-64,lx-48,ly-320,tg-b,pa-8_0_0_0,l-end:w-300/comedy-shows-collection-202211140440.png"/>
  
    
    <Card.Img
  style={{ objectFit: 'contain', borderRadius: '15px 50px ', height: '15rem', width: '15rem' }}
  src="https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:l-text,ie-MzArIEV2ZW50cw%3D%3D,co-FFFFFF,ff-Roboto,fs-64,lx-48,ly-320,tg-b,pa-8_0_0_0,l-end:w-300/workshop-and-more-web-collection-202211140440.png"
/>
    </div>
      

		
    </div>
    <br/>
	</section>
  
    </>
  );
}