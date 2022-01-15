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

        return (
            <div className="detailsModal">
                <span><strong>Project: </strong>{this.props.project}</span><br />
                <span><strong>Priority: </strong>{priority}</span><br />
                <span><strong>Due: </strong>{dueText}</span><br />
                <hr />
                <div className="detailsDescription" dangerouslySetInnerHTML={this.getRawMarkup()}></div>
            </div>
        );
    }
}

export default DetailsModal;
