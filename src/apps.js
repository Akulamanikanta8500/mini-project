// App.js
import React, { useState } from 'react'; // No useEffect needed for this basic version

export function Apps() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');

    // --- FIX 1: Define addTask ---
    // This function adds the text from the input field to the tasks list
    const addTask = () => {
        if (!title) return; // Don't add empty tasks

        const newTask = {
            id: Date.now(), // Use a simple unique ID
            title: title
        };

        // Set the new tasks array
        setTasks(prevTasks => [...prevTasks, newTask]);

        // Clear the input field
        setTitle('');
    };

    // --- FIX 2: Define deleteTask ---
    // This function removes a task by its ID
    const deleteTask = (id) => {
        // Create a new array that excludes the task with the matching id
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);
    };

    return (
        <div>
            <h1>Task Management System</h1>
            <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Enter task"
            />
            {/* These buttons will now work */}
            <button onClick={addTask}>Add Task</button>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        {task.title}
                        <button onClick={() => deleteTask(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Apps;