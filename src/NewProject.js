import React from 'react';
import './TaskEdit.css';

class NewProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(this.state.value);
    }

    render() {
        return (
            <div className="editTask">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Name" className="editTaskTitle" id="newProject" value={this.state.value} onChange={this.handleChange} required />
                    <button className="editTaskSubmit">Add</button>
                </form>
            </div>
        );
    }
}

export default NewProject;
