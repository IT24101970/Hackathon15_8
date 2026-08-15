export default function Navbar({ currentView, setView }) {
    return (
        <header className="header">
            <h1>Team Task Tracker</h1>
            <nav>
                <button
                    className={currentView === 'list' ? 'active' : ''}
                    onClick={() => setView('list')}
                >
                    All Tasks
                </button>
                <button
                    className={currentView === 'add' ? 'active' : ''}
                    onClick={() => setView('add')}
                >
                    Add Task
                </button>
            </nav>
        </header>
    );
}