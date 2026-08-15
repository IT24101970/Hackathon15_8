import { useState } from 'react';

export default function TaskForm({ onAddTask, onSuccess }) {
    const [title, setTitle] = useState('');
    const [assignee, setAssignee] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [dueDate, setDueDate] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!title.trim()) {
            newErrors.title = 'Title is required.';
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (!dueDate || new Date(dueDate) < today) {
            newErrors.dueDate = 'Due date cannot be in the past.';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        onAddTask({
            title: title.trim(),
            assignee: assignee.trim() || 'Unassigned',
            priority,
            dueDate,
            status: 'To Do',
        });

        onSuccess();
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <h2>Add New Task</h2>

            <div className="form-group">
                <label>Title *</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                {errors.title && <span className="error-message">{errors.title}</span>}
            </div>

            <div className="form-group">
                <label>Assignee Name</label>
                <input type="text" value={assignee} onChange={(e) => setAssignee(e.target.value)} />
            </div>

            <div className="form-group">
                <label>Priority</label>
                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>

            <div className="form-group">
                <label>Due Date *</label>
                <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                {errors.dueDate && <span className="error-message">{errors.dueDate}</span>}
            </div>

            <button type="submit" className="btn-submit">Save Task</button>
        </form>
    );
}