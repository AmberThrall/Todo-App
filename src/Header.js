import React from 'react';
import './Header.css';
import logo from './assets/logo.png';

class Header extends React.Component {
    render() {
       return (
           <header className="header">
               <img src={logo} alt="Todo Logo" />
               <h1>Todo</h1>
           </header>
       );
    }
}

export default Header;
