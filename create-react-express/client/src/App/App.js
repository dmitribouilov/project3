import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import WarGame from '../components/WarGame';
import { Header, Layout } from '../components/layout.component';
import Shots from '../components/Drink'
import Home from './pages/Home';
import List from './pages/List';
import Login from './pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/list' component={List}/>
          <Route path='/login' component={Login}/>
          <Route path='/game' component={WarGame}/>
        </Switch>
      </div>
    )
    return (
      <Switch>
        <App/>
      </Switch>
    );
  }
}






//const App = () => {
 // return (
 // <div className = "App">
  //  <Header>War Game</Header>
  //  <Layout>
  //    <WarGame />
  //  </Layout>
  //</div>
//)};

export default App;