import React, { useState, useContext } from 'react';
import { AppContext } from '../context/appcontext';

const DeleteMenu = () => {
  const { refreshMenus } = useContext(AppContext);
  const [menuId, setMenuId] = useState('');

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/menus/${menuId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete menu');
      }

      refreshMenus(); // Refresh the menus after deletion
      setMenuId(''); // Clear the input field
    } catch (error) {
      console.error('Error deleting menu:', error.message);
    }
  };

  return (
    <div className='menu-form'>
      <h2>Delete Menu</h2>
      <input
        type="text"
        placeholder="Enter Menu ID"
        value={menuId}
        onChange={(e) => setMenuId(e.target.value)}
      />
      <button onClick={handleDelete}>Delete Menu</button>
    </div>
  );
};

export default DeleteMenu;
