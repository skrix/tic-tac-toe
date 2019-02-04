// Import React Basics
import React    from 'react';
import ReactDOM from 'react-dom';

// Import Application Components
import Game     from './application/game'

// Import Application Styles
import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.css';

// Render Application to DOM
ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
