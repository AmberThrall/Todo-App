import React, { useState, useEffect } from 'react';
import Task from './Task.js';
import Data from './Data.js';

class TaskFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refresh: true,
        };
    }

    componentDidMount() {
        Data.refreshFeed = () => { this.setState({ reload: true }); }
    }

    randomTask() {
        Data.addTask(`Task #${Data.tasks.length + 1}`, new Date(), "details", "Project 1");
        console.log(Data.tasks);
        Data.refreshFeed();
        Data.refreshNavBar();
    }

    render() {
        let tasks = Data.findTasks(Data.searchParams);
        let content = [];
        for (let task of tasks) {
            content.push(<Task id={task.id} title={task.title} due={task.due} priority={task.priority} />);
        }

        if (content.length === 0) {
            return (
                <div className="TaskFeed">
                    <p>No tasks found.</p>
                    <a onClick={this.randomTask}>Add Task</a>
                </div>
            );
        }
        else {
            return (
                <div className="TaskFeed">
                    {content}
                    <a onClick={this.randomTask}>Add Task</a>
                </div>
            );
        }
    }
}

export default TaskFeed;
