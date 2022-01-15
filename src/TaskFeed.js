import React from 'react';
import Task from './Task.js';

class TaskFeed extends React.Component {
    render() {
        const content = this.props.tasks.length === 0 ?
            <p>No tasks found.</p> :
            this.props.tasks.map((task, id) => {
                return <Task id={id} title={task.title} due={task.due} priority={task.priority} />;
            });

        return <div className="TaskFeed">{content}</div>;
    }
}

export default TaskFeed;
