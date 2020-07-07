import React, { Component } from "react";

class List extends Component {
  // Initialize the state
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    this.getList();
  }

  // Retrieves the list of items from the Express app
  getList = () => {
    fetch("/api/getUsers")
      .then((res) => res.json())
      .then((list) => this.setState({ list }));
  };

  render() {
    const { list } = this.state;

    console.log(list);
    return (
      <div className="App">
        <h1>List of Users</h1>
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

                      <button className="btn btn-primary">PLAY</button>
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
