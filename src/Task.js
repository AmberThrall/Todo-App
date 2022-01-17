import React from 'react';
import moment from 'moment';
import editIcon from './assets/edit.svg';
import trashIcon from './assets/trash.svg';
import './Task.css';

class Task extends React.Component {
    timeTill(due) {
        const now = moment();
        if (now.year() === due.year()) {
            if (now.month() === due.month() && now.date() === due.date())
                return due.format('h:mm A');
            else
                return due.format("MMM Do");
        }
        else
            return due.format("YYYY");
    }

    taskPriority(priority) {
        switch (this.props.priority.toLowerCase()) {
            case "high": return "taskHighPriority";
            case "medium": return "taskMediumPriority";
            default: return "taskLowPriority";
        }
    }

    render() {
        return (
            <table className={this.taskPriority(this.props.priority)}>
                <tbody><tr>
                <td className="taskLeftSide">
                         <input
                            id={"taskCheckbox-" + this.props.id}
                            onChange={this.props.onChange} 
                            checked={this.props.completed} 
                            style={{defaultChecked: this.props.completed}} 
                            type="checkbox" 
                            className="taskCheckbox" 
                         />
                    <label htmlFor={"taskCheckbox-" + this.props.id} className={this.props.completed ? "taskTitleChecked" : "taskTitleUnchecked"}>
                        {this.props.title}
                    </label>
                </td>
                <td className="taskDetails"><button onClick={this.props.onDetails}>Details</button></td>
                <td className="taskDue">{this.timeTill(this.props.due)}</td>
                <td className="taskIcon"><img src={editIcon} alt="Edit" onClick={this.props.onEdit} /></td>
                <td className="taskIcon"><img src={trashIcon} alt="Delete" onClick={this.props.onDelete}/></td>
                </tr></tbody>
            </table>
        );
    }
}

export default Task;
