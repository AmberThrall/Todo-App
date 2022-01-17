import React from 'react';
import moment from 'moment';
import './App.css';
import Header from './Header.js';
import NavBar from './NavBar.js';
import Task from './Task.js';
import Modal from './Modal.js';
import DetailsModal from './DetailsModal.js';
import TaskEdit from './TaskEdit.js';
import NewProject from './NewProject.js';

class App extends React.Component {
    constructor(props) {
        let tasks = localStorage.getItem("tasks");
        let projects = localStorage.getItem("projects");

        if (tasks) {
            tasks = JSON.parse(tasks);
            tasks = tasks.map((task) => {
                return {
                    ...task,
                    due: moment(task.due),
                };
            });
        }
        else
            tasks = [];

        if (projects)
            projects = JSON.parse(projects);
        else
            projects = ["Default"];

        super(props);
        this.state = {
            tasks: tasks,
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
            projects: projects,
            modal: {
                open: false,
                header: "Modal",
                content: "Hello World",
                onClose: () => {}
            }
        };
    }

    saveData() {
        localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
        localStorage.setItem("projects", JSON.stringify(this.state.projects));
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

    editTask(id, title, due, description, project, priority) {
        const tasks = this.state.tasks.slice();
        if (!tasks[id]) {
            this.openModal("Error", "Cannot edit task #" + id + ", no such task found.");
            return;
        }

        tasks[id].title = title;
        tasks[id].due = due;
        tasks[id].description = description;
        tasks[id].project = project;
        tasks[id].priority = priority;
        this.setState({ tasks: tasks });
    }

    deleteTask(id) {
        const tasks = this.state.tasks.slice();
        if (!tasks[id]) {
            this.openModal("Error", "Cannot delete task #" + id + ", no such task found.");
            return;
        }

        tasks[id].deleted = true;
        this.setState({tasks: tasks});
    }

    changeCompletionStatus(id, status) {
        const tasks = this.state.tasks.slice();
        if (!tasks[id]) {
            this.openModal("Error", "Cannot change completion status of task #" + id + ", no such task found.");
            return;
        }

        tasks[id].complete = status;
        this.setState({tasks: tasks});
    }

    addProject(project) {
        if (this.state.projects.includes(project)) {
            this.openModal("Error", "Cannot add project '" + project + "', project already exists.");
            return;
        }

        this.setState({ projects: this.state.projects.concat([ project ]) });
    }

    deleteProject(project) {
        const id = this.state.projects.indexOf(project);
        if (id < 0) {
            this.openModal("Error", "Cannot delete project '" + project + "', no such project found.");
            return;
        }

        let projects = this.state.projects.slice();
        projects.splice(id, 1);
        this.setState({ projects: projects });
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
            <TaskEdit title="" description="" priority="low" due={moment().endOf('day')} project={ this.state.searchParams.project || "Default" } mode="add" projects={this.state.projects} onSubmit={(state) => {
                this.addTask(state.title, moment(state.dueDate + "T" + state.dueTime), state.description, state.project, state.priority.toLowerCase()); 
                this.closeModal();
            } }/>
        ));
    }

    editTaskModal(id) {
        const task = this.state.tasks[id];

        this.openModal("Edit Task...", (
            <TaskEdit title={task.title} description={task.description} priority={task.priority} due={task.due} project={task.project} mode="edit" projects={this.state.projects} onSubmit={(state) => {
                this.editTask(id, state.title, moment(state.dueDate + "T" + state.dueTime), state.description, state.project, state.priority.toLowerCase());
                this.closeModal();
            } } />
        ));
    }

    render() {
        this.saveData();

        const categories = this.state.categories.map((category) => {
            return {
                name: category.name,
                onClick: () => this.setState({ searchParams: category.params() }),
                count: this.search(category.params()).filter((t) => { return !t.complete }).length,
            };
        });

        let projects = this.state.projects.map((project) => {
            return {
                name: project,
                onClick: () => this.setState({ searchParams: { project: project } }),
                count: this.search({ project: project }).filter((t) => { return !t.complete }).length,
            };
        });
        projects.push({
            name: "+ Add Project",
            onClick: () => {
                this.openModal("Add Project...", <NewProject onSubmit={(project) => {
                    this.closeModal();
                    this.addProject(project);
                }} />);
            },
        });

        const tasks = this.search(this.state.searchParams).sort((a, b) => { 
            if (a.due.isBefore(b.due))
                return -1;
            if (a.due.isAfter(b.due))
                return 1;
            if (a.priority === "high" && (b.priority === "medium" || b.priority === "low"))
                return -1;
            if (a.priority === "medium" && b.priority === "low")
                return -1;
            if (a.priority === "low" && (b.priority === "medium" || b.priority === "high"))
                return 1;
            if (a.priority === "medium" && b.priority === "high")
                return 1;
            return 0;
        });
        let taskFeed;
        if (tasks.length === 0) {
            if (this.state.searchParams.project && this.state.searchParams.project !== "Default")
                taskFeed = <><h1>No Tasks Found!</h1><center><button onClick={() => {
                    this.deleteProject(this.state.searchParams.project);
                    this.setState({ searchParams: this.state.categories[0].params() });
                }}>Delete Project: "{this.state.searchParams.project}"</button></center></>;
            else
                taskFeed = <h1>No Tasks Found!</h1>;
        }
        else {
            taskFeed = tasks.map((task) => {
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
                        onEdit={() => this.editTaskModal(task.id)}
                        onDelete={() => {
                            this.yesNoModal("Delete Task?", "Are you sure you want to delete task '" + task.title + "'?",
                                () => this.deleteTask(task.id),
                                () => {} 
                            );
                        }}
                    />
                );
            });
        }

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
