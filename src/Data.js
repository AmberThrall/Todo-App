import TaskFeed from './TaskFeed.js';

let Data = {
    tasks: {},
    taskCount: 0,
    projects: [ "Project 1", "Project 2" ],
    searchParams: {},
    
    addTask: function(title, due, details, project, priority = "medium") {
        let id = this.taskCount;
        this.taskCount += 1;

        this.tasks[id] = {
            id,
            title,
            due,
            details,
            project,
            priority,
            complete: false,
        };

        return id;
    },

    removeTask: function(id) {
        delete this.tasks[id];
        this.refreshFeed();
        this.refreshNavBar();
    },

    findTasks: function(props) {
        let results = [];

        for (let taskId in this.tasks) {
            let task = this.tasks[taskId];

            if (props.dateRange !== undefined && props.dateRange.min !== undefined && props.dateRange.max !== undefined) {
                if (!(task.due >= props.dateRange.min || task.due <= props.dateRange.max))
                    continue;
            }

            if (props.project !== undefined && task.project !== props.project)
                continue;

            if (props.includeComplete === false && task.complete)
                continue;
                
            results.push(task);
        }

        return results;
    }
};

export default Data;
