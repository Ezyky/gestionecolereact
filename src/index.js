import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'

import App from './App';
import registerServiceWorker from './registerServiceWorker';


import 'react-notifications/lib/notifications.css';
import 'react-progress-button/react-progress-button.css';

ReactDOM.render(
    <Router>
        <App />
    </Router>, 
    document.getElementById('root')
);
registerServiceWorker();
