import TaskFeed from './TaskFeed.js';

let Data = {
    tasks: [],
    projects: [ "Project 1", "Project 2" ],
    searchParams: {},
    
    addTask: function(title, due, details, project, priority = "medium") {
        let id = this.tasks.length;

        this.tasks.push({
            id,
            title,
            due,
            details,
            project,
            priority
        });

        return id;
    },

    findTasks: function(props) {
        let results = [];

        for (let task of this.tasks) {
            if (props.dateRange !== undefined && props.dateRange.min !== undefined && props.dateRange.max !== undefined) {
                if (!(task.due >= props.dateRange.min || task.due <= props.dateRange.max))
                    continue;
            }

            if (props.project !== undefined && task.project !== props.project)
                continue;
                
            results.push(task);
        }

        return results;
    }
};

export default Data;
