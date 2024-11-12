import React, { useContext, useState, useEffect } from 'react';
import { TaskContext } from '../context/taskcontext';
import CreateTaskModal from '../components/taskComponents/taskModal';

const TasksPage = () => {
  const { tasks, updateTaskStatus, deleteTask } = useContext(TaskContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hiddenTasks, setHiddenTasks] = useState([]);

  useEffect(() => {
    console.log('Tasks from context:', tasks); // Debugging log
  }, [tasks]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateTask = (task) => {
    setIsModalOpen(false);
  };

  const handleHideTask = (taskId) => {
    setHiddenTasks((prevHiddenTasks) => [...prevHiddenTasks, taskId]);
  };

  const handleDeleteTask = (taskId) => {
    deleteTask(taskId);
  };

  return (
    <div>
      <h1>Tasks Page</h1>
      <button onClick={handleOpenModal}>Create Task</button>
      <CreateTaskModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        onCreate={handleCreateTask}
      />
      <h2>Tasks</h2>
      <ul>
        {tasks
          .filter((task) => !hiddenTasks.includes(task.task_id))
          .map((task) => (
            <li key={task.task_id}>
              {task.task_id} - {task.task_name} {task.task_description} - {task.status}
              <button onClick={() => updateTaskStatus(task.task_id, 'completed')}>Complete</button>
              <button onClick={() => updateTaskStatus(task.task_id, 'canceled')}>Cancel</button>
              {(task.status === 'completed' || task.status === 'canceled') && (
                <button onClick={() => handleHideTask(task.task_id)}>✖</button>
              )}
              <button onClick={() => handleDeleteTask(task.task_id)}>Delete</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TasksPage;
