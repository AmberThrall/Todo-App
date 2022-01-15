import React from 'react';
import moment from 'moment';
import './App.css';
import Header from './Header.js';
import NavBar from './NavBar.js';
import TaskFeed from './TaskFeed.js';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            categories: [
                {
                    name: "All Tasks",
                    params: () => { return {}; }
                },
                {
                    name: "Today",
                    params: () => {
                        return {
                            dateRange: {
                                start: moment().startOf('day'),
                                end: moment().endOf('day'),
                            }
                        };
                    }
                },
                {
                    name: "This Week",
                    params: () => {
                        return {
                            dateRange: {
                                start: moment().startOf('week'),
                                end: moment().endOf('week'),
                            }
                        };
                    }
                },
                {
                    name: "This Month",
                    params: () => {
                        return {
                            dateRange: {
                                start: moment().startOf('month'),
                                end: moment().endOf('month'),
                            }
                        };
                    }
                }

            ],
            searchParams: {},
            projects: [ "Project 1", "Project 2" ],
        };
    }

    search(params = {}) {
        let results = [];
        for (let task of this.state.tasks) {
            if (task.deleted)
                continue;
            if (params["project"] && params["project"] !== task.project)
                continue;
            if (params["dateRange"] && !task.due.isBetween(params["dateRange"]["start"], params["dateRange"]["end"]))
                continue;

            results.push(task);
        }

        return results;
    }

    addTask(title, due, details, project, priority = "low") {
        const id = this.state.tasks.length;

        this.setState({
            tasks: this.state.tasks.concat([{
                id,
                title,
                due,
                details,
                project,
                priority,
                complete: false,
                deleted: false,
            }]),
        });

        return id;
    }

    randomTask() {
        this.addTask(`Task #${this.state.tasks.length + 1}`, moment(), "", "Project 1", "medium");
    }

    render() {
        const categories = this.state.categories.map((category) => {
            return {
                name: category.name,
                onClick: () => console.log("Changed category to " + category.name),
                count: this.search(category.params()).length,
            };
        });

        const projects = this.state.projects.map((project) => {
            return {
                name: project,
                onClick: () => console.log("Changed category to project " + project),
                count: this.search({ project: project }).length,
            };
        });

        return (
            <div className="App">
                <Header />
                <div className="AppSplit">
                    <NavBar categories={categories} projects={projects} />
                    <TaskFeed tasks={ this.search(this.state.searchParams) } />
                    <button onClick={() => this.randomTask()}>Add Task</button>
                </div>
            </div>
        );
    }
}

export default App;
