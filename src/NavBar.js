import React from 'react';
import './NavBar.css';

class NavBar extends React.Component {
    render() {
        return (
            <div className="navBar">
                <ul className="navGroups">
                    <li className="navItem"><a>All Tasks</a><span className="navItemCount">13</span></li>
                    <li className="navItem"><a>Today</a><span className="navItemCount">2</span></li>
                    <li className="navItem"><a>This Week</a><span className="navItemCount">4</span></li>
                    <li>Projects</li>
                    <ul className="navProjects">
                        <li className="navItem"><a>Project 1</a><span className="navItemCount">1</span></li>
                        <li className="navItem"><a>Project 2</a><span className="navItemCount">5</span></li>
                    </ul>
                    <li className="navItem"><a>Notes</a></li>
                </ul>
            </div>
        );
    }
}

export default NavBar;
