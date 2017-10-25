import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import Home from './components/home/Home.js'
import Contact from './components/contact/Contact.js'

ReactDOM.render(<BrowserRouter>
        <App>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/contact' component={Contact} />
            </Switch>
        </App>
    </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
