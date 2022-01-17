import React from 'react';
import './NavBar.css';

function NavBar(props) {
    const categories = props.categories.map((category, id) => {
        return <li key={id} className="navItem"><button onClick={category.onClick}>{category.name}</button><span className="navItemCount">{category.count}</span></li>;
    });

    const projects = props.projects.map((project, id) => {
        if (project.count !== undefined)
            return <li key={"project" + id} className="navItem"><button onClick={project.onClick}>{project.name}</button><span className="navItemCount">{project.count}</span></li>;
        else
            return <li key={"project" + id} className="navItem"><button onClick={project.onClick}>{project.name}</button></li>;
    });

    return (
        <div className="navBar">
            <ul className="navGroups">
                {categories}
                <li key="projects">Projects</li>
                <ul className="navProjects">{projects}</ul>
            </ul>
            <button className="plusButton" onClick={props.onAdd}></button>
        </div>
    );
}

export default NavBar;
