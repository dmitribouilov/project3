import React from 'react';
import './App.css';
import WarGame from './components/WarGame';
import { Header, Layout } from './components/layout.component';

const App = () => {
  return (
  <div className = "App">
    <Header>War Game</Header>
    <Layout>
      <WarGame />
    </Layout>
  </div>
)};

export default App;