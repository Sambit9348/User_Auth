import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../App.css';
import { Link } from 'react-router-dom';
import video from '../../LoginAssets/video.mp4';
import logo from '../../LoginAssets/logo.png';
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";
import { MdMarkEmailRead } from "react-icons/md";

const Login = () => {
  // State variables to store input values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Login Response:", data); // Debugging

      if (data.success) {
        toast.success('Login Successfully');
      } else {
        toast.error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error('Login failed');
    }
  };

  return (
    <div className='loginPage flex'>
      <ToastContainer />
      <div className='container flex'>
        {/* Left Section - Video and Promotional Text */}
        <div className="videoDiv">
            <video src={video} autoPlay muted loop></video>
            <div className="textDiv">
                <h2 className='title'>Create And Sell Extraordinary Products</h2>
                <p>Adopt the peace of nature!</p>
            </div>
            <div className="footerDiv flex">
                <span className='text'>Don't have an account?</span>
                <Link to={'/register'}>
                    <button className='btn'>Sign Up</button>
                </Link>
            </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="formDiv flex">
            <div className="headerDiv">
                <img src={logo} alt="Logo" />
                <h3>Welcome Back!</h3>
            </div>
            <form onSubmit={handleLogin} className='form grid'>
            <span className='showMessage'>Login Status will go here</span>
                {/* Email Input */}
                <div className="inputDiv">
                    <label htmlFor="email">Email</label>
                    <div className="input flex">
                        <MdMarkEmailRead className='icon' />
                        <input 
                          type="email" 
                          id='email' 
                          placeholder='Enter Email' 
                          required 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                {/* Password Input */}
                <div className="inputDiv">
                    <label htmlFor="password">Password</label>
                    <div className="input flex">
                        <BsFillShieldLockFill className='icon' />
                        <input 
                          type="password" 
                          id='password' 
                          placeholder='Enter Password' 
                          required 
                          value={password} 
                          onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                {/* Submit Button */}
                <button type='submit' className='btn flex'>
                    <span>Login</span>
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

export default Login;
