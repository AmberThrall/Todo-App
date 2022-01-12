import './App.css';
import Header from './Header.js';
import NavBar from './NavBar.js';
import TaskFeed from './TaskFeed.js';

function App() {
  return (
    <div className="App">
        <Header />
        <div className="AppSplit">
            <NavBar />
            <TaskFeed />
        </div>
    </div>
  );
}

export default App;
