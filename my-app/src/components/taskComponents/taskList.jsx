import React, { useContext } from 'react';
import { TaskContext } from '../../context/taskcontext';

const TasksList = () => {
  const { tasks, updateTaskStatus } = useContext(TaskContext);
  console.log('Tasks from context:', tasks);
  return (
    <div>
      <h1>Tasks</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.task_id}>
            {task.task_name} - {task.status}
            <button onClick={() => updateTaskStatus(task.task_id, 'completed')}>
              Complete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksList;
