import React from 'react';
import moment from 'moment';
import editIcon from './assets/edit.svg';
import trashIcon from './assets/trash.svg';
import './Task.css';

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
        }
    }

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

    #taskPriority(priority) {
        switch (this.props.priority.toLowerCase()) {
            case "high": return "taskHighPriority";
            case "medium": return "taskMediumPriority";
            default: return "taskLowPriority";
        }
    }

    setChecked(checked) {
        this.setState({ checked: checked });
    }

    render() {
        return (
            <table className={this.#taskPriority(this.props.priority)}>
                <tbody><tr>
                <td className="taskLeftSide">
                    <label className={this.state.checked ? "taskTitleChecked" : "taskTitleUnchecked"}>
                         <input onChange={()=>this.setChecked(!this.state.checked)} checked={this.state.checked} style={{defaultChecked: this.state.checked}} type="checkbox" className="taskCheckbox" />
                        {this.props.title}
                    </label>
                </td>
                <td className="taskDetails"><a>Details</a></td>
                <td className="taskDue">{this.timeTill(this.props.due)}</td>
                <td className="taskIcon"><img src={editIcon} alt="Edit" /></td>
                <td className="taskIcon"><img src={trashIcon} alt="Delete" onClick={ () => { } }/></td>
                </tr></tbody>
            </table>
        );
    }
}

export default Task;
