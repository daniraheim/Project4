import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login () {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });
  
function handleLoginChange (e) {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    // navigate('/questions');
  
    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loginData.username, password: loginData.password })
      });
  
      const data = await response.json();
  
      if (data.success) {
        alert('Login successful!');
        navigate('/questions');
        setShowPopup(false);
        setErrorMessage('');
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      
      setErrorMessage('Something went wrong. Try again.');
    }
  };

return (
   <div className="text-center mb 4">
    <button type="button" className="btn btn-secondary" onClick={() => setShowPopup(true)}>Please Sign In</button>
    {showPopup && (
      <div className="overlay">
        <div className="popup">
          <h3>Login</h3>
          <form onSubmit={handleLoginSubmit}>
          <div>
          <label className="form-label">Username</label>
          <input
            type="text"
            name="username"
            className="form-control"
            placeholder="Username"
            value={loginData.username}
            onChange={handleLoginChange}
            required
          />
          </div>
          <div>
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
             value={loginData.password}
            onChange={handleLoginChange}
            required
          />
          </div>
            {errorMessage && <p style= {{ color: 'red' }}> {errorMessage}</p>}
            <div>
            <button className="btn btn-success" type="submit" >Submit</button>
            </div>
            <div>
            <button type="button" className="close btn btn-warning" onClick={() => setShowPopup(false)}>Close</button>
            </div>
            </form>
          </div>
        </div>
     )}
     </div>
   )  
};
 
export default Login;
