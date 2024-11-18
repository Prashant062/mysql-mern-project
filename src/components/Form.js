import React, { useState } from 'react';
import axios from 'axios';
import Modal from './Modal';
import SuccessModal from './SuccessModal';

const Form = ({ refreshData }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    city: '',
    gender: '',
    registration_date: '',
  });

  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState('');
  
  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];

  const handleSubmit = async () => {
    try {
      await axios.post(`https://backend-of-mysql-project.onrender.com/api/users`, formData);
      setShowSuccessModal(true); // Show success modal
      refreshData();
      setTimeout(() => setShowSuccessModal(false), 5000); // Hide after 5 seconds
    } catch (error) {
      setError('Error adding user');
      console.error(error);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleModalConfirm = () => {
    handleSubmit();
    setShowModal(false); 
  };

  const handleModalCancel = () => {
    setShowModal(false); 
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="mobile" placeholder="Mobile" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <select name="city" onChange={handleChange} required>
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
        <select name="gender" onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input name="registration_date" type="date" onChange={handleChange} required />
        <button type="submit">Submit</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>

      {showModal && (
        <Modal 
          message="Are you sure you want to submit the form?" 
          onConfirm={handleModalConfirm} 
          onCancel={handleModalCancel} 
        />
      )}

      {showSuccessModal && (
        <SuccessModal message="User added successfully!" />
      )}
    </div>
  );
};

export default Form;
