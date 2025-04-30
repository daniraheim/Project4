import React, { useState } from 'react';

function Login () {
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });
 
const [loading, setLoading] = useState(false);
  
function handleLoginChange (e) {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    console.log('Submitting login form...')
  
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loginData.username, password: loginData.password })
      });

      console.log('Response', response);
  
      const data = await response.json();
      
      console.log('Data received', data)
  
      if (response.ok) {
        alert('Login successful!');
        setShowPopup(false);
        setErrorMessage('');
        setLoginData({ username: '', password: '' }); 

      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('Something went wrong. Try again.');
    }finally {
      setLoading(false); 
  };

return (
   <div>
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
            {errorMessage && <p style= {{ color: 'red' }} aria-live="assertive"> {errorMessage}</p>}
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
}
export default Login;
