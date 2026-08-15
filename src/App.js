import { useState, useMemo } from 'react';
import { useTasks } from './hooks/useTasks';
import Navbar from './components/Navbar';
import TaskSummary from './components/TaskSummary';
import TaskControls from './components/TaskControls';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';

export default function App() {
  const [view, setView] = useState('list');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [assigneeFilter, setAssigneeFilter] = useState('');

  const { tasks, addTask, updateTaskStatus, deleteTask } = useTasks();

  const assignees = useMemo(() => {
    return [...new Set(tasks.map((t) => t.assignee).filter(Boolean))];
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    return [...tasks]
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
        .filter((task) => {
          const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
          const matchesStatus = !statusFilter || task.status === statusFilter;
          const matchesAssignee = !assigneeFilter || task.assignee === assigneeFilter;
          return matchesSearch && matchesStatus && matchesAssignee;
        });
  }, [tasks, search, statusFilter, assigneeFilter]);

  return (
      <div className="container">
        <Navbar currentView={view} setView={setView} />

        {view === 'list' ? (
            <section className="view-section">
              <TaskSummary tasks={tasks} />
              <TaskControls
                  search={search}
                  setSearch={setSearch}
                  statusFilter={statusFilter}
                  setStatusFilter={setStatusFilter}
                  assigneeFilter={assigneeFilter}
                  setAssigneeFilter={setAssigneeFilter}
                  assignees={assignees}
              />
              <TaskList
                  tasks={filteredTasks}
                  onUpdateStatus={updateTaskStatus}
                  onDeleteTask={deleteTask}
              />
            </section>
        ) : (
            <section className="view-section">
              <TaskForm onAddTask={addTask} onSuccess={() => setView('list')} />
            </section>
        )}
      </div>
  );
}