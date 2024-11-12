import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [menus, setMenus] = useState([]);
  const [tasks, setTasks] = useState([]);

  const fetchMenusWithDetails = async () => {
    try {
      const response = await fetch('http://localhost:5000/getMenusWithDetails', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch menus');
      }

      const data = await response.json();
      setMenus(data);
    } catch (error) {
      console.error('Error fetching menus:', error.message);
    }
  };

  useEffect(() => {
    fetchMenusWithDetails();
  }, []);

  const refreshMenus = () => {
    fetchMenusWithDetails();
  };

  const addTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const updateTaskStatus = (taskId, status) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status } : task
      )
    );
  };

  return (
    <AppContext.Provider value={{ menus, refreshMenus, tasks, addTask, updateTaskStatus }}>
      {children}
    </AppContext.Provider>
  );
};

