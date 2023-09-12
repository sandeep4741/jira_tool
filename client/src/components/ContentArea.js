import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import axios from 'axios';

function ContentArea({ isCreateTaskOpen, userId, isAdmin, isUser, userName }) {
  const [tasks, setTasks] = useState([]);

  const userTasks1 = tasks.filter(task => task.user_id === userId && task.status == 'qc');
  const userTasks2 = tasks.filter(task => task.user_id === userId && task.status == 'completed');

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/getCreatedTasks`)
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  console.log(tasks);

  const handleReadyTask = (taskId, userId) => {
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/readyTask`, { taskId, userId })
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, status: 'ready' };
      }
      return task;
    });
    setTasks(updatedTasks)
  };

  const handleAcceptTask = (taskId, userId, userName) => {
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/acceptTask`, { taskId, userId, userName })
      .then(response => {
        const updatedTasks = tasks.map(task => {
          if (task.id === taskId) {
            return { ...task, status: 'tagged' };
          }
          return task;
        });
        setTasks(updatedTasks)
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleSendQc = (taskId) => {
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/sendqc`, { taskId })
      .then(response => {
        const updatedTasks = tasks.map(task => {
          if (task.id === taskId) {
            return { ...task, status: 'qc' };
          }
          return task;
        });
        setTasks(updatedTasks);
      })
      .catch(error => {
        console.error(error);
      });
  };


  const handleDone = (taskId) => {
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/done`, { taskId })
      .then(response => {
        const updatedTasks = tasks.map(task => {
          if (task.id === taskId) {
            return { ...task, status: 'completed' };
          }
          return task;
        });
        setTasks(updatedTasks);
      })
      .catch(error => {
        console.error(error);
      });
  };
  const CreatedTasks = tasks.filter(task => task.status === 'created');
  const ReadyTasks = tasks.filter(task => task.status === 'ready');
  const taggedTasks = tasks.filter(task => task.status === 'tagged');
  const userTasks = tasks.filter(task => task.user_id === userId && task.status == 'tagged');
  const qcTasks = tasks.filter(task => task.status === 'qc');
  const doneTasks = tasks.filter(task => task.status === 'completed');

  console.log(taggedTasks)

  const styles = {
    contentArea: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingLeft: '10px',
    },
    tasksColumn: {
      flex: '1',
      width: '202px',
      minHeight: '550px',
      margin: '5px',
      marginRight: '8px',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      backgroundColor: '#f0f0f0'
    },
    task: {
      marginBottom: '20px',
      padding: '10px',
      border: '1px solid #ccc',
      backgroundColor: 'white',
      position: 'relative', // Add this line
    },
    button: {
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      padding: '8px 15px',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '14px',
      marginTop: '5px',
    },
    avatar: {
      width: '25px',
      height: '25px',
      borderRadius: '50%',
      position: 'absolute',
      bottom: '0',
      right: '0',
      marginRight: '8px',
      marginBottom: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '15px',
      backgroundColor: '#007bff', // Set a contrasting color for the background
      color: '#fff', // Set the same color as the background for better visibility
    },
  };

  return (
    <div style={styles.contentArea}>
      <div style={styles.tasksColumn}>
        <h2>UploadTasks</h2>
        {CreatedTasks.map((task, index) => (
          <div key={index} className="task" style={styles.task}>
            <div>
              <strong>Title:</strong> {task.title}
            </div>
            {!isAdmin && <button style={styles.button} onClick={() => handleReadyTask(task.id, userId)}>Ready</button>}
          </div>
        ))}
      </div>
      <div style={styles.tasksColumn}>
        <h2>ReadyToTag</h2>
        {ReadyTasks.map((task, index) => (
          <div key={index} className="task" style={styles.task}>
            <div>
              <strong>Title:</strong> {task.title}
            </div>
            {isAdmin && <button style={styles.button} onClick={() => handleAcceptTask(task.id, userId, userName)}>Accept</button>}
          </div>
        ))}
      </div>
      <div style={styles.tasksColumn}>
        <h2>{isAdmin ? 'UserTasks' : 'Tagged'}</h2>
        {(isAdmin ? userTasks : taggedTasks).map((task, index) => (
          <div key={index} style={styles.task}>
            <div>
              <strong>Title:</strong> {task.title}
            </div>
            <div style={{ display: 'flex' }}>
              <strong className='mr-1'>User ID :</strong>{task.user_id}
              <div style={styles.avatar}>{task.User.charAt(0).toUpperCase()}</div>
            </div>
            {isAdmin && <button style={styles.button} onClick={() => handleSendQc(task.id)}>Send to QC</button>}
          </div>
        ))}
      </div>

      <div style={styles.tasksColumn}>
        <h2>Qc</h2>
        {(isAdmin ? userTasks1 : qcTasks).map((task, index) => (
          <div key={index} style={styles.task}>
            <div>
              <strong>Title:</strong> {task.title}
            </div>
            <div style={{ display: 'flex' }}>
              <strong className='mr-1'>User ID :</strong> {task.user_id}
              <div style={styles.avatar}>{task.User.charAt(0).toUpperCase()}</div>
            </div>
            {isAdmin && <button style={styles.button} onClick={() => handleDone(task.id)}>Done</button>}
          </div>
        ))}
      </div>
      <div className="tasks-column" style={styles.tasksColumn}>
        <h2>Completed</h2>
        {(isAdmin ? userTasks2 : doneTasks).map((task, index) => (
          <div key={index} className="task" style={styles.task}>
            <div>
              <strong>Title:</strong> {task.title}
            </div>
            <div style={{ display: 'flex' }}>
              <strong className='mr-1'>User ID :</strong> {task.user_id}
              <div style={styles.avatar}>{task.User.charAt(0).toUpperCase()}</div>
            </div>
          </div>
        ))}
      </div>
      {isCreateTaskOpen && <TaskForm onCreateTask={handleCreateTask} />}
    </div>
  );
}

export default ContentArea;
