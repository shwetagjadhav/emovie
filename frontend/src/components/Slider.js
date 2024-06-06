import React from "react";

function slider() {
    return(
    <>
        <div id="carouselExampleRide" className="carousel slide" data-bs-ride="true" style={{overflowX: 'hidden' }}>
  <div className="carousel-inner" style={{ borderRadius: '10px', overflowX: 'hidden' }}>
    <div className="carousel-item active">
      <img src="https://imgtr.ee/images/2024/02/28/7192fac0893511984d87178b5c9c5c17.png" className="d-block w-100" alt="first_img"/>
      
    </div>
    <div className="carousel-item">
      <img src="https://assets-in.bmscdn.com/promotions/cms/creatives/1706382336630_web.jpg" className="d-block w-100" alt="second_img"/>
    </div>
    <div className="carousel-item">
      <img src="https://imgtr.ee/images/2024/02/28/0d59ec462a31286ddeab80e35d761de0.jpeg" className="d-block w-100" alt="third_img"/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
</>
    );
}

export default slider;