import React from 'react';
import moment from 'moment';
import './App.css';
import Header from './Header.js';
import NavBar from './NavBar.js';
import Task from './Task.js';
import Modal from './Modal.js';
import DetailsModal from './DetailsModal.js';
import TaskEdit from './TaskEdit.js';

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
            modal: {
                open: false,
                header: "Modal",
                content: "Hello World",
                onClose: () => {}
            }
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

    addTask(title, due, description, project, priority = "low") {
        const id = this.state.tasks.length;

        this.setState({
            tasks: this.state.tasks.concat([{
                id,
                title,
                due,
                description,
                project,
                priority,
                complete: false,
                deleted: false,
            }]),
        });

        return id;
    }

    deleteTask(id) {
        const tasks = this.state.tasks.slice();
        tasks[id].deleted = true;
        this.setState({tasks: tasks});
    }

    changeCompletionStatus(id, status) {
        const tasks = this.state.tasks.slice();
        tasks[id].complete = status;
        this.setState({tasks: tasks});
    }

    openModal(header, content, onClose = () => {}) {
        this.setState({
            modal: {
                open: true,
                header: header,
                content: content,
                onClose: onClose,
            }
        });
    }

    closeModal() {
        this.setState({ modal: { open: false } });
    }

    yesNoModal(header, message, onYes, onNo, onClose = () => {}) {
        this.openModal(header, (
            <div className="yesNoModal">
                <p>{message}</p>
                <button onClick={() => { onYes(); this.closeModal(); }}>Yes</button>
                <button onClick={() => { onNo(); this.closeModal(); }}>No</button>
            </div>
        ), onClose);
    }

    newTaskModal() {
        this.openModal("Add Task...", (
            <TaskEdit title="" description="" priority="" due={moment()} project="" mode="add" projects={this.state.projects} onSubmit={(state) => {
                this.addTask(state.title, moment(state.dueDate + "T" + state.dueTime), state.description, state.project, state.priority.toLowerCase()); 
                this.closeModal();
            } }/>
        ));
    }

    randomTask() {
        this.addTask(`Task #${this.state.tasks.length + 1}`, moment(), `# Remarkable

> Experience real-time editing with Remarkable!

Click the 'clear' link to start with a clean slate, or get the 'permalink' to share or save your results.`, "Project 1", "medium");
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

        const tasks = this.search(this.state.searchParams);
        const taskFeed = tasks.length === 0 ? 
            <h1>No Tasks Found!</h1> :
            tasks.map((task) => {
                return (
                    <Task 
                        id={task.id}
                        title={task.title}
                        due={task.due} 
                        priority={task.priority} 
                        completed={task.complete}
                        onChange={() => this.changeCompletionStatus(task.id, !task.complete)}
                        onDetails={() => {
                            this.openModal(task.title, <DetailsModal project={task.project} priority={task.priority} due={task.due} description={task.description} />);
                        }}
                        onEdit={() => console.log("Edit task #" + task.id)}
                        onDelete={() => {
                            this.yesNoModal("Delete Task?", "Are you sure you want to delete task '" + task.title + "'?",
                                () => this.deleteTask(task.id),
                                () => {} 
                            );
                        }}
                    />
                );
            });

        return (
            <div className="App">
                <Modal 
                    isOpen={this.state.modal.open} 
                    header={this.state.modal.header} 
                    content={this.state.modal.content} 
                    onClose={() => { this.state.modal.onClose(); this.closeModal(); }}
                />
                <Header />
                <div className="AppSplit">
                    <NavBar 
                        categories={categories} 
                        projects={projects} 
                        onAdd={() => this.newTaskModal()}
                    />
                    <div className="TaskFeed">{taskFeed}</div>
                </div>
            </div>
        );
    }
}

export default App;
