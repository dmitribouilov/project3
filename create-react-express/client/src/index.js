import React from "react";
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App/App";
import registerServiceWorker from "./registerServiceWorker";

render((
    <BrowserRouter>
        <App/>
    </BrowserRouter>
), document.getElementById('root'));




//ReactDOM.render(<App />, document.getElementById("root"));
//registerServiceWorker();
