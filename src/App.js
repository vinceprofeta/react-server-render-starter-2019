import React, { Component } from 'react';
import Loadable from 'react-loadable';
import Routes from './routes';
import { renderRoutes } from 'react-router-config';
import { withRouter } from 'react-router';
import { Switch, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import AsyncComponent from './components/Test/Test'
import './app.css';



const Test = styled.h1`
  font-size: 10px;
  text-align: center;
  color: palevioletred;
`;



class App extends Component {
    
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src="/images/logo.svg" className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <div className="App-intro">
                    <h2 className="fer">Part 1: Async component</h2>
                    <AsyncComponent />

                    <Test>
                      Hello World!
                    </Test>


                   
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