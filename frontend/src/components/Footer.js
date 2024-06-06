import React from "react";
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"></link>

function Footer() {
  return (
    <>
     
     <footer className="text-center bg-body-tertiary" style={{backgroundColor: "white", bottom: 0, width: '100%' }}>
     
    
    <div className="text-center p-3" style={{backgroundColor:"#51555e", color: "#d9d8d1"}}>
    <p>Copyright 2024 <a href="https://parkar.digital/">Parkar Digital</a> All Rights Reserved</p>
    <p>The content and images used on this site are copyright protected and copyrights vests with the respective owners. </p>
    </div>
    
    </footer>
    </>
  );
}

export default Footer;