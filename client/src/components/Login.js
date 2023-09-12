import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(""); 
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    axios.post( `${process.env.REACT_APP_BACKEND_URL}/login`,{ email, password })
      .then((response) => {
        if (response.data.role === 'admin') {
          localStorage.setItem('userId', response.data.id);
          localStorage.setItem('userName', response.data.name);
          navigate('/admin');
        } else if (response.data.role === 'user') {
          localStorage.setItem('userId', response.data.id);
          localStorage.setItem('userName', response.data.name);
          navigate('/user');
        } else {
          setLoginError('Invalid username or password');
        }
      })
      .catch((error) => {
        console.log(error);
        setLoginError('Invalid username or password');
        setEmail('');
        setPassword('');
      });
  };
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h2>Login</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="loginUsername" className="form-label">Username:</label>
                  <input
                    type="text"
                    className="form-control"
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="loginPassword" className="form-label">Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
                {loginError && <p style={{color:'red', marginTop:'25px'}}>{loginError}</p>}
              </form>
            </div>
            <div className="card-footer text-center">
              <p>
                Don't have an account? <a href="/signup">Register</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
