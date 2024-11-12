import React, { useState, useContext } from 'react';
import { AppContext } from '../context/appcontext';

const DeleteCategory = () => {
  const { refreshMenus } = useContext(AppContext);
  const [categoryId, setCategoryId] = useState('');

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/categories/${categoryId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete category');
      }

      refreshMenus(); // Refresh the menus after deletion
      setCategoryId(''); // Clear the input field
    } catch (error) {
      console.error('Error deleting category:', error.message);
    }
  };

  return (
    <div>
      <h2>Delete Category</h2>
      <input
        type="text"
        placeholder="Enter Category ID"
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
      />
      <button onClick={handleDelete}>Delete Category</button>
    </div>
  );
};

export default DeleteCategory;
