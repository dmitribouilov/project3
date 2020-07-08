import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class List extends Component {
  // Initialize the state
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      opponent: "",
      me: "",
    };
  }

  startGame = (event) => {
    event.preventDefault();

    console.log(event.target);

    this.setState({ redirect: "/game" });
    this.setState({ opponent: event.target.name });
  };

  componentDidMount() {
    this.setState({ me: this.props.location.state.me });
    this.getList();
  }

  // Retrieves the list of items from the Express app
  getList = () => {
    fetch("/api/getUsers")
      .then((res) => res.json())
      .then((list) => {
        var newList = list.filter(
          (x) => x.email !== this.state.me && x.onlineStatus !== "offline"
        );

        this.setState({ list: newList });
      });
  };

  render() {
    const { list } = this.state;

    console.log(list);

    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: this.state.redirect,
            state: { opponent: this.state.opponent, me: this.state.me },
          }}
        />
      );
    }
    return (
      <div className="App">
        <h1>List of Users</h1>
        <h1>Logged in As: {this.state.me}</h1>
        <button id={this.state.me} className="btn btn-primary" onClick="">
          LOG OUT
        </button>
        {/* Check to see if any items are found*/}
        {list.length ? (
          <div>
            {/* Render the list of items */}
            {list.map((item) => {
              return (
                <div>
                  <ul className="list-group">
                    <li className="list-group-item">
                      <h3>User ID: {item.id}</h3>
                      <p>User Name: {item.email} </p>
                      <p>Online Status: {item.onlineStatus}</p>

                      <button
                        id={item.id}
                        name={item.email}
                        className="btn btn-primary"
                        onClick={this.startGame}
                      >
                        PLAY
                      </button>
                    </li>
                  </ul>
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <h2>No List Items Found</h2>
          </div>
        )}
      </div>
    );
  }
}

export default List;
