import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Form from './components/Form';
import Table from './components/Table';
import axios from 'axios';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000); // Hide success message after 3 seconds
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Router>
      <div>
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/" style={{ marginRight: '10px' }}>Form</Link>
          <Link to="/table">Table</Link>
        </nav>

        {successMessage && <div className="success-message">{successMessage}</div>}

        <Routes>
          <Route path="/" element={<Form refreshData={fetchUsers} handleSuccess={handleSuccess} />} />
          <Route path="/table" element={<Table users={users} refreshData={fetchUsers} handleSuccess={handleSuccess} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
