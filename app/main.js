import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import App from '../components/App';
import Inicio from '../components/Inicio';

ReactDOM.render(<App />, document.getElementById('app'));


ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Inicio} />
        </Route>
    </Router>
, document.getElementById('app'));