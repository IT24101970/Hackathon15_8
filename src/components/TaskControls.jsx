export default function TaskControls({ search, setSearch, statusFilter, setStatusFilter, assigneeFilter, setAssigneeFilter, assignees }) {
    return (
        <div className="controls">
            <input
                type="text"
                placeholder="Search tasks by title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="">All Statuses</option>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
            </select>

            <select value={assigneeFilter} onChange={(e) => setAssigneeFilter(e.target.value)}>
                <option value="">All Assignees</option>
                {assignees.map((name) => (
                    <option key={name} value={name}>{name}</option>
                ))}
            </select>
        </div>
    );
}