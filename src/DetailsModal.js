import React from 'react';
import { Remarkable } from 'remarkable';

class DetailsModal extends React.Component {
    constructor(props) {
        super(props);
        this.md = new Remarkable();
    }

    getRawMarkup() {
        return { __html: this.md.render(this.props.description) };
    }

    render() {
        const due = this.props.due;
        const dueText = due.format("MMM Do, YYYY") + " at " + due.format("h:mm A");  
        const priority = this.props.priority[0].toUpperCase() + this.props.priority.substring(1).toLowerCase();
        const project = this.props.project === "" ? "" : <tr><td><span><strong>Project: </strong></span></td><td><span>{this.props.project}</span></td></tr>;

        return (
            <div className="detailsModal">
                <table><tbody>
                    {project}
                    <tr><td><span><strong>Priority: </strong></span></td><td><span>{priority}</span></td></tr>
                    <tr><td><span><strong>Due: </strong></span></td><td><span>{dueText}</span></td></tr>
                </tbody></table>
                <hr />
                <div className="detailsDescription" dangerouslySetInnerHTML={this.getRawMarkup()}></div>
            </div>
        );
    }
}

export default DetailsModal;
