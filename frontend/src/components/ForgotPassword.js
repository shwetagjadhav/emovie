
import React, { useState } from 'react';
import './login.css';
import email_icon from '../img/email_icon.png';
import password_icon from '../img/password_icon.png';
import eye_view_icon from '../img/eye_view_icon.png';
import eye_hide_icon from '../img/eye_hidden_icon.png';
import { useNavigate } from "react-router-dom";
 
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [new_password, setNewPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
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
    if (new_password.length < 8 || new_password.length > 20) {
      setPasswordError('Password length must be between 8 and 20 characters');
    } else {
      setPasswordError('');
    }
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,20}$/;
    if (!new_password.match(passwordPattern)) {
        setPasswordError('Password not in Standard format');
    } else {
        setPasswordError('');
    }
  };
 
  const validateConfirmPassword = () => {
    if (confirm_password !== new_password) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    validateEmail();
    validatePassword();
    validateConfirmPassword();
 
    // Check if there are any validation errors
    if (!emailError && !passwordError && !confirmPasswordError) {
      try {
        const response = await fetch('http://localhost:8000/updatepass/', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, new_password, confirm_password }),
        });
 
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          alert("Password reset successful. You can login with the new password.");
          navigate('/login');
        } else {
          const errorData = await response.json();
          alert("Error resetting password. Please try again.");
          console.error('Password reset failed:', errorData);
          if (errorData.email) {
            setEmailError(errorData.email[0]); 
          }
          if (errorData.new_password) {
            setPasswordError(errorData.new_password[0]); 
          }
         
        }
      } catch (error) {
        console.error('Error:', error);
        alert("An error occurred. Please try again.");
      }
    } else {
      alert("Please correct the errors in the form before submitting.");
    }
  };
 
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
 
  return (
    <div className='backg'>
    <div className="main-container">
      <form className="form" autoComplete="off" onSubmit={handleSubmit}>
       
          <div className="text">Reset Password</div>
         
        <div className="inputs">
          <div className="input">
            <img src={email_icon} alt="" />
            <input
              type="email"
              id="email"
              placeholder="Enter Registered Email"
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
              id="newpassword"
              placeholder="Enter New Password"
              value={new_password}
              onChange={(e) => setNewPassword(e.target.value)}
              onBlur={validatePassword}
              required
            />
            <img
              src={passwordVisible ? eye_hide_icon : eye_view_icon}
              className="inputEyeIcon"
              alt="Toggle Password Visibility"
              onClick={togglePasswordVisibility}
            />
            <div className="error">{passwordError}</div>
          </div>
          <div className="input">
            <img src={password_icon} alt="" />
            <input
              type={passwordVisible ? 'text' : 'password'}
              id="confirmpassword"
              placeholder="Confirm Password"
              value={confirm_password}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={validateConfirmPassword}
              required
            />
            <img
              src={passwordVisible ? eye_hide_icon : eye_view_icon}
              className="inputEyeIcon"
              alt="Toggle Password Visibility"
              onClick={togglePasswordVisibility}
            />
            <div className="error">{confirmPasswordError}</div>
          </div>
        </div><br/><br/>
        <center>
        <div className="submit-container" >
          <button type="submit" id="resetPasswordBtn" className='btn btn-dark'>
            Reset Password
          </button>
        </div>
        <div className="previous-page">
        Don't need to do this?<a href="Login" > <u>Login</u></a>
        </div>
        </center>
      </form>
    </div>
    </div>
  );
};
 
export default ForgotPassword;