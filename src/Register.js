import React, { useState } from 'react';

function Register ({onAdd}) {
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    password1: '',
    agree: false
  });

function handleChange (e) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

function handleSubmit (e) {
    e.preventDefault();
    
    const { username, password, password1 } = formData;
    const passwordRegex = /\d/; 

    if (!username || !password || !password1) {
        setErrorMessage('Please fill in all fields.');
        return;
        }
    if (password !== password1) {
        setErrorMessage('Passwords do not match.');
        return;
        }
    if (formData.password.length < 8 || !passwordRegex.test(formData.password)){
        setErrorMessage('Password must be at least 8 characters long and contain at least one number');
        return;
    }    
    if (!formData.agree) {
       setErrorMessage('You must agree to the terms and conditions');
       return;
    }    
    setFormData ({ username: '', password: '', password1: '', agree: ''});
    setErrorMessage('');
    setShowPopup(false);
    onAdd(formData)
    }

  return (
    <div>
      <h3>Welcome to Our Site</h3>
      <form>
      <button className="btn btn-secondary" onClick={() => setShowPopup(true)}>Create a Login</button>
      {showPopup && (
        <div className="overlay">
          <div className="popup">
            <h3>Register</h3>
            <div>
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
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
            value={formData.password}
            onChange={handleChange}
            required
            />
            </div>
            <div>
             <label className="form-label">Confirm Password</label>
            <input
              type="password"
              name="password1"
              className="form-control"
              placeholder="Password"
              value={formData.password1}
              onChange={handleChange}
              required
            />
            </div>
            <div className="mb-3 form-check">
            <label className="form-check-label">
              <input        
              type="checkbox"
              name="agree"
              className="form-check-input"
              checked={formData.agree}
              onChange={handleChange}
              />
              I agree to the Terms and Conditions and Privacy Policy</label>
          </div>
            <div>
            {errorMessage && <p style= {{ color: 'red' }}> {errorMessage}</p>}
            <button className="btn btn-success" type="submit" onClick={handleSubmit}>Sign Up</button>
            </div>
            <div>
            <button className="close btn btn-warning" onClick={() => setShowPopup(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
       </form>
    </div>
  )
};

export default Register;