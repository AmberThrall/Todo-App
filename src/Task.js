import React from 'react';
import editIcon from './assets/edit.svg';
import trashIcon from './assets/trash.svg';
import Data from './Data.js';
import './Task.css';

class Checkbox extends React.Component {
    render() {
        return (
            <label>
                <input type="checkbox" className="taskCheckbox" />
                &nbsp;&nbsp;
                {this.props.label}
            </label>
        );
    }
}

class Task extends React.Component {
    #timeTill(due) {
        const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

        let now = new Date();
        if (now.getFullYear() === due.getFullYear()) {
            if (now.getMonth() === due.getMonth() && now.getDate() === due.getDate()) {
                let hour = due.getHours();
                let minutes = due.getMinutes();
                if (minutes < 10)
                    minutes = "0" + minutes;

                let ampm = "AM";
                if (hour === 0)
                    hour = 12;
                else if (hour === 12) {
                    ampm = "PM";
                    hour = 12;
                }
                else if (hour > 12) {
                    ampm = "PM";
                    hour = hour % 12;
                }
                return hour + ":" + minutes + " " + ampm;
            }
            else
                return months[due.getMonth()] + " " + due.getDate();

        } else {
            return due.getFullYear();
        }
    }

    #taskPriority(priority) {
        switch (this.props.priority.toLowerCase()) {
            case "high": return "taskHighPriority";
            case "medium": return "taskMediumPriority";
            default: return "taskLowPriority";
        }
    }

    render() {
        return (
            <table className={this.#taskPriority(this.props.priority)}>
                <tbody><tr>
                <td className="taskLeftSide"><Checkbox label={this.props.title} /></td>
                <td className="taskDetails"><a>Details</a></td>
                <td className="taskDue">{this.#timeTill(this.props.due)}</td>
                <td className="taskIcon"><img src={editIcon} alt="Edit" /></td>
                    <td className="taskIcon"><img src={trashIcon} alt="Delete" onClick={ () => { Data.removeTask(this.props.id); } }/></td>
                </tr></tbody>
            </table>
        );
    }
}

export default Task;
