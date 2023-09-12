import React, { useState } from 'react';
import LeftSidebar from './LeftSidebar';
import ContentArea from './ContentArea';
import TaskForm from './TaskForm'; 

function AdminPage() {
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('userName');

  const handleCreateTask = (newTask) => {
    setTasks([...tasks, newTask]);
    setIsCreateTaskOpen(false);
  };

  const isAdmin = false;
  const isUser = true;

  return (
    <div style={styles.adminPage}>
      <LeftSidebar adminName={userName} onCreateTask={() => setIsCreateTaskOpen(true)} />
      {isCreateTaskOpen ? (
        <TaskForm onCreateTask={handleCreateTask} onClose={() => setIsCreateTaskOpen(false)} />
      ) : (
        <div style={styles.content}>
        <ContentArea tasks={tasks} isAdmin={isAdmin} isUser={isUser} userId={userId} />
        </div>
      )}
    </div>
  );
}

const styles = {
  adminPage: {
    display: 'flex',
  },
  content: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px',
},
};

export default AdminPage;
