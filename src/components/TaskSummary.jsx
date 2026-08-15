export default function TaskSummary({ tasks }) {
    const counts = tasks.reduce(
        (acc, task) => {
            acc[task.status] = (acc[task.status] || 0) + 1;
            return acc;
        },
        { 'To Do': 0, 'In Progress': 0, Done: 0 }
    );

    return (
        <div className="summary-bar">
            <div className="summary-card">To Do: {counts['To Do']}</div>
            <div className="summary-card">In Progress: {counts['In Progress']}</div>
            <div className="summary-card">Done: {counts['Done']}</div>
        </div>
    );
}