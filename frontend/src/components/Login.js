import React, { useState,} from 'react';
import { useNavigate } from "react-router-dom";
import './login.css';
import email_icon from '../img/email_icon.png'
import eye_hidden_icon from '../img/eye_hidden_icon1.png'
import eye_view_icon from '../img/eye_view_icon1.png'
import password_icon from '../img/password_icon.png'
 
 
 
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
 
 
  const validateEmail = () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
   
    if (!email.match(emailPattern)) {
       setEmailError('Invalid email address');
    } else {
       const domainPattern = /@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
       const domain = email.match(domainPattern)[0];
       if (domain.split('@')[1].split('.').length - 1 > 1) {
         setEmailError('Invalid email address');
       } else {
         setEmailError('');
       }
    }
   };
 
  const validatePassword = () => {
    if (password.length < 8 || password.length > 20) {
        setPasswordError('Password length must be between 8 and 20 characters');
        return;
    }
 
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,20}$/;
    if (!password.match(passwordPattern)) {
        setPasswordError('Password not in Standard format');
    } else {
        setPasswordError('');
    }
};
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    validateEmail();
    validatePassword();
    if (emailError || passwordError) {
        return;
    }
    try {
const response = await fetch('http://localhost:8000/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            alert("Log in succesfull")
            navigate('/home');
            window.location.reload();
           
 
        } else {
            const data = await response.json();
            alert("Invalid email or password, login failed");
            console.error('Login failed:', data);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};
 
 
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
 
  return (
    <div className='backg'><br></br><br></br><br></br>
    <div className="main-container">
      <form className="form" autoComplete="off" onSubmit={handleSubmit}>
      <div className="form-background">
        
          <div className="text">Login</div>
          
        <div className="inputs">
          <div className="input">
            <img src={email_icon} alt="" />
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={validateEmail}
              required
            />
            <div className="error">{emailError}</div>
          </div>
          <div className="input">
            <img src={password_icon} alt="" />
            <input
              type={passwordVisible ? 'text' : 'password'}
              id="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={validatePassword}
              required
            />
            <img src={passwordVisible ? eye_hidden_icon : eye_view_icon}
            className="inputEyeIcon" onClick={togglePasswordVisibility}
            alt="Toggle Password Visibility" />
            <div className="error">{passwordError}</div>
          </div>
        </div>
        <div className="create-forgot">
          <div className="forgot-password">
          <a href="forgotpassword">Forgot Password?</a>
          </div>
        </div>
        <center><br/>
        <div className="submit-container">
          <button type="submit"  className="btn btn-dark">Login</button>
         
 
      <p className="signup-link" >
        No account?
        <a href="/signup">Sign up</a>
      </p>
        </div>
        </center>
        </div>
      </form>
    </div>
    </div>
  );
};
 
export default Login;