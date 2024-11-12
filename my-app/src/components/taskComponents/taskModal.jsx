import React, { useState, useContext } from 'react';
import Modal from 'react-modal';
import { AppContext } from '../../context/appcontext';
import { TaskContext } from '../../context/taskcontext';


const CreateTaskModal = ({ isOpen, onRequestClose }) => {
  const { menus,  } = useContext(AppContext);
  const { refreshTask } = useContext(TaskContext); 
  const [taskName, setTaskName] = useState('mesa:');
  const [taskDescription, setTaskDescription] = useState('platos, bebidas, cantidades, detalles');

  

  const handleCreateTask = async () => {
    const newTask = {
      name: taskName,
      description: taskDescription,
    };

    try {
      const response = await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error('Failed to create task');
      }

      const result = await response.json();
      console.log('Task created:', result);

      setTaskName('mesa:');
      setTaskDescription('platos, bebidas, cantidades, detalles');
      refreshTask()
      onRequestClose(); // Close the modal after creating the task
    } catch (error) {
      console.error('Error creating task:', error.message);
    }
  };

  const handleCancel = () => {
    setTaskName('mesa:');
    setTaskDescription('platos, bebidas, cantidades, detalles');
    onRequestClose(); // Close the modal without creating the task
  };

  const addItemToTaskDescription = (itemName) => {
    setTaskDescription((prevDescription) => `${prevDescription}, ${itemName}`);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>Create Task</h2>
      <form>
        <div>
          <label>Task Name:</label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
        </div>
        <div>
          <label>Task Description:</label>
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          ></textarea>
        </div>
        <button type="button" onClick={handleCreateTask}>
          Create Task
        </button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
      <h3>Menus and Categories</h3>
      {menus.length === 0 ? (
        <p>No menus available.</p>
      ) : (
        menus.map((menu) => (
          <div key={menu.menu_id} className="menu-item">
            <h3>{menu.name}</h3>
            <p><strong>ID:</strong> {menu.menu_id}</p>
            <p>{menu.description}</p>
            {menu.categories.length === 0 ? (
              <p>No categories available.</p>
            ) : (
              menu.categories.map((category) => (
                <div key={category.category_id} className="category-item">
                  <h4>Category: {category.name}</h4>
                  {category.items.length === 0 ? (
                    <p>No items available.</p>
                  ) : (
                    category.items.map((item) => (
                      <div key={item.item_id} className="item">
                        <p><strong>ID:</strong> {item.item_id}</p>
                        <p><strong>Item:</strong> {item.name}</p>
                        <p>{item.description}</p>
                        <button
                          type="button"
                          onClick={() => addItemToTaskDescription(item.name)}
                        >
                          Add to Task
                        </button>
                      </div>
                    ))
                  )}
                </div>
              ))
            )}
          </div>
        ))
      )}
    </Modal>
  );
};

export default CreateTaskModal;
