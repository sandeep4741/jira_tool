import React, { useState, useEffect } from 'react';
import ContentArea from './ContentArea';


const UserPage = () => {
    const userId = parseInt(localStorage.getItem('userId'));
    const userName = localStorage.getItem('userName');

    const [tasks, setTasks] = useState([]);

    const isUser = false;
    const isAdmin = true;

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch('http://localhost:4000/getCreatedTasks');
                const data = await response.json();
                setTasks(data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, []);


    return (
        <div style={styles.container}>
            <div style={styles.navbar}>
                <div style={styles.avatar}>{userName.charAt(0).toUpperCase()}</div>
                <div style={styles.adminName}>
                    {userName}
                </div>
                <a href='/'>
                    <button style={styles.createLogButton}>
                        Log Out
                    </button>
                </a>
            </div>
            <div style={styles.content}>
                <ContentArea userId={userId} userName={userName} isAdmin={isAdmin} isUser={isUser} />
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        height: '100vh',
    },
    navbar: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#007bff',
        padding: '20px',
        alignItems: 'center',
        color: 'white',
    },
    content: {
        flex: 1,
        overflowY: 'auto',
        padding: '20px',
    },
    adminName: {
        fontSize: '18px',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: '10px',
    },
    avatar: {
        width: '70px',
        height: '70px',
        borderRadius: '50%',
        marginBottom: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
        backgroundColor: 'white', 
        color: '#007bff', 
    },
    createLogButton: {
        marginTop: '20px',
        backgroundColor: 'transparent',
        color: 'white',
        border: 'none',
        padding: '5px 10px',
        borderRadius: '5px',
        cursor: 'pointer',
        border: '1px solid white',
    },
};

export default UserPage;
