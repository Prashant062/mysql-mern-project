import React, { useState } from 'react';
import axios from 'axios';
import Modal from './Modal';
import SuccessModal from './SuccessModal';

const Table = ({ users, refreshData }) => {
  const [deletingId, setDeletingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://backend-of-mysql-project.onrender.com/api/users/${id}`);
      setShowSuccessModal(true);
      refreshData();
      setTimeout(() => setShowSuccessModal(false), 5000);
    } catch (error) {
      console.error(error);
      alert('Error deleting user');
    }
  };

  const handleDeleteClick = (id) => {
    setDeletingId(id);
    setShowModal(true); // Show modal on delete click
  };

  const handleDeleteConfirm = () => {
    handleDelete(deletingId);
    setShowModal(false); // Close modal after delete
  };

  const handleDeleteCancel = () => {
    setShowModal(false); // Close modal without deleting
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>SR No.</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>City</th>
            <th>Gender</th>
            <th>Registration Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr><td colSpan="8">No users found</td></tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.mobile}</td>
                <td>{user.email}</td>
                <td>{user.city}</td>
                <td>{user.gender}</td>
                <td>{user.registration_date}</td>
                <td>
                  <button className="delete" onClick={() => handleDeleteClick(user.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {showModal && (
        <Modal 
          message="Are you sure you want to delete this user?" 
          onConfirm={handleDeleteConfirm} 
          onCancel={handleDeleteCancel} 
        />
      )}

      {showSuccessModal && (
        <SuccessModal message="User deleted successfully!" />
      )}
    </div>
  );
};

export default Table;
