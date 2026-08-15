export default function TaskList({ tasks, onUpdateStatus, onDeleteTask }) {
    if (tasks.length === 0) {
        return <p className="empty-message">No tasks found.</p>;
    }

    return (
        <div className="table-responsive">
            <table>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Assignee</th>
                    <th>Priority</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {tasks.map((task) => (
                    <tr key={task.id}>
                        <td><strong>{task.title}</strong></td>
                        <td>{task.assignee || 'Unassigned'}</td>
                        <td><span className={`priority priority-${task.priority}`}>{task.priority}</span></td>
                        <td>{task.dueDate}</td>
                        <td>
                            <select value={task.status} onChange={(e) => onUpdateStatus(task.id, e.target.value)}>
                                <option value="To Do">To Do</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Done">Done</option>
                            </select>
                        </td>
                        <td>
                            <button className="btn-delete" onClick={() => onDeleteTask(task.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}