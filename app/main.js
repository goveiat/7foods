import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory, IndexRoute } from 'react-router';
import App from '../components/App';
import Inicio from '../components/Inicio';
import Carrinho from '../components/Carrinho';
import Login from '../components/Login';
import NotFound from '../components/NotFound';
import Empresa from '../components/Empresa';
import Cardapio from '../components/Cardapio';

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Inicio} />
            <Route path="/cardapio" component={Cardapio} />
            <Route path="/empresa" component={Empresa} />
            <Route path="/carrinho" component={Carrinho} />
            <Route path="/entrar" component={Login} />
            <Route path="*" component={NotFound} />
        </Route>
    </Router>
, document.getElementById('app'));