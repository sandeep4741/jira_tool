import React, { useState } from 'react';
import axios from 'axios';


function TaskForm({ onCreateTask }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      const newTask = { title, description };
      try {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/addTasks`, newTask);
        onCreateTask(newTask); // Notify parent component about the new task
        setTitle('');
        setDescription('');
      } catch (error) {
        console.error(error);
        // Handle error
      }
    };
  
    return (
      <form onSubmit={handleSubmit} style={{margin:'25px'}}>
        <div className="mb-3">
          <label htmlFor="taskTitle" className="form-label">Title:</label>
          <input
            type="text"
            className="form-control"
            id="taskTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="taskDescription" className="form-label">Description:</label>
          <textarea
            className="form-control"
            id="taskDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Create Task</button>
      </form>
    );
  }
  


export default TaskForm;
