import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);
  const [editingTaskText, setEditingTaskText] = useState('');

  // Add a new task
  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  // Delete a task
  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  // Edit a task
  const handleEditTask = (index) => {
    setEditingTaskIndex(index);
    setEditingTaskText(tasks[index]);
  };

  // Save the edited task
  const handleSaveTask = () => {
    const updatedTasks = tasks.map((task, index) =>
      index === editingTaskIndex ? editingTaskText : task
    );
    setTasks(updatedTasks);
    setEditingTaskIndex(null);
    setEditingTaskText('');
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <div className="todo-container">
        <div className="input-task">
          <input
            type="text"
            placeholder="Add a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button onClick={handleAddTask}>Add Task</button>
        </div>

        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              {editingTaskIndex === index ? (
                <>
                  <input
                    type="text"
                    value={editingTaskText}
                    onChange={(e) => setEditingTaskText(e.target.value)}
                  />
                  <button onClick={handleSaveTask}>Save</button>
                </>
              ) : (
                <>
                  {task}
                  <button onClick={() => handleEditTask(index)}>Edit</button>
                  <button onClick={() => handleDeleteTask(index)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
