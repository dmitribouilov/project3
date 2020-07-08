import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Home extends Component {
  render() {
    return (
    <div className="App">

      

      <h1>Project Home</h1>
      {/* Link to List.js */}
       <Link to={'./login'}>
        <button variant="raised">
            login
        </button>
      </Link>
      <Link to={'./signup'}>
        <button variant="raised">
            sign up
        </button>
      </Link>
     
    </div>
    );
  }
}
export default Home;