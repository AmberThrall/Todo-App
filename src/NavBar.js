import React from 'react';
import './NavBar.css';

function NavBar(props) {
    const categories = props.categories.map((category, id) => {
        return <li key={id} className="navItem"><a onClick={category.onClick}>{category.name}</a><span className="navItemCount">{category.count}</span></li>;
    });

    const projects = props.projects.map((project, id) => {
        return <li key={"project" + id} className="navItem"><a onClick={project.onClick}>{project.name}</a><span className="navItemCount">{project.count}</span></li>;
    });

    return (
        <div className="navBar">
            <ul className="navGroups">
                {categories}
                <li key="projects">Projects</li>
                <ul className="navProjects">{projects}</ul>
            </ul>
        </div>
    );
}

export default NavBar;
