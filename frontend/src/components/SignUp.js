
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './login.css';
import email_icon from '../img/email_icon.png';
import eye_hidden_icon from '../img/eye_hidden_icon1.png';
import eye_view_icon from '../img/eye_view_icon1.png';
import password_icon from '../img/password_icon.png';
import phone_icon from '../img/phone_icon.png';
import user_icon from '../img/user_icon.png';
import home_address from '../img/home-address.png'
 
 
const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
 
  const validateName = () => {
    
    const namePattern = /^[A-Za-z]+(?: [A-Za-z]+)?$/;
    const namePattern1 = /^\d+$/;

    if (!name.match(namePattern) || name.match(namePattern1)) {
        setNameError('Invalid name');
    } else if (name.length > 50) {
        setNameError('Name length must be 50 characters or less');
    } else {
        setNameError('');
    }
};

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
 
  const validateConfirmPassword = () => {
    if (confirm_password !== password) {
      setConfirmPasswordError('Passwords do not match');
    }
    else {
      setConfirmPasswordError('');
    }
    if (password !== confirm_password) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
   
  };
 
  const validatePhone = () => {
    const phonePattern = /^[6-9]\d{9}$/;
    if (!phone.match(phonePattern)) {
      setPhoneError('Invalid phone number');
    } else {
      setPhoneError('');
    }
  };
 
  const validateAddress = () => {
    if (address.trim() === '') {
       setAddressError('Address cannot be empty');
    } else {
       setAddressError('');
    }
   };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    validateName();
    validateEmail();
    validatePassword();
    validateConfirmPassword();
    validatePhone();
    validateAddress();
    if (!nameError && !emailError && !passwordError && !confirmPasswordError && !phoneError && !addressError) {
      console.log('User created successfully');
               
        try {
const response = await fetch('http://localhost:8000/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password, confirm_password, phone, address }),
            });
            if (response.ok) {
              alert('User created successfully');
                console.log('User created successfully');
                navigate('/login');
            } else {
                const data = await response.json();
                console.error('Error:', data);
                if (data.name) {
                  setNameError(data.name[0]);
                }
                if (data.email) {
                  setEmailError(data.email[0]);
                }
               
                if (data.password) {
                  setPasswordError(data.password[0]);
                }
                if (data.confirm_password) {
                  setPasswordError(data.confirm_password[0]);
                }
                if (data.phone) {
                  setPhoneError(data.phone[0]);
                }
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle network error
        }
    }
  };
 
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
 
  return (
    <div className='backg'>
    <div className="main-container">
      <form className="form" autoComplete="off" onSubmit={handleSubmit}>
        <div className="text">
          Sign Up
        </div>
        <div className="inputs">
          <div className="input">
            <img src={user_icon} alt="" />
            <input type="text" id="name" placeholder="Enter Name"  value={name} onChange={(e) => setName(e.target.value)} onBlur={validateName} required />
            <div className="error">{nameError}</div>
          </div>
          <div className="input">
            <img src={email_icon} alt="" />
            <input type="email" id="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={validateEmail} required />
            <div className="error">{emailError}</div>
          </div>
          <div className="input">
            <img src={password_icon} alt="" />
            <input type={passwordVisible ? 'text' : 'password'} id="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} onBlur={validatePassword} required />
            <img src={passwordVisible ? eye_hidden_icon : eye_view_icon} className="inputEyeIcon" onClick={togglePasswordVisibility} alt="Toggle Password Visibility" />
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
              src={passwordVisible ? eye_hidden_icon : eye_view_icon}
              className="inputEyeIcon"
              alt="Toggle Password Visibility"
              onClick={togglePasswordVisibility}
            />
            <div className="error">{confirmPasswordError}</div>
          </div>
          <div className="input">
            <img src={phone_icon} alt="" />
            <input type="text" id="phone" placeholder="Enter Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} onBlur={validatePhone} required />
            <div className="error">{phoneError}</div>
          </div>
          <div className="input">
            <img src={home_address} alt="" />
            <input type="text" id="address"  placeholder="Enter Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
            <div className="error">{addressError}</div>
          </div>
        </div>
        <div className="login-account">Already have an account? <a href="Login">Login</a>
      </div>
      <center><br/>
        <div className="submit-container">
          <button type="submit" className="btn btn-dark">Sign Up</button>
        </div>
        </center>
      </form>
    </div>
   
    </div>
  );
};
 
export default SignUp;