import React from 'react';
import check from './assets/check.svg';
import './TaskEdit.css';

class TaskEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            description: this.props.description,
            priority: this.props.priority,
            dueDate: this.props.due.format("YYYY-MM-D"),
            dueTime: this.props.due.format('HH:mm'),
            project: this.props.project === "" ? this.props.projects[0] : this.props.project,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        switch (event.target.id) {
            case "taskTitle":
                this.setState({ title: event.target.value });
                break;
            case "taskDescription":
                this.setState({ description: event.target.value });
                break;
            case "taskProject":
                this.setState({ project: event.target.value });
                break;
            case "taskDueDate":
                this.setState({ dueDate: event.target.value });
                break;
            case "taskDueTime":
                this.setState({ dueTime: event.target.value });
                break;
            case "taskPriorityLow":
            case "taskPriorityMedium":
            case "taskPriorityHigh":
                this.setState({ priority: event.target.value.toLowerCase() });
                break;
            default:
                break;
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(this.state);
    }

    render() {
        const projects = this.props.projects.map((project) => {
            return <option key={project} value={project}>{project}</option>;
        });

        const priorities = ["Low", "Medium", "High"];
        const prioritiesContent = priorities.map((p) => {
            if (this.state.priority === p.toLowerCase()) {
                return (
                    <div key={p}>
                        <input type="radio" name="priority" id={"taskPriority" + p} value={p} checked onChange={this.handleChange} />
                        <label htmlFor={"taskPriority" + p}><span><img src={check} alt="Checked Icon" /></span></label>
                    </div>
                );
            }
            else {
                return (
                    <div key={p}>
                        <input type="radio" name="priority" id={"taskPriority" + p} value={p} onChange={this.handleChange} />
                        <label htmlFor={"taskPriority" + p}><span><img src={check} alt="Checked Icon" /></span></label>
                    </div>
                );
            }
        });

        return (
            <div className="editTask">
                <form onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Title" className="editTaskTitle" id="taskTitle" value={this.state.title} onChange={this.handleChange} required />
                <textarea rows="5" placeholder="Description" className="editTaskDescription" id="taskDescription" value={this.state.description} onChange={this.handleChange}></textarea>
                <table className="editTaskMisc"><tbody>
                    <tr>
                        <td><label htmlFor="taskProject">Project:</label></td>
                        <td><select className="editTaskProject" id="taskProject" value={this.state.project} onChange={this.handleChange}>
                            {projects}
                        </select></td>
                    </tr><tr>
                        <td><label htmlFor="taskDueDate">Due:</label></td>
                        <td>
                            <input type="date" className="editTaskDate" id="taskDueDate" value={this.state.dueDate} onChange={this.handleChange} />
                            <label htmlFor="taskDueTime"> at</label>
                            <input type="time" className="editTaskTime" id="taskDueTime" value={this.state.dueTime} onChange={this.handleChange} />
                        </td>
                    </tr><tr>
                        <td><label>Priority:</label></td>
                        <td className="editTaskPriority">
                            {prioritiesContent}
                        </td>
                    </tr>
                </tbody></table>
                <button className="editTaskSubmit">{this.props.mode === "add" ? "Add" : "Save"}</button>
                </form>
            </div>
        );
    }
}

export default TaskEdit;
