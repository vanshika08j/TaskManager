import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [task, settask] = useState("");
  const [tasklist, settasklist] = useState([]);

  const addTask = () => {
    if (task.trim() === '') return;
    const newtask = {
      text: task,
      isDone: false,
      isEditing: false
    };
    settasklist([...tasklist, newtask]);
    settask("");
  };

  const deleteTask = (i) => {
    settasklist(tasklist.filter((_, idx) => idx !== i));
  };

  const startEditing = (i) => {
    const updatedTasks = tasklist.map((task, idx) =>
      idx === i ? { ...task, isEditing: true } : task
    );
    settasklist(updatedTasks);
  };

  const toggleTask = (i) => {
    const updatedTasks = tasklist.map((task, idx) =>
      idx === i ? { ...task, isDone: !task.isDone } : task
    );
    settasklist(updatedTasks);
  };

  const updateTaskText = (i, newText) => {
    const updatedTasks = tasklist.map((task, idx) =>
      idx === i ? { ...task, text: newText } : task
    );
    settasklist(updatedTasks);
  };

  const saveEdit = (i) => {
    const updatedTasks = tasklist.map((task, idx) =>
      idx === i ? { ...task, isEditing: false } : task
    );
    settasklist(updatedTasks);
  };

  return (
    <div className="container">
      <h1 className="title">🌈 Tasks for the Day 🌟</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter a new task..."
          value={task}
          onChange={(e) => settask(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul className="task-list">
        {tasklist.map((task, index) => (
          <li key={index} className={`task ${task.isDone ? 'done' : ''}`}>
            <span onClick={() => toggleTask(index)} className="task-text">
              {task.isDone ? '✔️' : '⬜'} {task.text}
            </span>

            {task.isEditing ? (
              <>
                <input
                  type="text"
                  value={task.text}
                  onChange={(e) => updateTaskText(index, e.target.value)}
                  className="edit-input"
                />
                <button onClick={() => saveEdit(index)}>Save</button>
              </>
            ) : (
              <>
                <button onClick={() => startEditing(index)}>Edit</button>
                <button onClick={() => deleteTask(index)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
