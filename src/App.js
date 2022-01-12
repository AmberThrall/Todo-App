import './App.css';
import Header from './Header.js';
import NavBar from './NavBar.js';
import Task from './Task.js';

function App() {
  return (
    <div className="App">
        <Header />
        <div className="AppSplit">
            <NavBar />
            <div className="AppRightSide">
                <Task title="Take out Trash" due={new Date(2022, 0, 12, 5, 30)} priority="medium" />
                <Task title="Go To Bed" due={new Date(2022, 0, 12, 0, 0)} priority="high" />
                <Task title="Eat Lunch" due={new Date(2022, 0, 12, 12, 0)} priority="medium" />
                <Task title="Eat Dinner" due={new Date(2022, 0, 12, 18, 0)} priority="medium" />
                <Task title="Create Todo App" due={new Date(2022, 0, 15)} priority="low" />
            </div>
        </div>
    </div>
  );
}

export default App;
