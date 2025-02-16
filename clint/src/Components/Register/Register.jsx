import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../App.css';
import { Link } from 'react-router-dom';
import video from '../../LoginAssets/video.mp4';
import logo from '../../LoginAssets/logo.png';
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";
import { MdMarkEmailRead } from "react-icons/md";

const Register = () => {
  // State variables to store input values
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle form submission and send data to backend
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await response.json();
      console.log("Register Response:", data);

      if (data.success) {
        toast.success('Registered Successfully');
      } else {
        if (data.message === 'User already exists') {
          toast.error('User already exists');
        } else {
          toast.error(data.message || 'Registration failed');
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error('Registration failed');
    }
  };

  return (
    <div className='registerPage flex'>
      <ToastContainer />
      <div className='container flex'>
        {/* Left Section - Video and Text */}
        <div className="videoDiv">
          <video src={video} autoPlay muted loop></video>
          <div className="textDiv">
            <h2 className='title'>Create And Sell Extraordinary Products</h2>
            <p>Adopt the peace of nature!</p>
          </div>
          <div className="footerDiv flex">
            <span className='text'>Have an account?</span>
            <Link to={'/'}>
              <button className='btn'>Login</button>
            </Link>
          </div>
        </div>

        {/* Right Section - Registration Form */}
        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={logo} alt="Logo" />
            <h3>Let Us Know You!</h3>
          </div>
          <form onSubmit={handleRegister} className='form grid'>
            {/* Username Input */}
            <div className="inputDiv">
              <label htmlFor="username">Username</label>
              <div className="input flex">
                <FaUserShield className='icon' />
                <input type="text" id='username' placeholder='Enter Username' required value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
            </div>

            {/* Email Input */}
            <div className="inputDiv">
              <label htmlFor="email">Email</label>
              <div className="input flex">
                <MdMarkEmailRead className='icon' />
                <input type="email" id='email' placeholder='Enter Email' required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>

            {/* Password Input */}
            <div className="inputDiv">
              <label htmlFor="password">Password</label>
              <div className="input flex">
                <BsFillShieldLockFill className='icon' />
                <input type="password" id='password' placeholder='Enter Password' required value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>

            {/* Submit Button */}
            <button type='submit' className='btn flex'>
              <span>Register</span>
              <AiOutlineSwapRight className='icon' />
            </button>
            
            {/* Forgot Password Link */}
            <span className='forgotPassword'>
              Forgot your password? <a href="">Click Here</a>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;