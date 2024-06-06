import { useState, useEffect } from 'react';
 
const useAuth = () => {

const [isAuthenticated, setIsAuthenticated] = useState(false);

const [loading, setLoading] = useState(true); 
 
useEffect(() => {

    

    setTimeout(() => {

      const token = localStorage.getItem('token');

      setIsAuthenticated(!!token);

      setLoading(false); // Set loading to false after the check

    }, 100); //  delay

}, []);
 
return { isAuthenticated, loading };

};
 
export default useAuth;
