import './App.css';
import { useEffect, useState } from 'react';
import Layout from './Layout';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './Register';
import Login from './Login';
import Questions from './Questions';
import axios from 'axios';


function App() {

  const [users, setUsers] = useState([])



  function addUser(user) {
    console.log(user)
    axios.post('http://localhost:3000/api/users/register', user).then(response => {
      alert(response.data.message);
    })
    const newUser = { ...user, id: Date.now()};
    setUsers([...users, newUser]);
  }

  return (
    <Router>
        <Layout>
            <Routes>
               <Route path="/" element={ <Register onAdd={addUser} /> }   />

               <Route path="/login" element={ <Login  /> }   />

               <Route path="/questions" element={ <Questions  /> }  />

            </Routes>
        </Layout>
    </Router>

  );
}

export default App;
