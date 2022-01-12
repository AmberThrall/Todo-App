import React from 'react';
import Data from './Data.js';
import './NavBar.css';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refresh: true,
        };
    }

    componentDidMount() {
        Data.refreshNavBar = () => { this.setState({ reload: true }); }
    }

    render() {
        let projects = [];
        for (let project of Data.projects) {
            let numTasks = Math.min(Data.findTasks({ project }).length, 99);
            projects.push(<li key={project} className="navItem"><a>{project}</a><span className="navItemCount">{numTasks}</span></li>);
        }

        let totalTasks = Math.min(Data.tasks.length, 99);
        let now = new Date();
        let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        let todaysTasks = Math.min(Data.findTasks({ dateRange: { min: today, max: today } }).length, 99);

        let sunday = new Date(today);
        sunday.setDate(today.getDate() - today.getDay());
        let saturday = new Date(sunday.getFullYear(), sunday.getMonth(), sunday.getDate() + 6);
        let weeksTasks = Math.min(Data.findTasks({ dateRange: { min: sunday, max: saturday } }).length, 99);

        return (
            <div className="navBar">
                <ul className="navGroups">
                    <li key="allTasks" className="navItem"><a onClick={ () => { Data.searchParams = {} } }>All Tasks</a><span className="navItemCount">{totalTasks}</span></li>
                    <li key="today" className="navItem"><a onClick={ () => { Data.searchParams = { dateRange: { min: today, max: today } }; }}>Today</a><span className="navItemCount">{todaysTasks}</span></li>
                    <li key="week" className="navItem"><a onClick={ () => { Data.searchParams = { dateRange: { min: sunday, max: saturday } }; }}>This Week</a><span className="navItemCount">{weeksTasks}</span></li>
                    <li key="projects">Projects</li>
                    <ul className="navProjects">{projects}</ul>
                </ul>
            </div>
        );
    }
}

export default NavBar;
