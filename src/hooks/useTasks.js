import { useState, useEffect } from 'react';
import { initialSeedData } from '../data/seedData';

export function useTasks() {
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem('team_tasks');
        return saved ? JSON.parse(saved) : initialSeedData;
    });

    useEffect(() => {
        localStorage.setItem('team_tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (newTask) => {
        setTasks((prev) => [...prev, { ...newTask, id: Date.now() }]);
    };

    const updateTaskStatus = (id, status) => {
        setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
    };

    const deleteTask = (id) => {
        setTasks((prev) => prev.filter((t) => t.id !== id));
    };

    return { tasks, addTask, updateTaskStatus, deleteTask };
}