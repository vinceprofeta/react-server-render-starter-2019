import React, { Component } from 'react';
import Loadable from 'react-loadable';
import Routes from './routes';
import { renderRoutes } from 'react-router-config';
import { withRouter } from 'react-router';
import { Switch, NavLink } from 'react-router-dom';
import './appps.css';

const AsyncComponent = Loadable({
    loader: () => import(/* webpackChunkName: "myNamedChunk" */ './components/Test/Test'),
    loading: () => <div>loading...</div>,
    modules: ['Test'],
});

class App extends Component {
    
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src="/images/logo.svg" className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <div className="App-intro">
                    <h2>Part 1: Async component</h2>
                    <AsyncComponent />

                    <h2>Part 3: React router</h2>
                    <nav>
                        <NavLink to="/" exact activeClassName="active">Home</NavLink>
                        <NavLink to="/another" activeClassName="active">Another page</NavLink>
                    </nav>
                    <Switch>
                      {renderRoutes(Routes)}
                    </Switch>
                </div>
            </div>
        );
    }
}

export default withRouter(App);