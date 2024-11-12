import React, { createContext, useState, useEffect } from 'react';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from the database
  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:5000/tasks', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }

      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error.message);
    }
  };

  const refreshTask = () => {
    fetchTasks();
  };

  const updateTaskStatus = async (taskId, status) => {
    try {
      const response = await fetch(`http://localhost:5000/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status })
      });

      if (!response.ok) {
        throw new Error('Failed to update task status');
      }

      await response.json();
      refreshTask(); // Refresh tasks after updating status
    } catch (error) {
      console.error('Error updating task status:', error.message);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:5000/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      await response.json();
      refreshTask(); // Refresh tasks after deleting
    } catch (error) {
      console.error('Error deleting task:', error.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, updateTaskStatus, deleteTask, refreshTask }}>
      {children}
    </TaskContext.Provider>
  );
};
